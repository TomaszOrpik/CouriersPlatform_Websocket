import { InjectModel } from "@nestjs/mongoose";
import { ChangeStream } from "mongodb";
import { Model } from "mongoose";
import { Position } from "src/models/position.model";
import { Courier, CourierDocument } from "src/schemas/courier.schema";
import { Package, PackageDocument } from "src/schemas/package.schema";


export class CourierService {
    constructor(
        @InjectModel(Courier.name) private courierModel: Model<CourierDocument>,
        @InjectModel(Package.name) private packageModel: Model<PackageDocument>
    ) { }

    watchForChanges(): ChangeStream<any> {
        return this.courierModel.watch();
    }

    async getCourierPositions(employeeNumber: string): Promise<Position[]> {
        try {
            const courierModel = await this.courierModel.findOne({ "employeeNumber": employeeNumber });
            const currentPackagesModel = await this.packageModel.findOne({ "_id": courierModel.currentPackages });
            const undeliveredPackagesModels = await Promise.all(courierModel.undeliveredPackages.map(async (p) => {
                if (p && p !== '') {
                    return await this.packageModel.findOne({ "_id": p });
                }
            }));
            const positions = [
                courierModel.startPosition,
                currentPackagesModel.position,
                ...undeliveredPackagesModels.map((p) => p.position)
            ];
            return positions;
        } catch (e) {
            return [];
        }
    }

    async getPackageNumbersByCourier(employeeNumber: string): Promise<string[]> {
        try {
            const courierModel = await this.courierModel.findOne({ "employeeNumber": employeeNumber });
            return await Promise.all([courierModel.currentPackages, ...courierModel.undeliveredPackages].map(async (id) => {
                const packageModel = await this.packageModel.findOne({ "_id": id });
                return packageModel.packageNumber;
            }));
        } catch (e) {
            return [];
        }
    }

    async getPositionsByPackageNumber(packageNumber: string): Promise<Position[]> {
        try {
            const positions: Position[] = [];
            const packageModel = await this.packageModel.findOne({ "packageNumber": packageNumber });
            const packageId = packageModel._id;
            const courier = await this.courierModel.find();
            courier.forEach((c) => {
                if (c.currentPackages.toString() === packageId.toString()) positions.push(c.startPosition);
                c.undeliveredPackages.forEach((id) => {
                    if (id.toString() === packageId.toString()) positions.push(c.startPosition);
                })
            });
            positions.push(packageModel.position);
            return positions;
        } catch (e) {
            return [];
        }
    }

    async getEmployeeNumber(id: string): Promise<string> {
        try {
            const courierModel = await this.courierModel.findOne({ "_id": id });
            return courierModel.employeeNumber;
        } catch (e) {
            return '';
        }

    }

    async getPackageIdByNumber(packageNumber: string): Promise<string> {
        try {
            const packageModel = await this.packageModel.findOne({ "packageNumber": packageNumber });
            return packageModel._id.toString();
        } catch (e) {
            return '';
        }
    }
}
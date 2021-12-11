import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Courier, CourierSchema } from "src/schemas/courier.schema";
import { Package, PackageSchema } from "src/schemas/package.schema";
import { CourierService } from "./courier.service";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Courier.name, schema: CourierSchema },
        { name: Package.name, schema: PackageSchema }
    ])],
    providers: [CourierService],
    exports: [CourierService]
})
export class CourierModule { }
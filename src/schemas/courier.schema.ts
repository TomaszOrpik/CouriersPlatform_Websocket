import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Position } from "src/models/position.model";
import { Region } from "src/models/region.model";


export type CourierDocument = Courier & Document;

export interface ICourier {
    employeeNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: number;
    startPosition: Position;
    vehicle: string;
    registration: string;
    startTime: string;
    region: Region;
    deliveredPackages: string[];
    undeliveredPackages: string[];
    currentPackages: string;
}

@Schema()
export class Courier implements ICourier {
    @Prop({ type: String, required: true })
    employeeNumber: string;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, required: true })
    lastName: string;
    @Prop({ type: String, required: true })
    password: string;
    @Prop({ type: Number, required: true })
    phoneNumber: number;
    @Prop({
        raw: {
            latitude: Number,
            longitude: Number
        }, required: true
    })
    startPosition: Position;
    @Prop({ type: String, required: true })
    vehicle: string;
    @Prop({ type: String, required: true })
    registration: string;
    @Prop({ type: String, required: true })
    startTime: string;
    @Prop({
        raw: ({
            name: String,
            leftTop: {
                latitude: Number,
                longitude: Number
            },
            leftBottom: {
                latitude: Number,
                longitude: Number
            },
            rightTop: {
                latitude: Number,
                longitude: Number
            },
            rightBottom: {
                latitude: Number,
                longitude: Number
            },
        })
    })
    region: Region;
    @Prop([String])
    deliveredPackages: string[];
    @Prop([String])
    undeliveredPackages: string[];
    @Prop({ type: String })
    currentPackages: string;

    constructor(props?: ICourier) {
        if (props) {
            this.employeeNumber = props.employeeNumber;
            this.firstName = props.firstName;
            this.lastName = props.lastName;
            this.password = props.password;
            this.phoneNumber = props.phoneNumber;
            this.startPosition = props.startPosition;
            this.vehicle = props.vehicle;
            this.registration = props.registration;
            this.startTime = props.startTime;
            this.region = props.region;
            this.deliveredPackages = props.deliveredPackages;
            this.undeliveredPackages = props.undeliveredPackages;
            this.currentPackages = props.currentPackages;
        }
    }
}

export const CourierSchema = SchemaFactory.createForClass(Courier);
export interface IPosition {
    latitude: number;
    longitude: number;
}

export class Position implements IPosition {
    latitude: number;
    longitude: number;

    constructor(props?: IPosition) {
        if (props) {
            this.latitude = props.latitude;
            this.longitude = props.longitude;
        }
    }

}
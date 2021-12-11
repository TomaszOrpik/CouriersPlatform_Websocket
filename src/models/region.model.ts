import { Position } from "./position.model";

export interface IRegion {
    name: string;
    leftTop: Position;
    leftBottom: Position;
    rightTop: Position;
    rightBottom: Position;
}

export class Region implements IRegion {
    name: string;
    leftTop: Position;
    leftBottom: Position;
    rightTop: Position;
    rightBottom: Position;

    constructor(props?: IRegion) {
        if (props) {
            this.name = props.name;
            this.leftTop = props.leftTop;
            this.leftBottom = props.leftBottom;
            this.rightBottom = props.rightBottom;
            this.rightTop = props.rightTop;
        }
    }
}
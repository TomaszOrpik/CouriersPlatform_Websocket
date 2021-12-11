export interface ClientModel {
    id: string;
    type: MapType;
    client: any;
}

export enum MapType {
    package = 'package',
    courier = 'courier',
    navigation = 'navigation'
}
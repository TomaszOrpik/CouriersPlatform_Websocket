import { Injectable } from '@nestjs/common';
import Websocket, { Server } from 'ws';
import { CourierService } from './courier/courier.service';
import { ClientModel, MapType } from './models/client.model';
import { Position } from './models/position.model';

@Injectable()
export class AppService {

  static wss: Server | undefined = undefined;

  static clients: ClientModel[] = [];

  constructor(private readonly courierService: CourierService) {
    courierService.watchForChanges().on('change', async (data) => {
      const id = (data.documentKey as any)._id;
      const employeeNumber = await courierService.getEmployeeNumber(id);
      const courierPositions = await courierService.getCourierPositions(employeeNumber);
      this.sendMessage(employeeNumber, MapType.courier, courierPositions);
      this.sendMessage(employeeNumber, MapType.navigation, courierPositions);

      const packageNumbers = await courierService.getPackageNumbersByCourier(employeeNumber);
      await Promise.all(packageNumbers.map(async (pnumber) => {
        const positions = await this.getPositionsByPackageNumber(pnumber);
        this.sendMessage(pnumber, MapType.package, positions);
      }));
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  sendMessage(
    id: string, type: MapType, positions: Position[] = []
  ): void {
    AppService.clients.forEach((c: ClientModel) => {
      if (c.client.readyState === 1 && c.id === id && c.type === type) {
        c.client.send(JSON.stringify({ positions }));
      }
    });
  }

  getPositionByEmployeeNumber = async (employeeNumber: string): Promise<Position[]> =>
    await this.courierService.getCourierPositions(employeeNumber);

  getPositionsByPackageNumber = async (packageNumber: string): Promise<Position[]> =>
    await this.courierService.getPositionsByPackageNumber(packageNumber);
}

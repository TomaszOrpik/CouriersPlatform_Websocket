import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'ws';
import { AppService } from './app.service';
import { ClientModel, MapType } from './models/client.model';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const server = await app
    .listen(process.env.PORT || 3002);

  const wss = new Server({ server });

  AppService.wss = wss;

  wss.on('connection', (ws) => {
    Logger.log('websocket connected');
    ws.on('message', (data: any) => {
      wss.clients.forEach((client: any) => {
        const decodedData: { id: string, type: string } = JSON.parse(binaryDecode(data));
        const clientModel: ClientModel = {
          id: decodedData.id,
          type: MapType[decodedData.type as keyof typeof MapType],
          client: client
        };
        if (!AppService.clients.includes(clientModel)) {
          AppService.clients.push(clientModel);
        }
      });
    });
    wss.on('close', () => {
      Logger.log('websocket connection closed');
    });
    wss.on('error', (error) => {
      Logger.log('ERROR:', error);
    })
  });
}
bootstrap();

function binaryDecode(binary: any) {
  const inputStr = binary.toString().split(' ');
  return inputStr[0];
}

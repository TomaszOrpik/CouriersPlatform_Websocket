import { Body, ConsoleLogger, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MapType } from './models/client.model';
import { Position } from './models/position.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('sendMessage')
  async sendMessage(@Body() data: { id: string, type: MapType }): Promise<void> {
    if (data.type === MapType.package) {
      const positions = await this.appService.getPositionsByPackageNumber(data.id);
      this.appService.sendMessage(data.id, data.type, positions);
    } else {
      const positions = await this.appService.getPositionByEmployeeNumber(data.id);
      this.appService.sendMessage(data.id, data.type, positions);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}

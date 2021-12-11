import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { CourierModule } from './courier/courier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    CourierModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

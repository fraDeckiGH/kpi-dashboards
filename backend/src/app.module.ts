import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // https://docs.nestjs.com/techniques/configuration#use-module-globally
      // isGlobal: true, 
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

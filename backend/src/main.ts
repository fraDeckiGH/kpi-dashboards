import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create/* <NestExpressApplication> */(AppModule)
  
  app.enableCors({
    credentials: true,
    methods: `GET,HEAD,PUT,PATCH,POST,DELETE`,
    origin: process.env.FE_CLIENT ?? `http://localhost:3000`, // allow requests from FE
  })
  
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // use helmet and enable cors to secure request headers
  app.use(helmet());
  app.enableCors();

  // enable rate limiting basic
  app.use(rateLimit.default({
    windowMs : 60 * 1000 ,
    max : 100
  }));

  // use global validation pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true ,
      forbidNonWhitelisted : true ,
      transform : true
    })
  )
  await app.listen(process.env.PORT || 3000);
  console.log(`App is listening on port : ${process.env.PORT || 3000}`); 
}
bootstrap();

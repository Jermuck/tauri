import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const envconfig = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("/api");
  app.use(cookieParser())
  app.useGlobalInterceptors(new ResponseInterceptor());
  const config = new DocumentBuilder()
    .setTitle("Backend with TypeOrm and NestJs")
    .setDescription("My api")
    .setVersion("1.0")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    },
      'access-token'
    )
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document);
  const PORT = envconfig.get<string>("PORT") || 4000;
  await app.listen(PORT, () => console.log(`Server was started in ${PORT}`));
}
bootstrap();

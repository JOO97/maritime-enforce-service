import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpStatus } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set prefix
  app.setGlobalPrefix('joo');

  // Enable cors
  app.enableCors({
    origin: '*',
  });

  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      skipMissingProperties: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true, //[class-transformer]
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Setup swagger
  if (process.env.DOCUMENTATION_ENABLE) {
    const config = new DocumentBuilder()
      .setTitle(process.env.DOCUMENTATION_TITLE)
      .setDescription('The API description')
      .setVersion(process.env.API_VERSION)
      .addTag('api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.DOCUMENTATION_PATH, app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpStatus } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpServiceExceptionFilter } from './common/filters/http-service.exception.filter';

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

  // Set global http interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Set global http exception filter
  app.useGlobalFilters(new HttpServiceExceptionFilter());

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

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.DOCUMENTATION_ENABLE) {
    // setup swagger
    const config = new DocumentBuilder()
      .setTitle(process.env.DOCUMENTATION_TITLE)
      // .setDescription('The cats API description')
      .setVersion(process.env.API_VERSION)
      .addTag('api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.DOCUMENTATION_PATH, app, document);
  }

  // process.env.SOCKET_ENABLE && app.useWebSocketAdapter();

  await app.listen(process.env.PORT);
}
bootstrap();

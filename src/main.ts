import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Api rest - PPS')
  .setDescription('En esta documentacion encontrara todo sobre la utilizacion de la Api rest')
  .setVersion('1.0')
  .addTag('products')
  .addTag('users')
  .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(
    'api/documentation', 
    app, 
    document, 
    {
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    }
  );

  await app.listen(3000);
}
bootstrap();

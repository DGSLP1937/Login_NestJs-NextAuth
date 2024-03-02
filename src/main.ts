
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //await app.listen(3005);

  const config = new DocumentBuilder()
    .setTitle("Nest example")
    .setDescription("Documentacion con Swagger")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  //await app.listen(3005);
  await app.listen(parseInt(process.env.PORT) || 3005);
}
bootstrap();

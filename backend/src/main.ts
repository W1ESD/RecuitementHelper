import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks(); // Enable shutdown hooks
  app.enableCors(); // Enable CORS
  await app.listen(3000);
}
bootstrap();

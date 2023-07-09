import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  
  const documentationConfig = new DocumentBuilder()
  .setTitle('Facil Recetas')
  .setDescription('FR API documentation')
  .setVersion('1.0')
  .build();
  
  console.log(`starting app in port ${configService.get<string>('PORT') || 3000}`);
  await app.listen(configService.get<string>('PORT') || 3000);
}
bootstrap();

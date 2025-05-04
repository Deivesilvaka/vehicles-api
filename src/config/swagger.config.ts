import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import packageJson from 'package.json';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Vehicle Backend Documentation')
    .setDescription('All API Endpoints')
    .setVersion(packageJson.version)
    .build();

  SwaggerModule.setup(`/api`, app, SwaggerModule.createDocument(app, options));
};

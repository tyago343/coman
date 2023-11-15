import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Amazon bookshop API')
  .setDescription('This API is to use the Amazon bookshop')
  .setVersion('1.0')
  .addTag('books')
  .build();

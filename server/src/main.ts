import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WebsocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);


  app.enableShutdownHooks()
  
  app.use(cookieParser("My_secret_1234"));
  app.setGlobalPrefix("api");
  app.enableCors({origin:true,credentials:true})

  
  // Create SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  await app.listen(3000,()=>{
    console.log("Server started.");
  });
}
bootstrap();

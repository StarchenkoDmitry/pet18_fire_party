import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './prisma.service';
import { MyAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  
  app.enableShutdownHooks()
  // const prismaService = app.get(PrismaService);
  // //TODO:
  // // await prismaService.en

  
  app.use(cookieParser("My_secret_1234"));
  app.setGlobalPrefix("api");
  app.enableCors({origin:true,credentials:true})

  app.useGlobalGuards();
  
  // Create SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  await app.listen(3000);
  console.log("Server started.");
}
bootstrap();
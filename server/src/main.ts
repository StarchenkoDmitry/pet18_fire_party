import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WebsocketAdapter } from './gateway/gateway.adapter';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs'
import { Config } from './config';


async function CreateApp(){
  if(Config.SSL_SWITCH){
    const httpsOptions:HttpsOptions = {
      key: fs.readFileSync('./ssl/privatekey.key'),
      cert: fs.readFileSync('./ssl/certificate.crt'),
    }

    const app = await NestFactory.create(AppModule, { httpsOptions })
    return app
  }
  else{
    const app = await NestFactory.create(AppModule);
    return app
  }
}

async function bootstrap() {
  
  const app = await CreateApp()

  app.useWebSocketAdapter(new WebsocketAdapter(app));

  app.enableShutdownHooks()
  
  app.use(cookieParser(Config.COOKIE_SECRET));
  app.setGlobalPrefix("api");
  app.enableCors({origin:true,credentials:true})

  // Create SWAGGER
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)


  await app.listen(Config.PORT,()=>{
    console.log(`Server started on PORT(${Config.PORT}), enviroment:${Config.EnvName}`)
  })
}
bootstrap()

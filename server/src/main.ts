import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


// var JwtStrategy = require('passport-jwt').Strategy,
// ExtractJwt = require('passport-jwt').ExtractJwt;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:true,credentials:true})
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  

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







// var opts:any = new Map();// = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//   console.log("jwt_payload: ",jwt_payload)
//   done(null, true);
//   // User.findOne({id: jwt_payload.sub}, function(err, user) {
//   //     if (err) {
//   //         return done(err, false);
//   //     }
//   //     if (user) {
//   //         return done(null, user);
//   //     } else {
//   //         return done(null, false);
//   //         // or you could create a new account
//   //     }
//   // });
// }));

















// export function bob(){
//   // console.log("this:" ,this);
//   if(!this.p){this.p=0}
//   console.log("p:",this.p++);
// }

// // console.log("bOB:",bob);
// // console.dir(bob.prototype);
// // bob.prototype.papa = 20;
// // console.dir(bob.prototype);

// // bob();
// // bob();
// // bob();

// const mam = new bob();
// console.log("mam: ",mam.p);
// console.log("mam: ",mam);
// console.log("mam: ",mam.prototype);
// console.log("mem:", JSON.stringify(mam));
// // mam();
// // mam();
// // mam();
// // mam();


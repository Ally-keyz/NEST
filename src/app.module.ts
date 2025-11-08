import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loggerMiddleware } from './logger.middleware';
import { LogMiddleware } from './log.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true}),
    MongooseModule.forRoot(process.env.MONGO_URL || "mongodb+srv://manzialpe:gloire@cluster0.beqtnkj.mongodb.net/?appName=Cluster0" , {
      connectionFactory:(connection)=> {
        connection.on("connected",()=>{
          console.log("Connected to mongo db ...")
        })

        connection.on("error" , (err: any)=>{
          console.log("Failed to connect to mongo db..." , err)
        })
       return connection ;
      }})
  ],
  controllers: [AppController],
  providers: [AppService],
})
 export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AppController)
    .exclude({path : "cats/*xyz" , method : RequestMethod.ALL})
    .forRoutes(AppService)
  }
 }

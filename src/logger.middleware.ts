import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction , Request , Response } from "express";

@Injectable()
export class loggerMiddleware implements NestMiddleware {
   use(req:Request , res:Response , next:NextFunction){
    console.log("Pased through a middleware");
    next();
   }
}
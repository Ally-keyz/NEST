import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Cats } from 'cat.interface';
import { CreateCatsDto } from 'createCats.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/name")
  getName(@Body("name") name:string): string{
    return this.appService.getName(name);
  }

  @Get("/cats")
  async getCats() : Promise <Cats[]> {
    return this.appService.findAll();
  }

  @Post("/cats")
   async createCats(@Body()  cat : CreateCatsDto){
    this.appService.create(cat);
    return `Carts created successfully ${cat}`;
  }


}

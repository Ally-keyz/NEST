import { Injectable } from '@nestjs/common';
import { Cats } from 'cat.interface';

@Injectable()
export class AppService {
  private readonly cats : Cats[] = [];

  create(cat:Cats):void{
    this.cats.push(cat);
  }
  findAll():Cats[] {
    return this.cats
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  getName(name : string): string {
    return `Hello ${name}...`;
  }
}


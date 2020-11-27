import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any[] {
    // return 'Hello World, from NestJS!';
    return [
      { id: 1, name: 'Cristóbal' },
      { id: 2, name: 'Eduardo' },
      { id: 3, name: 'Daniela' },
    ];
  }
}

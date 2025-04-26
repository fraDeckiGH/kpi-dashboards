import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'app is running'
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloController {
  @Get()
  getHello(): any {
    return { message: 'Hello, World!' }; // Ensure this returns a valid JSON object
  }
}

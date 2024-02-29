import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController {
  @Get("/health")
  getHealthCheck() {
    return {"msg":"pass"};
  }
  @Get("/hello")
  getHello() {
    return {"msg":"Hello World"};
  }
}

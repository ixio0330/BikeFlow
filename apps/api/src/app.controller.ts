import { Controller, Get } from '@nestjs/common'

export interface HealthResponse {
  status: 'ok'
  service: 'bikeflow-api'
}

@Controller('health')
export class AppController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'bikeflow-api',
    }
  }
}

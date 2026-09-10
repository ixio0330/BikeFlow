import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { AppModule } from '../src/app.module.js'

describe('health endpoint', () => {
  let app: INestApplication

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api/v1')
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('reports that the API is healthy', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect({ status: 'ok', service: 'bikeflow-api' })
  })
})

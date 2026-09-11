import { AppController } from '@/app.controller.js'
import { Test } from '@nestjs/testing'
import { describe, expect, it } from 'vitest'

describe('AppController', () => {
  it('returns the service health', async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    expect(module.get(AppController).getHealth()).toEqual({
      status: 'ok',
      service: 'bikeflow-api',
    })
  })
})

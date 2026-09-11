import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.enableShutdownHooks()

  const port = Number(process.env.PORT ?? 8080)
  await app.listen(port, '0.0.0.0')
}

await bootstrap()

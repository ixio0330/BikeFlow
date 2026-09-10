import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'
import { AppController } from './app.controller.js'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/{*path}'],
      serveStaticOptions: {
        setHeaders(response, filePath) {
          if (filePath.includes(`${join('public', 'assets')}`)) {
            response.setHeader(
              'Cache-Control',
              'public, max-age=31536000, immutable',
            )
            return
          }

          response.setHeader('Cache-Control', 'no-cache')
        },
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

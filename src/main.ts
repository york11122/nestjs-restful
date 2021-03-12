import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe, LoggingInterceptor, TimeoutInterceptor
} from '@/common'
import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { HttpExceptionFilter } from './common/filters/error.filter';
import * as rateLimit from 'express-rate-limit'
import { join } from 'path'
import {
  NODE_ENV,
  DOMAIN,
  PORT,
  END_POINT,
  RATE_LIMIT_MAX,
  STATIC

} from '@/environment'

import { getConnection } from 'typeorm'

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const connection = getConnection('default')
  const { isConnected } = connection
  isConnected
    ? Logger.log(`🌨️  Database connected`, 'TypeORM', false)
    : Logger.error(`❌  Database connect error`, '', 'TypeORM', false)

  //pips
  app.useGlobalPipes(new ValidationPipe())

  //interceptors
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TimeoutInterceptor())

  // app.useGlobalFilters(new HttpExceptionFilter());
  // addon
  app.use(compression())
  app.use(bodyParser.json({ limit: '50mb' }))


  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  )

  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60, // an hour
      max: RATE_LIMIT_MAX!, // limit each IP to 100 requests per windowMs
      message:
        '⚠️  Too many request created from this IP, please try again after an hour'
    })
  )

  app.use('*', (req, res, next) => {
    const query = req.query.query || req.body.query || ''
    if (query.length > 2000) {
      throw new Error('Query too large')
    }
    next()
  })

  // NOTE: serve static
  app.useStaticAssets(join(__dirname, `../${STATIC}`))

  const server = await app.listen(PORT!)

  NODE_ENV !== 'production'
    ? Logger.log(
      `🚀  Server ready at http://${DOMAIN!}:${PORT!}/${END_POINT!}`,
      'Bootstrap',
      false
    )
    : Logger.log(
      `🚀  Server is listening on port ${PORT!}`,
      'Bootstrap',
      false
    )
}
bootstrap();

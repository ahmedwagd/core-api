import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: [
    //   `${process.env.FRONTEND_URL}`, // Allow requests from your frontend URL
    //   'http://localhost:3000', // Allow requests from localhost:3000
    // ],
    methods: ['*'],
    credentials: true,
    origin: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalInterceptors(new LoggerInterceptor());

  // app.use(cookieParser());

  //  const config = new DocumentBuilder()
  //     .setTitle('Core')
  //     .setDescription('Core apis')
  //     .setVersion('1.0')
  //     .addBearerAuth(
  //       {
  //         // I was also testing it without prefix 'Bearer ' before the JWT
  //         description: `[just text field] Please enter token in following format: Bearer <JWT>`,
  //         name: 'Authorization',
  //         bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
  //         scheme: 'Bearer',
  //         type: 'http', // I`ve attempted type: 'apiKey' too
  //         in: 'Header',
  //       },
  //       'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  //     )
  //     .build();

  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api', app, document);
  // await app.listen(app.get(ConfigService).getOrThrow('APP_PORT'));

  await app.listen(process.env.APP_PORT ?? 3030);
}
bootstrap();

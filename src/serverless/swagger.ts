import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from "aws-lambda";
import { AppModule } from "src/app.module";

let server:Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // configuracion de swagger
    const config = new DocumentBuilder()
        .setTitle('Reto Técnico - Marlon Montalvo')
        .setDescription('Descripión del API, incluye integración con SWAPI')
        .setVersion('1.0.0')
        .addServer('/dev')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler:Handler = async (event:any, context:Context, callback:Callback) => {
    if (event.path === '/api') event.path = '/api/';
    event.path = event.path.includes('swagger-ui') ? `/api${event.path}` : event.path;
    if (!server) server = await bootstrap();
    return server(event, context, callback);
};
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from "aws-lambda";
import { PostModule } from "src/app.module";

let server:Handler;

async function bootstrap() {
    const app = await NestFactory.create(PostModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler:Handler = async (event:any, context:Context, callback:Callback) => {
    if (!server) server = await bootstrap();
    return server(event, context, callback);
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetController } from './controllers/get.controller';
import { PostController } from './controllers/post.controller';
import { DynamodbService } from './services/dynamodb.service';
import { SwapiService } from './services/swapi.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [GetController],
    providers: [SwapiService, DynamodbService],
})
export class GetModule {}

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [PostController],
    providers: [DynamodbService],
})
export class PostModule {}

@Module({
    imports: [GetModule, PostModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

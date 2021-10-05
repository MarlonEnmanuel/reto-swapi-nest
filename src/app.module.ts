import { Module } from '@nestjs/common';
import { InvestigadoresController } from './controllers/investigadores.controller';
import { InvestigacionesController } from './controllers/investigaciones.controller';
import { SwapiService } from './services/swapi.service';
import { DynamodbService } from './services/dynamodb.service';
import { PlanetasSwapiController } from './controllers/planetas-swapi.controller';
import { PersonasSwapiController } from './controllers/personas-swapi.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [InvestigadoresController, InvestigacionesController, PlanetasSwapiController, PersonasSwapiController],
  providers: [SwapiService, DynamodbService],
})
export class AppModule {}

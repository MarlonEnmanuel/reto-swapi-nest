import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DynamodbService } from '../services/dynamodb.service';
import { SwapiService } from '../services/swapi.service';

@Controller()
@ApiTags('AWS Lambda GET')
export class GetController {

    constructor (
        private readonly dynamo:DynamodbService,
        private readonly swapi:SwapiService,
    ) {}

    @Get('dynamodb/investigadores/')
    @ApiOperation({summary: 'Obtener un listado de Investigadores desde DynamoDB'})
    public async GetInvestigadores () {
        return await this.dynamo.getInvestigadores();
    }

    @Get('dynamodb/investigaciones/')
    @ApiOperation({summary: 'Obtener un listado de Investigaciones desde DynamoDB'})
    public async GetInvestigaciones () {
        return await this.dynamo.getInvestigaciones();
    }

    @Get('swapi/personas/')
    @ApiQuery({name: 'buscar', required: false})
    @ApiOperation({summary: 'Obtener listado de Personajes desde SWAPI'})
    public async GetAllPersonas (
        @Query('buscar') buscar?:string
    ) {
        return await this.swapi.getPeoples(buscar);
    }

    @Get('swapi/personas/:id')
    @ApiOperation({summary: 'Obtener un Personaje mediante ID desde SWAPI'})
    public async GetOnePersona (
        @Param('id', ParseIntPipe) id:number
    ) {
        return await this.swapi.getPeople(id);
    }

    @Get('swapi/planetas/')
    @ApiQuery({name: 'buscar', required: false})
    @ApiOperation({summary: 'Obtener un listado de Planetas desde SWAPI'})
    public async GetAllPlanetas (
        @Query('buscar') buscar?:string
    ) {
        return this.swapi.getPlanets(buscar);
    }

    @Get('swapi/planetas/:id')
    @ApiOperation({summary: 'Obtener un Planeta mediante ID desde SWAPI'})
    public async GetOnePlaneta (
        @Param('id', ParseIntPipe) id:number
    ) {
        return this.swapi.getPlanet(id);
    }

}

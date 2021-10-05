import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwapiService } from 'src/services/swapi.service';

@ApiTags('Planetas de SWAPI')
@Controller('planetas-swapi')
export class PlanetasSwapiController {

    constructor(private readonly swapi:SwapiService) {}

    @Get()
    @ApiQuery({name: 'buscar', required: false})
    @ApiOperation({summary: 'Obtener un listado de Planetas'})
    public async GetAll (
        @Query('buscar') buscar?:string
    ) {
        return this.swapi.getPlanets(buscar);
    }

    @Get(':id')
    @ApiOperation({summary: 'Obtener un Planeta mediante ID'})
    public async GetOne (
        @Param('id', ParseIntPipe) id:number
    ) {
        return this.swapi.getPlanet(id);
    }

}

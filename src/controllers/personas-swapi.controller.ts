import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwapiService } from 'src/services/swapi.service';

@ApiTags('Personajes de SWAPI')
@Controller('personas-swapi')
export class PersonasSwapiController {

    constructor(private readonly swapi:SwapiService) {}

    @Get()
    @ApiQuery({name: 'buscar', required: false})
    @ApiOperation({summary: 'Obtener listado de Personajes'})
    public async GetAll (
        @Query('buscar') buscar?:string
    ) {
        return await this.swapi.getPeoples(buscar);
    }

    @Get(':id')
    @ApiOperation({summary: 'Obtener un Personaje mediante ID'})
    public async GetOne (
        @Param('id', ParseIntPipe) id:number
    ) {
        return await this.swapi.getPeople(id);
    }
    
}

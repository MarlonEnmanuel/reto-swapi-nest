import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrearInvestigadorDto } from 'src/dtos/investigador.dto';
import { DynamodbService } from 'src/services/dynamodb.service';

@ApiTags('Investigadores')
@Controller('investigadores')
export class InvestigadoresController {

    constructor (private readonly dynamo:DynamodbService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Registrar un Investigador'})
    public async Post (
        @Body() data: CrearInvestigadorDto
    ) {
        return await this.dynamo.saveInvestigador(data);
    }

    @Get()
    @ApiOperation({summary: 'Obtener un listado de Investigadores'})
    public async Get () {
        return await this.dynamo.getInvestigadores();
    }

}

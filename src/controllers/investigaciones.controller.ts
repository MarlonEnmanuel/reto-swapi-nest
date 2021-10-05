import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrearInvestigacionDto } from 'src/dtos/investigacion.dto';
import { DynamodbService } from 'src/services/dynamodb.service';

@ApiTags('Investigaciones')
@Controller('investigaciones')
export class InvestigacionesController {

    constructor (private readonly dynamo:DynamodbService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Registrar una Investigación'})
    public async Post (
        @Body() data: CrearInvestigacionDto
    ) {
        return await this.dynamo.saveInvestigacion(data);
    }

    @Get()
    @ApiOperation({summary: 'Obtener un listado de Investigaciones'})
    public async Get () {
        return await this.dynamo.getInvestigaciones();
    }

}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrearInvestigacionDto } from '../dtos/investigacion.dto';
import { CrearInvestigadorDto } from '../dtos/investigador.dto';
import { DynamodbService } from '../services/dynamodb.service';

@Controller()
@ApiTags('AWS Lambda POST')
export class PostController {

    constructor (private readonly dynamo:DynamodbService) {}

    @Post('/dynamodb/investigadores/')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Registrar un Investigador en DynamoDB'})
    public async PostInvestigadores (
        @Body() data: CrearInvestigadorDto
    ) {
        return await this.dynamo.saveInvestigador(data);
    }

    @Post('dynamodb/investigaciones/')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Registrar una Investigación en DynamoDB'})
    public async PostInvestigaciones (
        @Body() data: CrearInvestigacionDto
    ) {
        return await this.dynamo.saveInvestigacion(data);
    }
}

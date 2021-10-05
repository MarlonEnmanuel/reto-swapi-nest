import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { CrearInvestigacionDto, InvestigacionDto } from 'src/dtos/investigacion.dto';
import { CrearInvestigadorDto, InvestigadorDto } from 'src/dtos/investigador.dto';
import { v4 as uuid} from 'uuid';

/**
 * Lógica para interactuar con DynamoDB
 * @author Marlon Montalvo
 */
@Injectable()
export class DynamodbService {

    /**
     * Cliente para iteracción con DynamoDB
     */
    private readonly dynamo = new DynamoDB.DocumentClient({
        region: process.env.DYNAMODB_REGION,
        credentials: {
            accessKeyId: process.env.DYNAMODB_ACCESSKEYID,
            secretAccessKey: process.env.DYNAMODB_SECRETACCESSKEY,
        }
    });

    /**
     * Registra un documento de tipo Investigador
     * @param data Objeto de tipo CrearInvestigadorDto
     * @returns Instancia de Investigador
     */
    public async saveInvestigador (data:CrearInvestigadorDto) {
        const item:InvestigadorDto = {
            id: uuid(),
            ...data,
            fechaCreacion: new Date(),
        };
        try {
            await this.dynamo.put({
                TableName: 'investigadores',
                Item: item,
            }).promise();
            return item;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Error al registrar Investigador en BD');
        }
    }

    /**
     * Obtiene todos los Investigadores
     * @returns Lista de Investigadores
     */
    public async getInvestigadores () {
        try {
            const res = await this.dynamo.scan({
                TableName: 'investigadores',
            }).promise();
            return res.Items.map(el => <InvestigadorDto>el);
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Error al obtener Investigadores desde BD');
        }
    }

    /**
     * Registra un documento de tipo Investigación
     * @param data Objeto de tipo CrearInvestigacionDto
     * @returns Instancia de Investigacion
     */
     public async saveInvestigacion (data:CrearInvestigacionDto) {
        const item:InvestigacionDto = {
            id: uuid(),
            ...data,
            fechaCreacion: new Date(),
        };
        try {
            // consultar investigador
            const inv = await this.dynamo.get({
                TableName: 'investigadores',
                Key: {id: data.investigadorId},
            }).promise();
            // si no existe lanzar bad request
            if (!inv.Item) {
                throw new BadRequestException(`El Investigador con id ${data.investigadorId} no existe.`);
            }
            // insertar registro
            await this.dynamo.put({
                TableName: 'investigaciones',
                Item: item,
            }).promise();
            return item;
        } catch (err) {
            throw new InternalServerErrorException('Error al registrar Investigacion en BD');
        }
    }

    /**
     * Obtiene todos los Investigadores
     * @returns Lista de Investigadores
     */
    public async getInvestigaciones () {
        try {
            const res = await this.dynamo.scan({
                TableName: 'investigaciones',
            }).promise();
            return res.Items.map(el => <InvestigacionDto>el);
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Error al obtener Investigadores desde BD');
        }
    }

}

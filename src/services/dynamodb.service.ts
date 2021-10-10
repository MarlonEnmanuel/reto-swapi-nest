import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { CrearInvestigacionDto, InvestigacionDto } from '../dtos/investigacion.dto';
import { CrearInvestigadorDto, InvestigadorDto } from '../dtos/investigador.dto';
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
            return res.Items.map(el => this.genInvestigador(el));
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
            return res.Items.map(el => this.genInvestigacion(el));
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('Error al obtener Investigadores desde BD');
        }
    }

    /**
     * Generar un InvestigadorDto desde DynamoDB
     * @param data data de dynamo
     * @returns InvestigadorDto
     */
    private genInvestigador (data:any):InvestigadorDto {
        return {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            edad: data.edad,
            titulo: data.titulo,
            universidad: data.universidad,
            especialidad: data.especialidad,
            pais: data.pais,
            fechaCreacion: data.fechaCreacion,
        }
    }

    /**
     * Generar un InvestigacionDto desde DynamoDB
     * @param data data de dynamo
     * @returns InvestigacionDto
     */
     private genInvestigacion (data:any):InvestigacionDto {
        return {
            id: data.id,
            titulo: data.titulo,
            investigadorId: data.investigadorId,
            numeroIntentos: data.numeroIntentos,
            centroInvestigacion: data.centroInvestigacion,
            ramaCiencia: data.ramaCiencia,
            finalizado: data.finalizado,
            fechaCreacion: data.fechaCreacion,
        }
    }

}

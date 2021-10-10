import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from 'supertest';
import { Test, TestingModule } from "@nestjs/testing";
import { CrearInvestigadorDto, InvestigadorDto } from "src/dtos/investigador.dto";
import { GetModule, PostModule } from "../src/app.module";
import { CrearInvestigacionDto } from "src/dtos/investigacion.dto";

describe('Post Controller', () => {

    let app: INestApplication;

    const dataInvestigador:CrearInvestigadorDto = {
        nombres: 'Nombre de Prueba',
        apellidos: 'Apellido de Prueba',
        edad: 25,
        titulo: 'Ing.',
        universidad: 'UNPRG',
        especialidad: 'Testing',
        pais: 'Perú',
    };

    const dataInvestigacion:CrearInvestigacionDto = {
        titulo: 'Investigación de Testing',
        investigadorId: '',
        centroInvestigacion: 'Testing Center',
        numeroIntentos: 5,
        finalizado: false,
        ramaCiencia: 'UnitTesting',
    };

    beforeAll(async () => {
        const modulo: TestingModule = await Test.createTestingModule({
            imports: [PostModule, GetModule],
        }).compile();
        app = modulo.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        await app.init();
    });

    describe('Investigadores', () => {
        
        test('Registrar Investigador', async () => {
            const resp = await request(app.getHttpServer())
                            .post('/dynamodb/investigadores')
                            .send(dataInvestigador)
                            .expect(201);
            expect(resp.body).toMatchObject(dataInvestigador);
        });

        test('No debería permitir campos vacíos', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, nombres: ''})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, apellidos: ''})
                    .expect(400);
        });

        test('No debe permitir Edad negativa o cero', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, edad: 0})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, edad: -1})
                    .expect(400);
        });

        test('No debe permitir campos adicionales', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, hijos: 1})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigadores')
                    .send({...dataInvestigador, sql: 'delete from investigadores where 1=1'})
                    .expect(400);
        });

    });

    describe('Investigaciones', () => {
        
        test('Registrar Investigación', async () => {
            const data = await request(app.getHttpServer())
                                .get('/dynamodb/investigadores')
                                .expect(200);
            const payload:CrearInvestigacionDto = {
                ...dataInvestigacion,
                investigadorId: (<InvestigadorDto>data.body[0]).id,
            };
            const resp = await request(app.getHttpServer())
                            .post('/dynamodb/investigaciones')
                            .send(payload)
                            .expect(201);
            expect(resp.body).toMatchObject(payload);
        });

        test('No debería permitir campos vacíos', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, investigadorId: ''})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, titulo: ''})
                    .expect(400);
        });

        test('No debe permitir Intentos negativa o cero', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, numeroIntentos: 0})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, numeroIntentos: -1})
                    .expect(400);
        });

        test('No debe permitir campos adicionales', async () => {
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, cuacua: 1})
                    .expect(400);
            await request(app.getHttpServer())
                    .post('/dynamodb/investigaciones')
                    .send({...dataInvestigador, sql: 'delete from investigaciones where 1=1'})
                    .expect(400);
        });

    });

});
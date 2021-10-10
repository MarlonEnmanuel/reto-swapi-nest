import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GetModule } from '../src/app.module';
import { SwapiPlanet, SwapiPeople } from '../src/dtos/swapi.dto';
import axios from 'axios';
import { SwapiService } from '../src/services/swapi.service';

jest.setTimeout(10000);

describe('Get Controller', () => {
    
    let app: INestApplication;
    let swapi: SwapiService;

    // iniciar servidor http simulado
    beforeAll(async () => {
        const modulo: TestingModule = await Test.createTestingModule({
            imports: [GetModule],
        }).compile();
        app = modulo.createNestApplication();
        swapi = modulo.get<SwapiService>(SwapiService);
        await app.init();
    });

    describe('Planetas SWAPI /swapi/planetas', () => {
        
        test.skip('Listar Planetas', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/swapi/planetas')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

        test('Obtener un Planeta', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/swapi/planetas/1')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

        test('La data de un Planeta debe ser igual que en SWAPI', async () => {
            const respSwapi = await axios.get<SwapiPlanet>('https://swapi.py4e.com/api/planets/1');
            const obj = swapi.planetToEsp(respSwapi.data);

            const resp = await request(app.getHttpServer())
                                .get('/swapi/planetas/1')
                                .expect(200);
            expect(resp.body).toMatchObject(obj);
        });

    });

    describe('Personajes SWAPI /swapi/personas', () => {
        
        test.skip('Listar Personajes', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/swapi/personas')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

        test('Obtener un Personaje', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/swapi/personas/1')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

        test('La data de un Personaje debe ser igual que en SWAPI', async () => {
            const respSwapi = await axios.get<SwapiPeople>('https://swapi.py4e.com/api/people/1');
            const obj = swapi.peopleToEsp(respSwapi.data);

            const resp = await request(app.getHttpServer())
                                .get('/swapi/personas/1')
                                .expect(200);
            expect(resp.body).toMatchObject(obj);
        });

    });

    describe('Investigadores /dynamodb/investigadores', () => {
        
        test('Listar Investigadores', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/dynamodb/investigadores')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

    });

    describe('Investigadores /dynamodb/investigaciones', () => {
        
        test('Listar Investigaciones', async () => {
            const resp = await request(app.getHttpServer())
                                .get('/dynamodb/investigaciones')
                                .expect(200);
            expect(resp.body).toBeTruthy();
        });

    });

    // terminar servidor
    afterAll(async () => {
        app.close();
    })
});

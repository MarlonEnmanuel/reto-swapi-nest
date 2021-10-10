import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import axios, { AxiosInstance } from 'axios';
import { SwapiList, SwapiPeople, SwapiPeopleEspDto, SwapiPlanet, SwapiPlanetEspDto } from '../dtos/swapi.dto';

/**
 * Lógica para interactuar con SWAPI
 * @author Marlon Montalvo
 */
@Injectable()
export class SwapiService {

    /**
     * Instancia de Axios con configuración para peticiones a SWAPI
     */
    private api:AxiosInstance = axios.create({
        baseURL: process.env.SWAPI_URL,
        timeout: +process.env.SWAPI_TIMEOUT,
    });

    /**
     * Obtiene un Planet de SWAPI
     * @param idPlanet Id del Planeta
     * @returns Instancia de SwapiPlanet
     */
    public async getPlanet (idPlanet:number) {
        const url = `/planets/${idPlanet}`;
        try {
            // obtener respuesta de swapi
            const resp = await this.api.get<SwapiPlanet>(url);
            // retornar entidad convertida a español
            return this.planetToEsp(resp.data);
        } catch (err) {
            if (err.response && (<AxiosResponse>err.response).status < 500) {
                throw new NotFoundException('El Planeta no existe');
            }
            throw new InternalServerErrorException('Error al obtener Planeta de SWAPI');
        }
    }

    /**
     * Obtiene listado de Planets de SWAPI
     * @param search opcional: cadena de busqueda para obtener coincidencias
     * @returns Listado de Planets
     */
    public async getPlanets (search?:string) {
        const url = '/planets' + (!!search ? `?search=${search}` : '');
        const list:SwapiPlanet[] = [];
        try {
            // obtener respuesta de swapi
            let resp = await this.api.get<SwapiList<SwapiPlanet>>(url);
            // recuperar resultado
            list.push(...resp.data.results);
            // por cada pagina siguiente
            while(resp.data.next) {
                // obtener resultado de siguiente pagina
                resp = await this.api.get<SwapiList<SwapiPlanet>>(resp.data.next);
                // recuperar resultado
                list.push(...resp.data.results);
            }
            // retornar lista convertida al español
            return list.map(el => this.planetToEsp(el));
        } catch (err) {
            throw new InternalServerErrorException('Error al obtener Planetas de SWAPI');
        }
    }

    /**
     * Obtiene un People de SWAPI
     * @param idPeople Id de People
     * @returns Instancia de SwapiPeople
     */
     public async getPeople (idPeople:number) {
        const url = `/people/${idPeople}`;
        try {
            // obtener respuesta de swapi
            const resp = await this.api.get<SwapiPeople>(url);
            // retornar entidad convertida a español
            return this.peopleToEsp(resp.data);
        } catch (err) {
            if (err.response && (<AxiosResponse>err.response).status < 500) {
                throw new NotFoundException('La Persona no existe');
            }
            throw new InternalServerErrorException('Error al obtener Persona de SWAPI');
        }
    }
    
    /**
     * Obtiene listado de Peoples de SWAPI
     * @param search opcional: cadena de busqueda para obtener coincidencias
     * @returns Listado de Peoples
     */
    public async getPeoples (search?:string) {
        const url = '/people' + (!!search ? `?search=${search}` : '');
        const list:SwapiPeople[] = [];
        try {
            // obtener respuesta de swapi
            let resp = await this.api.get<SwapiList<SwapiPeople>>(url);
            // recuperar listado
            list.push(...resp.data.results);
            while(resp.data.next) {
                resp = await this.api.get<SwapiList<SwapiPeople>>(resp.data.next);
                list.push(...resp.data.results);
            }
            // retornar lista convertida a español
            return list.map(el => this.peopleToEsp(el));
        } catch (err) {
            throw new InternalServerErrorException('Error al obtener Personas de SWAPI');
        }
    }

    /**
     * Convierte instancia de Planet a español
     * @param planet Instancia de Planet original
     * @returns Instancia de Planet en Español
     */
    public planetToEsp (planet:SwapiPlanet):SwapiPlanetEspDto {
        const residentes = planet.residents.map(el => this.extractId(el));
        const peliculas = planet.films.map(el => this.extractId(el));
        return {
            id: this.extractId(planet.url),
            nombre: planet.name,
            periodo_rotacion: planet.rotation_period,
            periodo_orbital: planet.orbital_period,
            diametro: planet.diameter,
            clima: planet.climate,
            gravedad: planet.gravity,
            terreno: planet.terrain,
            agua_superficial: planet.surface_water,
            poblacion: planet.population,
            residentes_ids: residentes,
            peliculas_ids: peliculas,
            creado: planet.created,
            editado: planet.edited,
            swapi_url: planet.url,
        };
    }

    /**
     * Conviernte instancia de People a español
     * @param people Instancia de People original
     * @returns Instancia de People español
     */
    public peopleToEsp (people:SwapiPeople):SwapiPeopleEspDto {
        const peliculas = people.films.map(el => this.extractId(el));
        const especies = people.species.map(el => this.extractId(el));
        const vehiculos = people.vehicles.map(el => this.extractId(el));
        const naves = people.starships.map(el => this.extractId(el));
        return {
            id: this.extractId(people.url),
            nombre: people.name,
            altura: people.height,
            peso: people.mass,
            color_cabello: people.hair_color,
            color_piel: people.skin_color,
            color_ojos: people.eye_color,
            anio_nacimiento: people.birth_year,
            genero: people.gender,
            planeta_natal_id: this.extractId(people.homeworld),
            peliculas_ids: peliculas,
            especies_ids: especies,
            vehiculos_ids: vehiculos,
            naves_estelares_ids: naves,
            creado: people.created,
            editado: people.edited,
            swapi_url: people.url,
        };
    }

    /**
     * Devuelve el ID desde la URL de SWAPI
     * @param url url de SWAPI
     * @returns id 
     */
    private extractId (url:string):number {
        url = url.substr(0, url.length-1);
        const index = url.lastIndexOf('/');
        const id = parseInt(url.substr(index+1));
        return id;
    }

}

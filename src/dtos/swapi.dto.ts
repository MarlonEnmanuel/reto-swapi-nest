import { ApiProperty } from "@nestjs/swagger";

/**
 * Modelo del listado de endpoints SWAPI
 */
export class SwapiList<T> {
    public count: number;
    public next: string|null;
    public previous: string|null;
    public results: T[];
}

/**
 * Modelo de la entidad Planet en SWAPI
 */
export class SwapiPlanet {
    public name: string;
    public rotation_period: string;
    public orbital_period: string;
    public diameter: string;
    public climate: string;
    public gravity: string;
    public terrain: string;
    public surface_water: string;
    public population: string;
    public residents: string[];
    public films: string[];
    public created: string;
    public edited: string;
    public url: string;
}

/**
 * Modelo de la entidad Planet con atributos en español
 */
export class SwapiPlanetEspDto {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public periodo_rotacion: string;
    @ApiProperty()
    public periodo_orbital: string;
    @ApiProperty()
    public diametro: string;
    @ApiProperty()
    public clima: string;
    @ApiProperty()
    public gravedad: string;
    @ApiProperty()
    public terreno: string;
    @ApiProperty()
    public agua_superficial: string;
    @ApiProperty()
    public poblacion: string;
    @ApiProperty()
    public residentes_ids: number[];
    @ApiProperty()
    public peliculas_ids: number[];
    @ApiProperty()
    public creado: string;
    @ApiProperty()
    public editado: string;
    @ApiProperty()
    public swapi_url: string;
}

/**
 * Modelo de la entidad People en SWAPI
 */
export class SwapiPeople {
    public name: string;
    public height: string;
    public mass: string;
    public hair_color: string;
    public skin_color: string;
    public eye_color: string;
    public birth_year: string;
    public gender: string;
    public homeworld: string;
    public films: string[];
    public species: string[];
    public vehicles: string[];
    public starships: string[];
    public created: string;
    public edited: string;
    public url: string;
}

/**
 * Modelo de la entidad People con atributos en español
 */
export class SwapiPeopleEspDto {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public altura: string;
    @ApiProperty()
    public peso: string;
    @ApiProperty()
    public color_cabello: string;
    @ApiProperty()
    public color_piel: string;
    @ApiProperty()
    public color_ojos: string;
    @ApiProperty()
    public anio_nacimiento: string;
    @ApiProperty()
    public genero: string;
    @ApiProperty()
    public planeta_natal_id: number;
    @ApiProperty()
    public peliculas_ids: number[];
    @ApiProperty()
    public especies_ids: number[];
    @ApiProperty()
    public vehiculos_ids: number[];
    @ApiProperty()
    public naves_estelares_ids: number[];
    @ApiProperty()
    public creado: string;
    @ApiProperty()
    public editado: string;
    @ApiProperty()
    public swapi_url: string;
}
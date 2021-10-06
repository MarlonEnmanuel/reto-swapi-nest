import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CrearInvestigacionDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly investigadorId: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    public readonly numeroIntentos: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly centroInvestigacion: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly ramaCiencia: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    public readonly finalizado: boolean;
    
}

export class InvestigacionDto {
    
    @ApiProperty()
    public id:string;

    @ApiProperty()
    public titulo: string;
    
    @ApiProperty()
    public investigadorId: string;

    @ApiProperty()
    public numeroIntentos: number;
    
    @ApiProperty()
    public centroInvestigacion: string;
    
    @ApiProperty()
    public ramaCiencia: string;
    
    @ApiProperty()
    public finalizado: boolean;
    
    @ApiProperty()
    public fechaCreacion: Date;
    
}
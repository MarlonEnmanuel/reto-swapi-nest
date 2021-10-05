import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CrearInvestigacionDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly descripcion: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly investigadorId: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly fechaInicio: string;

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
    public descripcion: string;
    
    @ApiProperty()
    public investigadorId: string;
    
    @ApiProperty()
    public fechaInicio: string;
    
    @ApiProperty()
    public centroInvestigacion: string;
    
    @ApiProperty()
    public ramaCiencia: string;
    
    @ApiProperty()
    public finalizado: boolean;
    
    @ApiProperty()
    public fechaCreacion: Date;
    
}
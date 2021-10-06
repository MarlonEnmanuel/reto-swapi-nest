import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsNumber,  IsPositive,  IsString } from "class-validator";

export class CrearInvestigadorDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly nombres: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly apellidos: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    public readonly edad: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly universidad: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly especialidad: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: ['Perú','Colombia','Chile','México','España','Argentina']})
    public readonly pais: string;

}

export class InvestigadorDto {
    
    @ApiProperty()
    public id: string;
    
    @ApiProperty()
    public nombres: string;
    
    @ApiProperty()
    public apellidos: string;

    @ApiProperty()
    public edad: number;
    
    @ApiProperty()
    public titulo: string;
    
    @ApiProperty()
    public universidad: string;
    
    @ApiProperty()
    public especialidad: string;
    
    @ApiProperty()
    public pais: string;
    
    @ApiProperty()
    public fechaCreacion: Date;
}
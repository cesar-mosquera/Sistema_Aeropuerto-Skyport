import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';

@Controller('api/aeropuerto')
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  @Post('equipaje')
  calcularEquipajes(@Body() equipajes: any[]) {
    return this.aeropuertoService.calcularEquipajes(equipajes);
  }

  @Get('pista')
  asignarPista(
    @Query('minutos_disponibles') minutos: string,
    @Query('duraciones') duraciones: string
  ) {
    return this.aeropuertoService.asignarPista(parseInt(minutos, 10), duraciones);
  }
}

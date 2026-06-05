import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/vuelos')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFlightDto: any) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.flightsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: any) {
    return this.flightsService.update(+id, updateFlightDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(+id);
  }
}

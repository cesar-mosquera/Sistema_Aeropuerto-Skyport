import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/aerolineas')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAirlineDto: any) {
    return this.airlinesService.create(createAirlineDto);
  }

  @Get()
  findAll() {
    return this.airlinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airlinesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAirlineDto: any) {
    return this.airlinesService.update(+id, updateAirlineDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airlinesService.remove(+id);
  }
}

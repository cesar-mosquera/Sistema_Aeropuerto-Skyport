import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './entities/airline.entity';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline)
    private airlinesRepository: Repository<Airline>,
  ) {}

  async create(createAirlineDto: any): Promise<Airline> {
    const airline = this.airlinesRepository.create(createAirlineDto);
    return this.airlinesRepository.save(airline);
  }

  async findAll(): Promise<any[]> {
    // Calcular total_vuelos (conteo de vuelos activos)
    const airlines = await this.airlinesRepository.createQueryBuilder('airline')
      .leftJoinAndSelect('airline.flights', 'flight', 'flight.is_active = true')
      .getMany();
    
    return airlines.map(airline => ({
      id: airline.id,
      name: airline.name,
      total_vuelos: airline.flights ? airline.flights.length : 0,
    }));
  }

  async findOne(id: number): Promise<Airline> {
    const airline = await this.airlinesRepository.findOne({ where: { id } });
    if (!airline) throw new NotFoundException('Airline not found');
    return airline;
  }

  async update(id: number, updateAirlineDto: any): Promise<Airline> {
    await this.findOne(id);
    await this.airlinesRepository.update(id, updateAirlineDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    try {
      await this.airlinesRepository.delete(id);
    } catch (error) {
      // Catch foreign key constraint error
      throw new BadRequestException('Cannot delete airline with registered flights');
    }
  }
}

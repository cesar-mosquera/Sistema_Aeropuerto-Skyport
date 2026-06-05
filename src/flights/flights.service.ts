import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
  ) {}

  async create(createFlightDto: any): Promise<Flight> {
    const flight = this.flightsRepository.create(createFlightDto);
    return this.flightsRepository.save(flight);
  }

  async findAll(query: any): Promise<Flight[]> {
    const { airline_id, is_active, search } = query;
    const qb = this.flightsRepository.createQueryBuilder('flight')
      .leftJoinAndSelect('flight.airline', 'airline')
      .orderBy('flight.base_price', 'ASC');

    if (airline_id) {
      qb.andWhere('airline.id = :airline_id', { airline_id });
    }
    
    if (is_active !== undefined) {
      const activeBool = is_active === 'true' || is_active === true;
      qb.andWhere('flight.is_active = :is_active', { is_active: activeBool });
    }

    if (search) {
      qb.andWhere(new Brackets(qb => {
        qb.where('flight.code ILIKE :search', { search: `%${search}%` })
          .orWhere('flight.destination ILIKE :search', { search: `%${search}%` });
      }));
    }

    return qb.getMany();
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightsRepository.findOne({ where: { id }, relations: ['airline'] });
    if (!flight) throw new NotFoundException('Flight not found');
    return flight;
  }

  async update(id: number, updateFlightDto: any): Promise<Flight> {
    await this.findOne(id);
    await this.flightsRepository.update(id, updateFlightDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.flightsRepository.delete(id);
  }
}

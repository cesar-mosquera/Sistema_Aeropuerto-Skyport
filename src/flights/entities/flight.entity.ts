import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Airline } from '../../airlines/entities/airline.entity';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  destination: string;

  @Column('int')
  duration_minutes: number;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Airline, (airline) => airline.flights, {
    onDelete: 'RESTRICT', // No se puede eliminar una aerolínea con vuelos registrados
  })
  @JoinColumn({ name: 'airline_id' })
  airline: Airline;
}

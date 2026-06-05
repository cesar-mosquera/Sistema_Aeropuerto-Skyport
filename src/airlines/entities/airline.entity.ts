import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Flight } from '../../flights/entities/flight.entity';

@Entity('airlines')
export class Airline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Flight, (flight) => flight.airline)
  flights: Flight[];
}

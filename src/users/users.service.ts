import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Helper method to create the initial admin user
  async createAdminIfNotExists() {
    const admin = await this.findOne('admin');
    if (!admin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await this.usersRepository.save({ username: 'admin', passwordHash });
    }
  }
}

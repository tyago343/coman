import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(userDetails: Pick<User, 'username'>): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: userDetails.username },
    });
    if (user) {
      return user;
    }
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }
  async findUser(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}

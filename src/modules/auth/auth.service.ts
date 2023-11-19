import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
  async generateJwt(payload: any) {
    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
  async signIn(user: any) {
    const payload = { username: user.username, sub: user.id };
    return await this.generateJwt(payload);
  }
  async registerUser(CreateUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(CreateUserDto);

      await this.userRepository.save(newUser);

      return this.generateJwt({
        sub: newUser.id,
        username: newUser.username,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };

      const createdUser = {
        id: 1,
        ...createUserDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(result).toBe(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, name: 'John', lastname: 'Doe', username: 'johndoe' },
        { id: 2, name: 'Jane', lastname: 'Smith', username: 'janesmith' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const user = {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(userId);

      expect(result).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };

      const updatedUser = {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        ...updateUserDto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const userId = '1';
      const user = {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(user);

      const result = await controller.remove(userId);

      expect(result).toBe(user);
    });
  });
});

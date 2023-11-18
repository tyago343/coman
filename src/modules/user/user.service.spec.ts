import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };

      const savedUser: User = {
        id: 1,
        ...createUserDto,
      };
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const mockCreate = jest.fn().mockResolvedValue(savedUser);
      userRepository.create = mockCreate;

      const result = await userService.create(createUserDto);

      expect(result).toEqual(savedUser);
      expect(mockCreate).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          name: 'John',
          lastname: 'Doe',
          username: 'johndoe',
        },
        {
          id: 2,
          name: 'Jane',
          lastname: 'Smith',
          username: 'janesmith',
        },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findOne(userId);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const updatedUser: User = {
        id: userId,
        name: 'Updated Name',
        lastname: 'Doe',
        username: 'johndoe',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

      const result = await userService.update(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...updatedUser,
        ...updateUserDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const userId = 1;
      const deletedUser: User = {
        id: userId,
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(deletedUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(deletedUser);

      const result = await userService.remove(userId);

      expect(result).toEqual(deletedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(userRepository.remove).toHaveBeenCalledWith(deletedUser);
    });
  });
});

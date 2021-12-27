import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          name: 'pepito',
          surname: 'perez',
          email: 'pepitoperez@gmail.com',
        },
      ];
    }),
    create: jest.fn().mockImplementation((id) => {
      return { message: 'El usuario fue creado correctamente.' };
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return {
        id: 1,
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      };
    }),
    update: jest.fn().mockImplementation((id, dto: UpdateUserDto) => {
      return { message: 'El usuario se actualizo correctamente.' }
    }),
    delete: jest.fn().mockImplementation((id) => {
      return { message: 'User deleted' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
    .overrideProvider(UsersService)
    .useValue(mockUserService)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of users', () => {
      expect(controller.getAll()).toEqual([
        {
          id: 1,
          name: 'pepito',
          surname: 'perez',
          email: 'pepitoperez@gmail.com',
        },
      ]);

      expect(mockUserService.findAll).toHaveBeenCalled();

      expect(mockUserService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const dto: CreateUserDto = {
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com'
      };

      expect(controller.create(dto)).toEqual({ message: 'El usuario fue creado correctamente.' })

      expect(mockUserService.create).toHaveBeenCalled();

      expect(mockUserService.create).toHaveBeenCalled();

      expect(mockUserService.create).toHaveBeenLastCalledWith(dto);
    });
  });

  describe('getOne', () => {
    it('should return a user by id', () => {
      expect(controller.getOne(1)).toEqual({
        id: 1,
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      });

      expect(mockUserService.findOne).toHaveBeenCalled();

      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update user', () => {
      const dto: UpdateUserDto = {
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      };

      expect(controller.update(1, dto)).toEqual({ message: 'El usuario se actualizo correctamente.' });

      expect(mockUserService.update).toHaveBeenCalled();

      expect(mockUserService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('delete', () => {
    it('should delete user', () => {
      expect(controller.delete(1)).toEqual({ message: 'User deleted' });

      expect(mockUserService.delete).toHaveBeenCalled();

      expect(mockUserService.delete).toHaveBeenCalledWith(1);
    });
  });
});

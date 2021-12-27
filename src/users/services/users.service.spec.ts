import { Body, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
          id: 1,
          name: 'pepito',
          surname: 'perez',
          email: 'pepitoperez@gmail.com',
        },
      ]);
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      });
    }),
    create: jest.fn().mockImplementation((user: CreateUserDto) => user),
    save: jest.fn().mockImplementation((user: User) => 
      Promise.resolve({
        id: Date.now(),
        ...user,
      }),
    ),
    merge: jest.fn().mockImplementation((user: User, body) => 
      Promise.resolve({
        id: user.id,
        ...body,
      }),
    ),
    delete: jest.fn().mockReturnThis(),
    //Hacer el otro delete igual
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      expect(await service.findAll()).toEqual([
        {
          id: 1,
          name: 'pepito',
          surname: 'perez',
          email: 'pepitoperez@gmail.com',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      expect(await service.findOne(1)).toEqual({
        id: 1,
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      });
    });
  });

  it('sould return a not found exception', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce(null);

    try {
      expect(await service.findOne(1)).toThrow(NotFoundException);
    } catch(error) {
      expect(error.message).toBe('El usuario no existe.');
    };
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = {
        name: 'pepito',
        surname: 'perez',
        email: 'pepitoperez@gmail.com',
      };

      expect(await service.create(dto)).toEqual({
        message: 'Se creo con exito el usuario.',
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = {
        name: 'juan',
        surname: 'rodriguez',
        email: 'juanrodriguez@gmail.com',
      };

      expect(await service.update(1, dto)).toEqual({
        message: 'Se actualizo con exito al usuario.',
      });
    });

    it('should not found exception', async () => {
      const dto = {
        name: 'juan',
        surname: 'rodriguez',
        email: 'juanrodriguez@gmail.com',
      };

      mockUserRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.update(1, dto)).toThrow(NotFoundException);
      }catch(error) {
        expect(error.message).toBe('No existe el usuario.');
      };
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      expect(await service.delete(10)).toEqual({
        message: 'Se elimino con exito el usuario.'
      });
    });
    it('should delete a user', async () => {
      mockUserRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.delete(10)).toThrow(NotFoundException);
      } catch(error) {
        expect(error.message).toBe('El usuario no existe.');
      };
    });
  })
});

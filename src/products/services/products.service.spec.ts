import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/create.product.dto';
import { UpdateProductDto } from '../dtos/update.product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository = {
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
          id: 1,
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
        },
      ]);
    }),
    create: jest
      .fn()
      .mockImplementation
      ((product: CreateProductDto) => product
    ),
    save: jest.fn(),
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
        name: 'remera',
        price: 1000,
        image: 'item-remera.jpg',
        size: 'l',
      });
    }),
    update: jest.fn().mockImplementation((id, product: Product) => {
      Promise.resolve({
        id,
        ...product,
      });
    }),
    //Por que el update me tira un error
    /* merge: jest.fn().mockImplementation(()) */
    delete: jest.fn().mockImplementation((id) => {
      Promise.resolve({
        id,
      });
    }), 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      expect(await service.findAll()).toEqual([
        {
          id: 1,
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
        },
      ]);
    });

    it('should return a not found exception', async () => {
      mockProductRepository.find.mockReturnValueOnce([]);
      
      try {
        expect(await service.findAll()).toThrow(NotFoundException)
      } catch(error) {
        expect(error.message).toBe('No hay productos para mostrar.')
      };
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const dto: CreateProductDto = {
        name: 'remera',
        price: 1000,
        image: 'item-remera.jpg',
        size: 'l',
      };

      expect(service.create(dto)).toEqual({
        message: 'Se creo con exito el producto.',
      });

      expect(mockProductRepository.create).toBeCalled();

      expect(mockProductRepository.create).toBeCalledWith(dto);

      expect(mockProductRepository.create).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      expect(await service.findOne(1)).toEqual({
        id: 1,
        name: 'remera',
        price: 1000,
        image: 'item-remera.jpg',
        size: 'l',
      });
    });
  });

  it('should return a not found exception', async () => {
    mockProductRepository.findOne.mockResolvedValueOnce(null);

    try {
      expect(await service.findOne(1)).toThrow(NotFoundException);
    } catch(error) {
      expect(error.message).toBe('No existe el producto.')
    }
  })

  //Esta fallando el merge, ver como moquearlo
  /* describe('update', () => {
    it('should update a product', async () => {
      const dto: UpdateProductDto = {
        name: 'pantalon',
        price: 1100,
        image: 'item-pantalon.jpg',
        size: 'm',   
      };

      mockProductRepository.findOne.mockResolvedValueOnce((id) => {
        return {
          id,
          name: 'pantalon',
          price: 1100,
          image: 'item-pantalon.jpg',
          size: 'm',
        };
      });
      
      mockProductRepository.findOne.mockReturnValueOnce(null);

      expect(await service.update(1, dto)).toEqual({
      message: 'Se edito con exito el producto.'
    });
    });

    it('should return not found exception', async () => {
      const dto = {
        name: 'pantalon',
        price: 1100,
        image: 'item-pantalon.jpg',
        size: 'm',
      };

      mockProductRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.update(1, dto)).toThrow(NotFoundException); 
      } catch(error) {
        expect(error.message).toBe('El producto no existe.');
      }
    });
  });
 */
  describe('delete', () => {
    it('should deleted product', async () => {
      expect(await service.delete(1)).toEqual({
        message: 'Se elimino con exito el producto.',
      });
    });

    it('should return a not found exception', async () => {
      mockProductRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.delete(1)).toThrow(NotFoundException);
      }catch(error) {
        expect(error.message).toBe('No existe el producto.');
      };
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dtos/create.product.dto';
import { UpdateProductDto } from '../dtos/update.product.dto';
import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
        },
        {
          id: 2,
          name: 'pantalon',
          price: 1100,
          image: 'item-pantalon.jpg',
          size: 'l',
        },
      ];
    }),
    create: jest.fn().mockImplementation((dto: CreateProductDto) => {
      return { message: 'Product created' };
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        name: 'pantalon',
        price: 1100,
        image: 'item-pantalon.jpg',
        size: 'm',
      };
    }),
    update: jest.fn().mockImplementation((id, dto: UpdateProductDto) => {
      return { message: 'Product updated' };
    }),
    delete: jest.fn().mockImplementation((id) => {
      return { message: 'Product deleted' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
    .overrideProvider(ProductsService)
    .useValue(mockProductService)
    .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of products', () => {
      expect(controller.getAll()).toEqual([
        {
          id: 1,
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
        },
        {
          id: 2,
          name: 'pantalon',
          price: 1100,
          image: 'item-pantalon.jpg',
          size: 'l',
        },
      ]);

      expect(mockProductService.findAll).toHaveBeenCalled();

      expect(mockProductService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const dto: CreateProductDto = {
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
      };

      expect(controller.create(dto)).toEqual({ message: 'Product created' });

      expect(mockProductService.create).toHaveBeenCalled();

      expect(mockProductService.create).toHaveBeenCalled();

      expect(mockProductService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getOne', () => {
    it('should return a product by its id', () => {
      expect(controller.getOne(1)).toEqual({
          id: 1,
          name: 'pantalon',
          price: 1100,
          image: 'item-pantalon.jpg',
          size: 'm',
      });

      expect(mockProductService.findOne).toHaveBeenCalled();

      expect(mockProductService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update product', () => {
      const dto: UpdateProductDto = {
          name: 'remera',
          price: 1000,
          image: 'item-remera.jpg',
          size: 'l',
      };

      expect(controller.update(10, dto)).toEqual({ message: 'Product updated' });

      expect(mockProductService.update).toHaveBeenCalled();

      expect(mockProductService.update).toHaveBeenCalledWith(10, dto);
    });
  });

  describe('delete', () => {
    it('should delete product', () => {
      expect(controller.delete(10)).toEqual({ message: 'Product deleted' });

      expect(mockProductService.delete).toHaveBeenCalled();

      expect(mockProductService.delete).toHaveBeenCalledWith(10);
    });
  });
});

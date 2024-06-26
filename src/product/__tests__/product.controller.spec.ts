import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { ConfigService } from '../../config/ConfigService';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';
import { mockProducts } from './__mock__/product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let response: any;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByName: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockProductList: Product[] = mockProducts as Product[];

  beforeEach(async () => {
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ConfigService,
        { provide: ProductService, useValue: mockService },
      ],
      imports: [AuthorizationModule],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all products', () => {
    it('should return an list of products', async () => {
      productService.findAll = jest.fn().mockResolvedValue(mockProductList);

      const result = await controller.retrieveAll();
      expect(productService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });

    it('should return empty list of products', async () => {
      productService.findAll = jest.fn().mockResolvedValue([]);
      const result = await controller.retrieveAll();
      expect(result).toEqual([]);
    });
  });

  describe('Create a new Product', () => {
    it('should return the newly created record', async () => {
      const { _id, ...newProduct } = mockProducts[0];
      const newlyCreatedProduct = mockProductList[0];

      productService.create = jest.fn().mockResolvedValue(newlyCreatedProduct);

      const result = await controller.create(newProduct);
      expect(result).toEqual(newlyCreatedProduct);
    });

    it('should throw an error when product creation fails', async () => {
      const newProduct: Product = mockProducts[0] as Product;
      const errorMessage = 'Failed to create product';

      productService.create = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      try {
        await controller.create(newProduct);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
      await expect(controller.create(newProduct)).rejects.toThrow(errorMessage);
    });
  });

  describe('Search Products By Name', () => {
    it('should return the newly created record', async () => {
      const { name } = mockProducts[0];

      const matchingProducts = mockProducts.filter((product) =>
        new RegExp(name, 'i').test(product.name),
      );

      productService.findByName = jest
        .fn()
        .mockImplementation(async (name: string) => {
          return mockProducts.filter((product) =>
            new RegExp(name, 'i').test(product.name),
          ) as Product[];
        });

      const result = await controller.retrieveByName(name);
      expect(result).toEqual(matchingProducts);
    });

    it('should return the empty created record', async () => {
      const { name } = mockProducts[0];

      productService.findByName = jest
        .fn()
        .mockImplementation(async (name: string) => {
          return mockProducts.filter(() =>
            new RegExp(name, 'i').test('unknown'),
          ) as Product[];
        });

      const result = await controller.retrieveByName(name);
      expect(result).toEqual([]);
    });
  });

  describe('Get a Product by Id', () => {
    it('should return a product', async () => {
      const { _id } = mockProducts[0] as Product;
      const existingProduct = mockProductList[0];
      productService.findById = jest.fn().mockResolvedValue(existingProduct);

      const result = await controller.retrieveOne(_id.toString());
      expect(result).toEqual(existingProduct);
    });

    it('should throw NotFoundException for non-existent product', async () => {
      const id = 'nonexistent-id';
      const errorMessage = `Product with ID ${id} not found`;

      productService.findById = jest
        .fn()
        .mockRejectedValue(new NotFoundException(errorMessage));

      try {
        await controller.retrieveOne(id.toString());
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
      await expect(controller.retrieveOne(id)).rejects.toThrow(errorMessage);
    });
  });

  describe('Update Product', () => {
    it('should return the updated product', async () => {
      const { _id, ...rest } = mockProducts[0];
      const updatedProduct = { ...rest, name: 'product 1 updated' };
      const expectedProduct = { _id, ...updatedProduct };

      productService.update = jest.fn().mockResolvedValue(expectedProduct);
      const result = await controller.updateProduct(
        _id.toString(),
        updatedProduct,
      );

      expect(result).toEqual(expectedProduct);
    });
  });

  describe('Delete Product', () => {
    it('should delete a product', async () => {
      const { _id } = mockProducts[0];

      productService.delete = jest.fn().mockResolvedValue(null);

      await controller.delete(_id.toString(), response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(response.send).toHaveBeenCalled();
    });

    it('should delete a product', async () => {
      const { _id } = mockProducts[0];
      const errorMessage = 'failed to delete the product';
      productService.delete = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      try {
        await controller.delete(_id.toString(), response);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }

      await expect(controller.delete(_id.toString(), response)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});

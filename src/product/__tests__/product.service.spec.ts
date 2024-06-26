// productService.test.js
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';
import { mockProducts } from './__mock__/product.mock';

describe('ProductService', () => {
  let service: ProductService;

  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockProductList: Product[] = mockProducts as Product[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const { _id, ...newProduct } = mockProducts[0];
      const newlyCreatedProduct = mockProductList[0];

      mockModel.create.mockResolvedValue(newlyCreatedProduct);

      await expect(service.create(newProduct)).resolves.toEqual(
        newlyCreatedProduct,
      );
      expect(mockModel.create).toHaveBeenCalledWith(newProduct);
    });
  });

  describe('findByName', () => {
    it('should return products matching the name', async () => {
      const name = 'test';
      const products = [{ id: '1', name: 'Test Product', price: 100 }];
      const caseInsensitiveQuery = { name: { $regex: new RegExp(name, 'i') } };

      mockModel.find.mockResolvedValue(products);

      await expect(service.findByName(name)).resolves.toEqual(products);
      expect(mockModel.find).toHaveBeenCalledWith(caseInsensitiveQuery);
    });

    it('should throw BadRequestException if name is not provided', async () => {
      await expect(service.findByName('')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should return a product by ID', async () => {
      const id = '1';
      const product = { id, name: 'Test Product', price: 100 };

      mockModel.findById.mockResolvedValue(product);

      await expect(service.findById(id)).resolves.toEqual(product);
      expect(mockModel.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = 'nonexistent-id';

      mockModel.findById.mockResolvedValue(null);

      await expect(service.findById(id)).rejects.toThrow(NotFoundException);
      expect(mockModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [{ id: '1', name: 'Test Product', price: 100 }];

      mockModel.find.mockResolvedValue(products);

      await expect(service.findAll()).resolves.toEqual(products);
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const { _id, ...rest } = mockProducts[0];
      const updatedProduct = { ...rest, name: 'product 1 updated' };

      mockModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      await expect(
        service.update(_id.toString(), updatedProduct),
      ).resolves.toEqual(updatedProduct);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        _id.toString(),
        updatedProduct,
        { new: true },
      );
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = 'nonexistent-id';
      const { _id, ...rest } = mockProducts[0];
      const updatedProduct = { ...rest, name: 'product 1 updated' };

      mockModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update(id, updatedProduct)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updatedProduct,
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', async () => {
      const productId = 'existing-id';
      mockModel.findByIdAndDelete.mockResolvedValue({ id: productId });

      await expect(service.delete(productId)).resolves.not.toThrow();

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });

    it('should throw a NotFoundException if the product is not found', async () => {
      const productId = 'nonexistent-id';
      mockModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.delete(productId)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(productId);
    });
  });
});

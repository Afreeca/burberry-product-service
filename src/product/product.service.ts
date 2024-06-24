import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../providers/schemas/product.schema';
import { ProductDTO } from './dto/product.dto';
import { ProductType } from './entity/product';

@Injectable()
export class ProductService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {
    this.logger = new Logger(ProductService.name);
  }

  async create(product: ProductDTO): Promise<ProductType> {
    return await this.productModel.create(product);
  }

  async findByName(name: string): Promise<ProductType[]> {
    if (!name) {
      throw new BadRequestException('Name parameter is required');
    }
    const caseInsensitiveQuery = { name: { $regex: new RegExp(name, 'i') } };
    return await this.productModel.find(caseInsensitiveQuery);
  }

  async findById(productId: string): Promise<ProductType> {
    if (!productId) {
      throw new BadRequestException('productId parameter is required');
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  async findAll(): Promise<ProductType[]> {
    return await this.productModel.find();
  }

  async update(id: string, updateProductDto: ProductDTO): Promise<ProductType> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }
  async delete(productId: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(productId);
    if (!result) {
      throw new NotFoundException(`Product with Id ${productId} not found`);
    }
  }
}

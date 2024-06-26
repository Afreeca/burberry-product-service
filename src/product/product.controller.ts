import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { ProductIdValidation } from '../validation/product-Id-validation';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('products')
@UseGuards(AuthorizationGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: ProductDTO): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  retrieveAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('name/:name')
  retrieveByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDTO,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Get(':id')
  retrieveOne(@Param('id', ProductIdValidation) id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ProductIdValidation) id: string, @Res() response) {
    await this.productService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}

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
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { ProductIdValidation } from 'src/validation/product-Id-validation';
import { ProductDTO } from './dto/product.dto';
import { ProductType } from './entity/product';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(AuthorizationGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: ProductDTO): Promise<ProductType> {
    return this.productService.create(product);
  }

  @Get()
  retrieveAll(): Promise<any> {
    return this.productService.findAll();
  }

  @Get('name/:name')
  retrieveByName(@Param('name') name: string): Promise<ProductType[]> {
    return this.productService.findByName(name);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDTO,
  ): Promise<ProductType> {
    return this.productService.update(id, product);
  }

  @Get(':id')
  retrieveOne(
    @Param('id', ProductIdValidation) id: string,
  ): Promise<ProductType> {
    return this.productService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ProductIdValidation) id: string, @Res() response) {
    await this.productService.delete(id);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}

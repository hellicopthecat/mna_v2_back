import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('product')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product/:companyId')
  create(
    @Param('companyId') companyId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(
      Number(companyId),
      createProductDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }
  @Get('totalProduct/:companyId')
  findTotalProduct(@Param('companyId') companyId: string) {
    return this.productService.findTotalProduct(Number(companyId));
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}

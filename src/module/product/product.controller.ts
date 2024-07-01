import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { GroupConstant } from '@Utils/constant';
import { CreateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller({
    path: 'product',
    version: '1',
})
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    /**
     * Sử dụng @SerializeOptions để chọn hiển thị những data tương ứng đã cấu hình trong Entity
     * @param pagination
     */
    @SerializeOptions({
        groups: [GroupConstant.ADMIN],
    })
    @Get()
    public async getProducts() {
        return this.productService.find({});
    }

    @Post()
    public async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Get('demo')
    public async demo() {
        return this.productService.createDetails();
    }
}

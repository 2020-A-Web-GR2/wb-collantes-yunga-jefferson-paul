import { Controller, Get, HttpCode, Param, InternalServerErrorException, Post, Body, BadRequestException, Put } from '@nestjs/common';
import { BillDetailService } from './bill-detail.service';
import { BillDetailCreateDto } from './dto/bill-detail.create.dto';
import { BillEntity } from '../bill/bill.entity';
import { ValidationError, validate } from 'class-validator';
import { BillDetailEntity } from './bill-detail.entity';
import { ProductEntity } from '../product/product.entity';
import { BillDetailUpdateDto } from './dto/bill-detail.update.dto';

@Controller("bill-detail")
export class BillDetailController {
    constructor(
        private readonly billDetailService: BillDetailService
    ){}

    @Get(":id")
    @HttpCode(200)
    async findBillDetail(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.billDetailService.findOne(id);
        return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        }
    }

    @Post()
    @HttpCode(201)
    async addBillDetail(
        @Body() bodyParams
    ){
        // validator
        const billDetailCreateDto = new BillDetailCreateDto();
        // Data
        billDetailCreateDto.quantity = bodyParams.quantity;
        billDetailCreateDto.unitPrice = bodyParams.unitPrice;
        billDetailCreateDto.total = bodyParams.total;
        billDetailCreateDto.idBill = bodyParams.idBill;
        billDetailCreateDto.idProduct = bodyParams.idProduct;
        try {
            // Validate
            const errors: ValidationError[] = await validate(billDetailCreateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors in fields")
            } else {
                // Create instance
                const newBillDetail = new BillDetailEntity();
                newBillDetail.quantity = billDetailCreateDto.quantity;
                newBillDetail.unitPrice = billDetailCreateDto.unitPrice;
                newBillDetail.total = billDetailCreateDto.total;
                const bill = new BillEntity();
                bill.id = billDetailCreateDto.idBill;
                newBillDetail.bill = bill;
                const product = new ProductEntity();
                product.id = billDetailCreateDto.idProduct;
                newBillDetail.product = product;
                // Send to DB
                const response = await this.billDetailService.createOne(newBillDetail);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        } 
    }

    @Put(":id")
    @HttpCode(201)
    async updateProduct(
        @Param() pathParams,
        @Body() bodyParams
    ){
        // Validaor
        const billDetailUpdateDto = new BillDetailUpdateDto();
        // Data
        billDetailUpdateDto.id = Number(pathParams.id);
        billDetailUpdateDto.quantity = bodyParams.quantity;
        billDetailUpdateDto.unitPrice = bodyParams.unitPrice;
        billDetailUpdateDto.total = bodyParams.total;
         try {
             // Validate
            const errors: ValidationError[] = await validate(billDetailUpdateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors in fields")
            } else {
                //Create instance
                const updatedBillDetail = new BillDetailEntity();
                updatedBillDetail.id = billDetailUpdateDto.id;
                updatedBillDetail.quantity = billDetailUpdateDto.quantity;
                updatedBillDetail.unitPrice = billDetailUpdateDto.unitPrice;
                updatedBillDetail.total = billDetailUpdateDto.total;
                // Send to DB
                const response = await this.billDetailService.updateOne(updatedBillDetail);
                // Send response
                return response;
            }
         } catch (error) {
             console.log(error);
             throw new InternalServerErrorException("Server error");
         }
    }
}
import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
    constructor(
        private UserService: UsersService
    ) {};

    @Get()
    getAll() {
        return this.UserService.findAll();
    }

    @Post() 
    create(@Body() body: any) {
        try {
            return this.UserService.create(body);    
        } catch(error) {
            return error;    
        };
    };

    @Get(':id')
    getOne(@Param('id') id: number) {
        try {
            return this.UserService.findOne(id);
        } catch(error) {
            return error;
        };
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        try {
            return this.UserService.update(id, body);
        } catch(error) {
            return error;
        };
    };

    @Delete(':id')
    delete(@Param('id') id: number) {
        try {
            return this.UserService.delete(id);
        } catch(error) {
            return error;
        };
    };
}

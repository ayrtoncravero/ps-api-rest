import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
    constructor(
        private UserService: UsersService
    ) {};

    @Get()
    getAll() {
        try {
            return this.UserService.findAll();
        } catch(error) {
            return `${error}`;
        };
    }

    @Post() 
    create(@Body() body: any) {
        try {
            return this.UserService.create(body);    
        } catch(error) {
            return `${error}`;
        };
    };

    /* @Get(':id')
    getOne(@Param('id') id: number) {
        try {
            return this.UserService.findOne(id);
        } catch(error) {
            return `${error}`; 
        };
    }; */
    @Get(':id')
    getOne(@Param('id') id: number) {
        try {
            return this.UserService.findOne(id);
        } catch(error) {
            return `${error}`;
        };
    };

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        try {
            return this.UserService.update(id, body);
        } catch(error) {
            return `${error}`;
        }
    };

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await this.UserService.delete(id);
        } catch(error) {
            return `${error}`;
        };
    };
}

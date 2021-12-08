import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('api/users')
export class UsersController {
    constructor(
        private UserService: UsersService
    ) {};

    @Get()
    getAll() {
        return this.UserService.findAll();
    };

    @Post()
    create(@Body() body: any) {
        try {
            return this.UserService.create(body);
        } catch(error) {
            return error;
        };
    }
}

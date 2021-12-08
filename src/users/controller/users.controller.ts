import { Controller, Get } from '@nestjs/common';
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
}

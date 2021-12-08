import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {};

    findAll() {
        return this.userRepository.find();
    };

    create(body: any) {
        const user = this.userRepository.create(body);

        this.userRepository.save(user);

        return `Se creo con exito el usuario: ${body.name} ${body.surname}.`;
    };

    findOne(id: number) {
        return this.userRepository.findOne(id);
    };
}

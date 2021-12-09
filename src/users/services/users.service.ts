import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ){};

    findAll() {
        return this.UserRepository.find();
    };

    create(body: any) {
        const user = this.UserRepository.create(body);

        this.UserRepository.save(user);

        return `Se creo con exito el usuario: ${body.name} ${body.surname}.`;
    };

    findOne(id: number) {
        return this.UserRepository.findOne(id);
    };

    async update(id: number, body: any) {
        const user = await this.UserRepository.findOne(id);

        this.UserRepository.merge(user, body);

        this.UserRepository.save(user);

        return `Se actualizo con exito al usuario: ${user.name} ${user.surName}.`;
    };

    async delete(id: number) {
        await this.UserRepository.delete(id);

        return `Se elimino con exito el usuario.`;
    };
}

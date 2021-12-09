import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Any, Repository } from 'typeorm';

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
        validateBody(body);

        //const user = this.UserRepository.create(body);

        //this.UserRepository.save(user);

        //return `Se creo con exito el usuario: ${body.name} ${body.surName}.`;
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

function validateBody(body: any) {
    console.log(body.email);

    if(body.name === '') {
        throw new Error('El nombre es requerido.');
    };

    if(body.surName === '') {
        throw new Error('El apellido es requerido.');
    };

    if(body.email === '') {
        throw new Error('El correo electronico es requerido.');
    };

    /* Validar que el correo tenga el formato correcto
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(body.email)) {
        throw new Error('El correo electronico no tiene un formato invalido.');
    }; */
};

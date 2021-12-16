import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ){};

    async findAll() {
        let users = await this.UserRepository.find();

        if(!users) {
            throw new Error('No existen usuarios.');
        };

        return users;
    };

    create(CreateUserDto: CreateUserDto) {
        validateBody(CreateUserDto);
        
        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 

        if(!regex.test(CreateUserDto.email)) {
            throw new Error('El correo electronico no tiene un formato invalido.');
        }; 

        const user = this.UserRepository.create(CreateUserDto);

        this.UserRepository.save(user);

        return `Se creo con exito el usuario: ${CreateUserDto.name} ${CreateUserDto.surName}.`;
    };

    async findOne(id: number) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el usuario.';
        };

        let user = await this.UserRepository.findOne(id);

        if(!user) {
            return "El usuario no existe.";
        };

        return user;
    };

    async update(id: number, body: any) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el usuario.';
        };

        if(body.name === '') {
            return 'El nombre es requerido.';
        };

        if(body.surName === '') {
            return 'El apellido es requerido.';
        };

        if(body.email === '') {
            return 'El correo electronico es requerido.';
        };

        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 

        if(!regex.test(body.email)) {
            return 'El correo electronico no tiene un formato invalido.';
        }; 

        let user = await this.UserRepository.findOne(id);

        if(!user) {
            return 'No existe el usuario.';
        };

        this.UserRepository.merge(user, body);

        this.UserRepository.save(user);

        return `Se actualizo con exito al usuario: ${user.name} ${user.surName}.`;
    };

    async delete(id: number) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el usuario.';
        };

        let user = await this.UserRepository.findOne(id);

        if(!user) {
            throw new Error('El usuario no existe.');
        };

        await this.UserRepository.delete(id);

        return 'Se elimino con exito el usuario.';
    };
}

function validateBody(body: any) {
    if(body.name === '') {
        throw new Error('El nombre es requerido.');
    };

    if(body.surName === '') {
        throw new Error('El apellido es requerido.');
    };

    if(body.email === '') {
        throw new Error('El correo electronico es requerido.');
    };

    //Validar que el correo tenga el formato correcto
    /* if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(body.email)) {
        console.log(body.email);
        throw new Error('El correo electronico no tiene un formato invalido.');
    };  */
};

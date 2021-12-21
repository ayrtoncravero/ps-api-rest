import { 
    BadRequestException, 
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
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
            throw new NotFoundException('No existen usuarios.');
        };

        return users;
    };

    create(CreateUserDto: CreateUserDto) {
        validateBody(CreateUserDto);
        
        const user = this.UserRepository.create(CreateUserDto);

        this.UserRepository.save(user);

        return {
            message: 'Se creo con exito el usuario.'
        }
    };

    async findOne(id: number) {
        let user = await this.UserRepository.findOne(id);

        if(!user) {
            throw new NotFoundException('El usuario no existe.');
        };

        return user;
    };

    async update(id: number, body: any) {
        validateBody(body)

        let user = await this.UserRepository.findOne(id);

        if(!user) {
            throw new NotFoundException('No existe el usuario.');
        };

        this.UserRepository.merge(user, body);

        this.UserRepository.save(user);

        return {
            message: 'Se actualizo con exito al usuario.'
        }
    };

    async delete(id: number) {
        let user = await this.UserRepository.findOne(id);

        if(!user) {
            throw new NotFoundException('No existe el usuario.');
        };

        await this.UserRepository.delete(id);

        return {
            message: 'Se elimino con exito el usuario.'
        };
    };
}

function validateBody(body: any) {
    if(body.name === '') {
        throw new BadRequestException('El nombre es requerido.');
    };

    if(body.surname === '') {
        throw new BadRequestException('El apellido es requerido.');
    };

    if(body.email === '') {
        throw new BadRequestException('El correo electronico es requerido.');
    };
};

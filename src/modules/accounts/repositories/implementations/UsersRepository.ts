import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Repository, getRepository } from "typeorm";
import { User } from "../../entities/User";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async create({name, email, driver_license, password, id, avatar}: ICreateUserDTO): Promise<void> {
        
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            id,
            avatar
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User>{

        const user =  await this.repository.findOne({email});

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export {UsersRepository}
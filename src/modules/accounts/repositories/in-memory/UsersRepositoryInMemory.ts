import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

 
 class UsersRepositoryInMemory implements IUsersRepository{

    users: User[] = [];

    async create({name, email, driver_license, password}: ICreateUserDTO): Promise<void> {

      const user = new User();

      Object.assign(user, {
        name,
        email,
        driver_license,
        password,
      });
      
      this.users.push(user);

    }

    async findByEmail(email: string): Promise<User> {

      return this.users.find((user) => user.email === email);
        
    }

    async findById(id: string): Promise<User> {

      return this.users.find((user) => user.id === id);
        
    }
 }
 
 export {UsersRepositoryInMemory}
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "../entities/Rental";
import { Repository, getRepository } from "typeorm";


class RentalsRepository implements IRentalRepository {

    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }

    async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {

        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id 
        });

        await this.repository.save(rental);

        return rental;
        
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {

        const openByCar = await this.repository.findOne({car_id});

        return openByCar;
        
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {

        const openByUser = await this.repository.findOne({user_id});

        return openByUser;
        
    }
}

export {RentalsRepository}
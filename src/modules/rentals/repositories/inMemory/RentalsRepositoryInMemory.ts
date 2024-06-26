import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "../IRentalRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";


class RentalsRepositoryInMemory implements IRentalRepository{
    rentals: Rental[] = [];

    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(rental);

        return rental;
        
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
        
        return rental;
        
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
        
        return rental;
    }
}

export {RentalsRepositoryInMemory};
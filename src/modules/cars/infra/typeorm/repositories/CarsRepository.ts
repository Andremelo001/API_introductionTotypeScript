import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

class CarsRepository implements ICarsRepository{
    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }

    async create({name, description, brand, category_id, daily_rate, fine_amount, license_plate}: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            description,
            brand, 
            category_id, 
            daily_rate, 
            fine_amount, 
            license_plate,
        });

        await this.repository.save(car);
        
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        const car = await this.repository.findOne({
            license_plate
        });

        return car;
    }
}

export {CarsRepository}
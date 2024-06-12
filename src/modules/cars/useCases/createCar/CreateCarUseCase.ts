import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IResquest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase{
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: IResquest): Promise<Car>{

        const carAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExist){
            throw new AppError("Car already exists!");

        }

        const car = await this.carsRepository.create({
            name, 
            description, 
            brand, 
            category_id, 
            daily_rate, 
            fine_amount, 
            license_plate,
        });   
        
        return car;
    }
}

export {CreateCarUseCase}
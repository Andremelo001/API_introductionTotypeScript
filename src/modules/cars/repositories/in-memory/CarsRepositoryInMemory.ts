import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository{
    cars: Car[] = [];

    async create({name, description, brand, category_id, daily_rate, fine_amount, license_plate, id}: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name, 
            description, 
            brand, 
            category_id, 
            daily_rate, 
            fine_amount, 
            license_plate,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find((car) => car.license_plate === license_plate);
        
        return car;
        
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

        const all = this.cars.filter((car) => {
            if(
                car.available === true || 
                ((brand && car.brand === brand) || 
                (category_id && car.category_id === category_id) || 
                (name && car.name === name))
            ){
                return car;

            }
            return null;
        });

        return all;
    }

    async findByid(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);

    }
}

export {CarsRepositoryInMemory}
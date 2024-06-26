import { AppError } from "@shared/errors/AppError";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}
    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental>{

        const minimunHour = 24;

        const carUnAvailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if(carUnAvailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental is progress for user");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minimunHour){
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }

}

export {CreateRentalUseCase};
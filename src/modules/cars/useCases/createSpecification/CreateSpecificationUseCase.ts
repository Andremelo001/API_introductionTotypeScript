import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface Request{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){}

    async execute({name, description}: Request): Promise<void>{

        const specificationAlreadyExist = await this.specificationRepository.findByName(name);

        if(specificationAlreadyExist){
            throw new AppError("specification already exists");
        }

        await this.specificationRepository.create({
            name,
            description
        })
        
    }


}

export {CreateSpecificationUseCase};
import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { AppError } from "../../../../errors/AppError";

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
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoryRepository
    ){}

    async execute(): Promise<Category[]> {
        
        const categories = await this.categoryRepository.list();
        return categories;

    }
}

export { ListCategoryUseCase }
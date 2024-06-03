import { EntityRepository, Repository, getRepository } from "typeorm";
import { Category } from "../../entities/category";
import { 
    ICategoryRepository, 
    ICreateCategoryDTO 
} from "../ICategoryRepository";

@EntityRepository(Category)
class CategoriesRepository implements ICategoryRepository{

    private repository: Repository<Category>;

    constructor(){
        this.repository = getRepository(Category);
    }


    async create({name, description}: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        
        return categories;

    }

    async findByName(name: string): Promise<Category> {

        const categories = await this.repository.findOne({ name });

        return categories;

    }

}

export {CategoriesRepository}
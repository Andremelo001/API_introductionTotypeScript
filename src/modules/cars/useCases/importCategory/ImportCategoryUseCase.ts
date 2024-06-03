import fs from "fs";
import { parse } from 'csv-parse';
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{

    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoryRepository
    ){}

    loadCayegories(file: Express.Multer.File): Promise<IImportCategory[]>{

        return new Promise((resolve, reject) => {
            
            const categories: IImportCategory[] = [];

            const stream = fs.createReadStream(file.path);
    
            const parseFile = parse();
    
            stream.pipe(parseFile);
    
            parseFile.on("data", async (line) => {
    
                const [name, description] = line;
                categories.push({
                    name,
                    description,
                });
            })

            .on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            })

            .on("error", (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void>{ 

        const categories = await this.loadCayegories(file);
        

        categories.map( async (category) => {
            const {name, description} = category;

            const existCayegory = await this.categoryRepository.findByName(name);

            if(!existCayegory){
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }

}

export {ImportCategoryUseCase}
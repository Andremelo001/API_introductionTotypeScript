import { container } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


container.registerSingleton<ICategoryRepository> (
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository> (
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUsersRepository> (
    "UsersRepository", 
    UsersRepository
)


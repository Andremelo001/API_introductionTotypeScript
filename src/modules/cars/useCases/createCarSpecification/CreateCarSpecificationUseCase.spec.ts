import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specificatio to a now-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specificatio to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "NameCar",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "test",
            description: "test",
        });

        const specifications_id = [specification.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });

        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    });

});
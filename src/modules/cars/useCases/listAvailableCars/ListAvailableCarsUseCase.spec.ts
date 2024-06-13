import "reflect-metadata";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

describe("List Cars", () => {
    let listAvailableCarsUseCase: ListAvailableCarsUseCase;
    let carsRepositoryInMemory: CarsRepositoryInMemory;

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car1", 
            description: "Car description",
            brand: "Car_brand", 
            category_id: "category_id", 
            daily_rate: 110, 
            fine_amount: 40, 
            license_plate: "DEF-1234"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2", 
            description: "Car description",
            brand: "Car_brand_test", 
            category_id: "category_id", 
            daily_rate: 110, 
            fine_amount: 40, 
            license_plate: "DEF-1234"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3", 
            description: "Car description",
            brand: "Car_brand_test", 
            category_id: "category_id", 
            daily_rate: 110, 
            fine_amount: 40, 
            license_plate: "DEF-12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4", 
            description: "Car description",
            brand: "Car_brand_test", 
            category_id: "12345", 
            daily_rate: 110, 
            fine_amount: 40, 
            license_plate: "DEF-12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
})
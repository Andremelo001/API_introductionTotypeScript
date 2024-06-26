import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { Request, Response } from "express";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { car_id, expected_return_date } = request.body;
            const { id } = request.user;

            const createRentalUseCase = container.resolve(CreateRentalUseCase);

            const rental = await createRentalUseCase.execute({
                car_id,
                expected_return_date,
                user_id: id,
            });

            return response.status(201).json(rental); 
        } catch (error) {
            console.error(error);

            if (!response.headersSent) {
                return response.status(500).json({ error: error.message });
            }
        }
    }
}

export { CreateRentalController }

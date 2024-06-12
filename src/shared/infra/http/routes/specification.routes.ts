import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const createSpecificationController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export {specificationRoutes}; 
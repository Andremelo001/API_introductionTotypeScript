import { Router } from "express";
import  Multer  from "multer";

import { CreateCategoryControler } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategories/ListCategoryController";

const categoriesRoutes = Router();

const upload = Multer({
    dest: "./tmp", 

});

const createCategoryController = new CreateCategoryControler();

const listCategoryController = new ListCategoryController();

const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);


export { categoriesRoutes };
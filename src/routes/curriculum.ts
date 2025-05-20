import { Router } from "express";
import { authorize } from "../utils/authorize";
import { AddCurriculumController, DeleteCurriculumController, GetCurriculumController, UpdateCurriculumController } from "../controller/curriculum";

const getController = new GetCurriculumController();
const addController = new AddCurriculumController();
const updateController = new UpdateCurriculumController();
const deleteController = new DeleteCurriculumController();


const Route = Router();

Route.get('/curriculum/list', authorize, getController.getCurriculum);
Route.post('/curriculum/add', authorize, addController.setCurriculum);
Route.put('/curriculum/update', authorize, updateController.updateCurriculum);
Route.delete('/curriculum/delete/:id', authorize, deleteController.deleteCurriculum);

export default Route;
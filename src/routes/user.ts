import { Router } from "express";
import { AddUserController } from "../controller/user/add-user-controller";
import { GetUserController } from "../controller/user/get-user-controller";
import { UpdateUserController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";

const addController = new AddUserController();
const getController = new GetUserController();
const updateController = new UpdateUserController();
const deleteController = new DeleteUserController();

const Route = Router();

Route.post('/user/add', addController.setUser);
Route.get('/user/list', getController.getUser);
Route.put('/user/update', updateController.updateUser);
Route.delete('/user/delete/:id', deleteController.deleteUser);

export default Route;
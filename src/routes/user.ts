import { Router } from "express";
import { AddUserController } from "../controller/user/add-user-controller";
import { GetUserController } from "../controller/user/get-user-controller";
import { UpdateUserController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";
import { LoginUserController } from "../controller/user/login-user-controller";
import { authorize } from "../utils/authorize";

const loginController = new LoginUserController();
const addController = new AddUserController();
const getController = new GetUserController();
const updateController = new UpdateUserController();
const deleteController = new DeleteUserController();


const Route = Router();

Route.post('/user/login', loginController.loginUser);
Route.post('/user/add', addController.setUser);
Route.get('/user/list', authorize, getController.getUser);
Route.put('/user/update', authorize, updateController.updateUser);
Route.delete('/user/delete/:id', authorize, deleteController.deleteUser);

export default Route;
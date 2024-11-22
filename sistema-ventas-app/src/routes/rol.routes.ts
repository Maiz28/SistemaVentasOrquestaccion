import { Router } from "express";
import { rolController } from "../controller/roles.controllers";

class RolRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config() {
    this.router.get("/getRol", rolController.getRoles);
  }
}

const rolRoutes = new RolRoutes();
export default rolRoutes.router;

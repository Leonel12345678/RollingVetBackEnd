import { Router } from "express";
import { route } from "express/lib/application";
import pacienteCtrl from "../controllers/pacientes.controllers";

const router = Router();

router
  .route("/pacientes")
  .get(pacienteCtrl.getPacientes)
  .post(pacienteCtrl.postPaciente);

  router
    .route('/pacientes/id:')
    .put(pacienteCtrl.modificarPaciente);

  

export default router;

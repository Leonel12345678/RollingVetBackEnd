import Paciente from "../models/pacientes";
import {
  validateEmail,
  validateTexto,
  validateTelefono,
} from "../helpers/Validaciones";
import res from "express/lib/response";

const pacienteCtrl = {};

pacienteCtrl.getPacientes = async (req, res) => {
  //res.send('aqui enviaria la lista de pacientes');
  try {
    const listaPacientes = await Paciente.find();
    res.status(200).json(listaPacientes);
  } catch (error) {
    console.log(error);
    res.status(404).json({ mensaje: "Error al intentar listar los pacientes" });
  }
};

pacienteCtrl.postPaciente = async (req, res) => {
  // res.send('doy de alta un paciente');
   console.log(req.body);
  try {
    //validar el (req.body) copiadas del front
    if (
      validateTexto(req.body.nombreDueño) &&
      validateTexto(req.body.apellidoDueño) &&
      validateEmail(req.body.email) &&
      validateTelefono(req.body.telefono) &&
      validateTexto(req.body.nombreMascota) &&
      validateTexto(req.body.especieMascota) &&
      validateTexto(req.body.razaMascota)
    ) {
      //crear un obj para guardar en la BBDD
      const newPaciente = new Paciente({
        nombreDueño: req.body.nombreDueño,
        apellidoDueño: req.body.apellidoDueño,
        email: req.body.email,
        telefono: req.body.telefono,
        nombreMascota: req.body.nombreMascota,
        especieMascota: req.body.especieMascota,
        razaMascota: req.body.razaMascota,
      });
      //una vez creado se guarda en la BBDD
      await newPaciente.save();
      //enviar resp al front end
      res.status(201).json({
        mensaje: "El producto se creo correctamente",
      });
    }
  } catch (error) {
    console.log(error);
    //envio de respuesta al front
    res.status(404).json({
      mensaje: "Error al intentar agregar un producto",
    });
  }
};
//responde a petición PUT
pacienteCtrl.modificarPaciente = async(req, res)=>{
  
  const objModificar = req.body;
  const parametro = req.body.id;
  const objParaModificar = await Paciente.findOneAndUpdate(parametro, objModificar);
  res.status(200).json(objParaModificar);
}


export default pacienteCtrl;

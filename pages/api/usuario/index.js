import conexionBD from '../../../config/conexionBD';
import { getSession } from 'next-auth/react';
import ModeloUsuarios from '../../../models/usuarios';


export default async function handler(req, res){
    
    const { method } =  req;
    // const session = await getSession({req});
    // if(!session) {
    //   return res.status(401).json({message: `Error intentando hacer un ${req.method} en ${req.url}: Usuario no registrado`})  
    // }

    await conexionBD().catch(err => `error en la conexion ${err}`);

    const doGet = async () => {
        try{
            const usuarios = await ModeloUsuarios.find().populate('nombre');
            res.status(200).json({msg: 'exito', usuarios})
        }catch(err){
            res.status(400).json({msg: 'error'});
        }
    } 


    const doPost = async () => {
        try{
            const {nombre, email, password} = req.body;
            const nuevoUsuario = new ModeloUsuarios({
                nombre,
                email,
                password
            })
            await nuevoUsuario.save();
            res.status(200).json({
                msg: 'nuevo usuario registrado'
            })
        } catch(err){
            res.status(400).json({msg: "errores"})
        }
    };


    switch(method) {
        case 'GET':
          await doGet();
        break;

        case 'POST':
            await doPost();
          break;

        default:
        // Se intento usar un caso no especificado
          res.status(405).json({ message: `Metodo no permitido: haciendo ${req.method} en ${req.url}` });
        return;
    }
}
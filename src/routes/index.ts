import { Router, Request, Response } from "express";
import militar from './Militar';
import soldado from './Soldado';
import patente from './Patente';


const routes = Router();
routes.use("/militar", militar);
routes.use("/soldado", soldado);
routes.use("/patente", patente);

routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
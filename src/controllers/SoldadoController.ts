import { Request, Response } from "express";
import { Soldado } from "../models";

class SoldadoController {

    // create

    public async create(req: Request, res: Response): Promise<Response> {
        const { cim, altura, militar } = req.body;
        try {
            const document = new Soldado({ cim, altura, militar });
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este cim já está em uso!" });
            } else if (error && error.errors["cim"]) {
                return res.json({ message: error.errors["cim"].message });
            } else if (error && error.errors["altura"]) {
                return res.json({ message: error.errors["altura"].message });
            } else if (error && error.errors["militar"]) {
                return res.json({ message: error.errors["militar"].message });
            }    
            return res.json({ message: error.message });
        }
    }

    // list

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const objects = await Soldado.find().sort({ cim: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Soldado.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, cim, altura, militar } = req.body;
        try {
            // busca o livro existente na coleção antes de fazer o update
            const document = await Soldado.findById(id);
            if (!document) {
                return res.json({ message: "Soldado inexistente!" });
            }
            // atualiza os campos
            document.cim = cim;
            document.altura = altura;
            document.militar = militar;
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error && error.errors["cim"]) {
                return res.json({ message: error.errors["cim"].message });
            } else if (error && error.errors["altura"]) {
                return res.json({ message: error.errors["altura"].message });
            } else if (error && error.errors["militar"]) {
                return res.json({ message: error.errors["militar"].message });
            }
            return res.json({ message: error });
        }
    }
}
export default new SoldadoController();
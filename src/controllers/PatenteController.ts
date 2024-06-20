import { Request, Response } from "express";
import { Patente } from "../models";

class PatenteController {

    // create

    public async create(req: Request, res: Response): Promise<Response> {
        const { codigo, descricao } = req.body;
        try {
            const document = new Patente({ codigo, descricao });
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error && error.errors["codigo"]) {
                return res.json({ message: error.errors["codigo"].message });
            } else if (error && error.errors["descricao"]) {
                return res.json({ message: error.errors["descricao"].message });
            }
            return res.json({ message: error });
        }
    }

    // list

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const objects = await Patente.find().sort({ codigo: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
    // delete

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Patente.findByIdAndDelete(_id);
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
        const { id, codigo, descricao } = req.body;
        try {
            // busca o registro existente na coleção antes de fazer o update
            const document = await Patente.findById(id);
            if (!document) {
                return res.json({ message: "Registro inexistente!" });
            }
            // atualiza os campos
            document.codigo = codigo;
            document.descricao = descricao;
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error && error.errors["livro"]) {
                return res.json({ message: error.errors["livro"].message });
            } else if (error && error.errors["autor"]) {
                return res.json({ message: error.errors["autor"].message });
            }
            return res.json({ message: error });
        }
    }
}

export default new PatenteController();
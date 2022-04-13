import { StatusCode } from "status-code-enum";
import { autores } from "../models/Autor.js";

export default class autoresController {

    static async getAll(req, res) {
        const allLivros = await autores.find();
        
        return res.status(StatusCode.SuccessOK).json({mensagem:'Autores encontrados com sucesso', content: allLivros});
    }

    static async getOne(req, res) {
        const { id } = req.params;
        try {
            const autor = await autores.findById(id);
            return res.status(StatusCode.SuccessOK).json({mensagem: 'autor encontrado com sucesso', content:autor});
        } catch(err) {
            return res.status(204).json({mensagem: `autor nao encontrado`});
        }
    }

    static async create(req, res) {
        const autor = new autores(req.body);

        try {
            await autor.save();
        } catch(err) {
            return res.status(StatusCode.ServerErrorInternal).json({mensagem: `${err.message} - falha ao cadastrar o autor`});
        }
        

        return res.status(StatusCode.SuccessCreated).json({mensagem: 'autor cadastrado com sucesso', content: autor.toJSON()});
    }

    static async update(req, res) {
        const { id } = req.params;

        try {
            await autores.findByIdAndUpdate(id, {$set: req.body});
            const autor = await autores.findById(id);
            return res.status(StatusCode.SuccessOK).json({mensagem:'autor atualizado', content: autor});
        } catch(err) {
            return res.status(StatusCode.ServerErrorInternal).json({mensagem: `${err.message}`})
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            await autores.findByIdAndDelete(id);
            return res.status(StatusCode.SuccessNoContent).json({mensagem: 'autor excluido'});
        } catch(err) {
            return res.status(StatusCode.ClientErrorNotFound).json({mensagem: 'autor nao encontrado'});
        }
    }
}

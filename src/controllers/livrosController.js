import { livros } from "../models/Livro.js";
import { StatusCode } from "status-code-enum";

export default class livrosController {

    static async getAll(_, res) {
        const allLivros = await livros.find().populate('autor').exec();
        
        return res.status(StatusCode.SuccessOK).json({mensagem:'Livros encontrados com sucesso', content: allLivros});
    }

    static async getOne(req, res) {
        const { id } = req.params;
        try {
            const livro = await livros.findById(id).populate('autor', 'nome').exec();
            return res.status(StatusCode.SuccessOK).json({mensagem: 'livro encontrado com sucesso', content:livro});
        } catch(err) {
            return res.status(StatusCode.SuccessNoContent).json({mensagem: `livro nao encontrado`});
        }
    }

    static async create(req, res) {
        const livro = new livros(req.body);

        try {
            await livro.save();
        } catch(err) {
            return res.status(StatusCode.ServerErrorInternal).json({mensagem: `${err.message} - falha ao cadastrar o livro`});
        }
        

        return res.status(StatusCode.SuccessCreated).json({mensagem: 'livro cadastrado com sucesso', content: livro.toJSON()});
    }

    static async update(req, res) {
        const { id } = req.params;

        try {
            await livros.findByIdAndUpdate(id, {$set: req.body});
            const livro = await livros.findById(id);
            return res.status(StatusCode.SuccessOK).json({mensagem:'livro atualizado', content: livro});
        } catch(err) {
            return res.status(StatusCode.ServerErrorInternal).json({mensagem: `${err.message}`})
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            await livros.findByIdAndDelete(id);
            return res.status(StatusCode.SuccessNoContent).json({mensagem: 'livro excluido'});
        } catch(err) {
            return res.status(StatusCode.ClientErrorNotFound).json({mensagem: 'livro nao encontrado'});
        }
    }


    static async findByEditora(req, res) {
        const { editora } = req.query;
        
        try {
            const livrosEditora = await livros.find({editora});
            const mensagem = livrosEditora.length > 0 ? 'Livros econtrados com sucesso' : 'Nenhum livro encontrado';
            return res.status(StatusCode.SuccessOK).json({mensagem, content: livrosEditora});
        } catch(err) {
            return res.status(StatusCode.ServerErrorInternal).json({mensagem: `Erro ao buscar livros por autora - ${err.message}`});
        }
    }
}

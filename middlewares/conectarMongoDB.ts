import type {NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import type{RespostaPadraoMsg} from '../types/RespostaPadraoMsg';
import endpointCadastro from '@/pages/api/cadastro';



export const conectarMongoDb = (handler: NextApiHandler) => {
    return  async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        // verificar se o banco ja esta conectado , estiver seguir
        // para o endpoint ou proximo middleware
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        //ja que nao esta conectado vamos conectar 
        // obter a variavel de ambiente preenchida do env
        const { DB_CONEXAO_STRING } = process.env;
        // se a env estiver vazia aborta o uso do sistema e avisa o programador
        if (!DB_CONEXAO_STRING) {
            return res.status(500).json({ erro: 'env de config do banco , nao informado' });

        }

        mongoose.connection.on('connected', () => console.log('banco de dados conectado!'));
        mongoose.connection.on('error', error => console.log(`ocorreu erro ao conectar no banco: ${error}`));
        await mongoose.connect(DB_CONEXAO_STRING);
        return handler(req, res);
    }
}

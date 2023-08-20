import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { conectarMongoDb } from '@/middlewares/conectarMongoDB';
import { validarTokenJWT } from '@/middlewares/validarTokenJWT';
import { UsuarioModel } from '@/models/UsuarioModel';

const pesquisaEnpoit
    = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {

        try {

            if (req.method === 'GET') {
                if(req?.query?.id) {
                    const usuarioEncontrado = await UsuarioModel.findById(req?.query?.id)
                    if (!usuarioEncontrado) {
                        return res.status(400).json({ erro: 'usuario nao encontrado ' })
                    }
                    usuarioEncontrado.senha =null;
                    return res.status(200).json(usuarioEncontrado);
               } } else {

                    const { filtro } = req.query;
                    if (filtro && filtro.length < 2) {
                        return res.status(400).json({ erro: 'metodo informado nao valido ' })
                    }
                    const usuariosEncontrados = await UsuarioModel.find({
                        $or: [{ nome: { $regex: filtro, $options: 'i' } }]

                    });

                    return res.status(200).json(usuariosEncontrados);
                }
                return res.status(405).json({ erro: 'favor informar pelo menos 2 caracteres para busca' })
            }catch(e) {
                       return res.status(500).json({ erro: 'nao foi possivel buscar usuarios: ' + e });
            }
          

        }
    
        export default validarTokenJWT(conectarMongoDb(pesquisaEnpoit));


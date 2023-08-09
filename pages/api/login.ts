
import type {NextApiRequest, NextApiResponse} from 'next';
import {conectarMongoDb} from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

const endpointLogin = (
     req : NextApiRequest,
     res : NextApiResponse<RespostaPadraoMsg>

) =>  {
      if(req.method === 'POST'){
        const {login, senha} = req.body;

        if(login === 'admin@admin.com' &&
            senha ==='Admin@123'){ 
            return res.status(200).json({msg:'Usuario autenticado com sucesso'});

            }
            return res.status (405).json({erro: 'Usuario o senha nao encontrado'});

        }
        return res.status (405).json({erro: 'Metodo informado não é valido'});
      
}      
export default conectarMongoDb(endpointLogin);
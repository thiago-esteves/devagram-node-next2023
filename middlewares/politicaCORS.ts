import type { NextApiRequest,NextApiResponse,NextApiHandler } from "next";
import type{RespostaPadraoMsg} from '../types/RespostaPadraoMsg';
import nextConnect from "next-connect";
import NextCors from "nextjs-cors";


export const politicaCORS = (hander : NextApiHandler) =>
 async(req : NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>)=>{
    try{

        await NextCors (req,res, {  
             origin:'*' ,
             methods : ['GET','POST','PUT'],
             optionsSucessStatus:200,
        });

        return hander(req, res);
    }catch(e){
        console.log('Erro ao tratar a politica de CORS:', e );
        res.status(500).json({erro:'Ocorreu o erro ao tratar a politica de CORS'})

    }
}
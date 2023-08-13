import type { NextApiRequest,NextApiResponse } from "next";
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';



const usuarioEndpoint = (req: NextApiRequest, res :NextApiResponse)=>{
    return res.status(200).json('Usuario autenciado com sucessso')

}

export default validarTokenJWT(usuarioEndpoint);
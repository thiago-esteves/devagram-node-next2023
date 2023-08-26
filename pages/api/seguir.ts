import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDb } from "@/middlewares/conectarMongoDB";
import { UsuarioModel } from "@/models/UsuarioModel";
import { SeguidorModel } from "@/models/SeguidorModel";

const endpointSeguir =
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        try {
            if (req.method === 'PUT') {

                const { userId, id } = req?.query;

                const usuarioLogado = await UsuarioModel.findById(userId);
                if (!usuarioLogado) {
                    return res.status(400).json({ erro: 'Usuario logado nao encontrado' })
                }
                //quais dados vamos receber e AONDE?
                const usuarioASerSeguido = await UsuarioModel.findById(id);
                if (!usuarioASerSeguido) {
                    return res.status(400).json({ erro: 'Usuario a ser Seguidor ' })
                }
                // inserir o registro??
                // e se ela ja segue??
                const euJaSigoEsseUsuario = await SeguidorModel.find({usuarioId: usuarioLogado._id, usuarioSeguidoId:usuarioASerSeguido._id })
                if(euJaSigoEsseUsuario && euJaSigoEsseUsuario.length > 0){
                    euJaSigoEsseUsuario.forEach(async(e:any)=> await SeguidorModel.findByIdAndUpdate({_id: e._id}))
                    usuarioLogado.seguindo--;
                    await UsuarioModel.findByIdAndUpdate({_id : usuarioLogado._id}, usuarioLogado);
                    usuarioASerSeguido.seguidores --;
                    await UsuarioModel.findByIdAndUpdate({_id: usuarioASerSeguido._id},usuarioASerSeguido);
                    return res.status(200).json({msg:'Deixou de seguir o usuario com sucesso'})

                }else{
                    const seguidor = {
                        usuarioId: usuarioASerSeguido,
                        usuarioSeguidoId : usuarioASerSeguido

                    }
                    await SeguidorModel.create(seguidor);

                    usuarioLogado.seguindo++;
                    await UsuarioModel.findByIdAndUpdate({_id: usuarioLogado._id}, usuarioLogado);
                    usuarioASerSeguido.seguidores++;
                    await UsuarioModel.findByIdAndUpdate({_id: usuarioASerSeguido._id}, usuarioASerSeguido);


                    return res.status(200).json({erro:'Usuario seguido com sucesso'});

                }
            }
          
            return res.status(405).json({ erro: 'Metodo informado nao existe' })

        } catch (e) {
            console.log(e);
            return res.status(500).json({ erro: 'Nao foi possivel seguir/deseguir o usuario informado' });
        }


    }

export default validarTokenJWT(conectarMongoDb(endpointSeguir));

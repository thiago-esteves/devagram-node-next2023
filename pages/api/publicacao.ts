import type {  NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import nc from 'next-connect';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';
import { conectarMongoDb } from '../../middlewares/conectarMongoDB';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { PUblicacaoModel } from '../../models/PublicacaoModel';
import { UsuarioModel } from '../../models/UsuarioModel';


const handler = nc()
    .use(upload.single('file'))
    .post(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {

        try {
            const {UserId } = req.query;
            const usuario = await UsuarioModel.findById(UserId);
            if (!usuario) {
                return res.status(400).json({ erro: 'Usuario nao encontrado ' });

            }
            if (!req || !req.body) {
                return res.status(400).json({ erro: 'Paramentros de entrada nao informados ' });

            }
            const {descricao} = req?.body;

            if (!descricao || descricao.length < 2) {
                return res.status(400).json({ erro: 'Descricao nao é valida' })
            }
            if (!req.file || !req.file.originalname) {
                return res.status(400).json({ erro: 'Imagem e obrigatoria' })
            }

            const image = await uploadImagemCosmic(req);
            const publicacao = {
                idUsuario: usuario._id,
                descricao,
                foto: image.media.url,
                data: new Date()
                       }
            await PUblicacaoModel.create(publicacao);
            return res.status(200).json({ msg: 'Publicacao criada com sucesso' })
        } catch (e) {
            console.log(e);
            return res.status(400).json({ msg: 'Erro ao cadastrar ' })

        }
    });
export const config = {
    api: {
        bodyParser: false
    }
}

export default validarTokenJWT(conectarMongoDb(handler)); 
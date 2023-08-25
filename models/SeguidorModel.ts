
import mongoose,{Schema} from "mongoose";

      // quem segue

const SeguidorSchema = new Schema({
    usuarioId : { type:String,required : true},
    // quem esta sendo seguido
    usuarioSeguidoId : { type:String,required : true},


});

export const SeguidorModel =(mongoose.models.seguidores || 
    mongoose.model('seguidores', SeguidorSchema
));


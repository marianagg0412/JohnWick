import {model, Schema} from 'mongoose';
import {User} from '../interfaces/User';

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["AltaMesa", "LiderDeRegion", "Asesino", "Adjudicador"]
    },
    region:{
        type: String,
        required: function(){
            return this.role === "LiderDeRegion"
        }
    },
    sanctions:[{
        type: Schema.Types.ObjectId,
        ref: 'Sanction',
        required: false
    }]
})

const userModel = model('User', UserSchema);
export default userModel;
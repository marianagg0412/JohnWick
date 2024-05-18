import {Auth} from "../interfaces/Auth";
import {User} from "../interfaces/User";
import UserModel from "../models/User.model";
import {encrypt, verify} from "../utils/bcrypt.utils";
import {signToken} from "../utils/jwt.utils";
import SanctionModel from "../models/Sanction.model";

export const registerUser = async (authUser: User) => {
    const { username, password, sanctions, role, region } = authUser;
    const exist = await UserModel.findOne({ username });
    if (exist) return 'Ya existe el usuario';
    const passwordHash = await encrypt(password);

    const newUserFields: Partial<User> = {
        username,
        password: passwordHash,
        role
    };
    // If region exists and role is 'LiderDeRegion', include it in the new user object
    if (region && role === "LiderDeRegion") {
        newUserFields.region = region;
    }
    // Create the new user
    const newUser = await UserModel.create(newUserFields);
    // Generate a token for the new user
    const token = signToken(newUser.username, newUser.role);

    return { user: newUser, token };
}

export const loginUserService = async (authUser: Auth) => {
    const {username, password} = authUser;
    const user = await UserModel.findOne({username});

    if(!user) return 'No existe el usuario';

    const passwordHash = user.password;
    const isCorrect = await verify(password, passwordHash);

    if(!isCorrect) return 'Datos incorrectos';

    const token = signToken(username, user.role);
    return {username, message: "Success", token};
}

export const getUsers = async() => {
    try{
        return await UserModel.find();
    }catch(error){
        console.log(error);
    }
}

export const addSanction = async (userId: string, sanctionId: string) => {
    try{
        const user = await UserModel.findById(userId);
        if(!user) return 'No existe el usuario';
        const sanction = await SanctionModel.findById(sanctionId);
        if(!sanction) return 'No existe la sanción';
        return await UserModel.findByIdAndUpdate(userId, {$push: {sanctions: sanction._id}}, {new: true});
    }catch(error){
        console.log(error);
    }
}

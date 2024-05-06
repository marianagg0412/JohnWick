import { Auth } from "../interfaces/Auth";
import { User } from "../interfaces/User";
import UserModel from "../models/User.model";
import { encrypt, verify } from "../utils/bcrypt.utils";
import { signToken } from "../utils/jwt.utils";

export const registerUser = async (authUser: User) => {
    const {username, password, role, region}= authUser;
    const exist = await UserModel.findOne({username});

    if(exist) return 'Ya existe el usuario';

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

    return newUser;
}

export const loginUserService = async (authUser: Auth) => {
    const {username, password} = authUser;
    const user = await UserModel.findOne({username});

    if(!user) return 'No existe el usuario';

    const passwordHash = user.password;
    const isCorrect = await verify(password, passwordHash);

    if(!isCorrect) return 'Datos incorrectos';

    const token = await signToken(username, user.role);
    const loggedUser = {username, message: "Success", token};

    return loggedUser;
}

export const getUsers = async() => {
    try{
        const response = await UserModel.find();
        return response;
    }catch(error){
        console.log(error);
    }
}

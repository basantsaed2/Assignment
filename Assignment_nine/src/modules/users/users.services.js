import { usersModel } from "../../database/models/users.model.js";

export const createUser = async (userData) => {
    try{
        const { name , email , password , phone , age} = userData;
        const userExist = await usersModel.findOne({email})

        if(userExist){
            return {status : 400 , message : "User already exist"}
        }
        const newUser = await usersModel.create({name , email , password , phone , age })
        return {status : 201 , message : "User created successfully" , data : newUser}
    } catch (error) {
        return {status : 500 , message : error.message}
    }
}

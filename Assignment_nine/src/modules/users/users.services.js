import { usersModel } from "../../database/models/users.model.js";

export const createUser = async (userData) => {
    try{
        const { name , email , password , phone , age} =userData;
        const userExist = await usersModel.find({email})

        if(userExist.length > 0){
            return {status : 500 , message : "User already exist"}
        }
        const newUser = await usersModel.create({name , email , password , phone , age })
        return {status : 201 , message : "User created successfully" , data : newUser}
    } catch (error) {
        return {status : 500 , message : error.message}
    }
}

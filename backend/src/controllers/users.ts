import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async(req,res,next)=>{
    

    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};


interface LoginBody{
    username?:string,
    password?:string,
}

export const login:RequestHandler<unknown,unknown,LoginBody,unknown>=async(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    try {
       if(!username||!password){
        throw createHttpError(400, "Parameters missing");
       } 

       const user = await UserModel.findOne({username:username}).select("+password +email").exec();

       if(!user){
        throw createHttpError(401,"Invalid credentials");
       }

       const  passwordMatch = await bcrypt.compare(password, user.password);

       if(!passwordMatch){
        throw createHttpError(401,"Invalid credentials");
       }

       req.session.userId=user._id;
       res.status(201).json(user);
    } catch (error) {
        next(error);
        
    }
};

export const logout:RequestHandler=(req, res, next)=>{
    req.session.destroy(error=>{
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    });
};

interface CreateUserBody {
    username?: string;
    email?: string;
    password?: string;
    type?:string;
  

}

interface CreateUserBody {
    username?: string;
    email?: string;
    password?: string;
    
  
   

}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const type="Manager";
    
   

    try {
        if (!username || !email || !password ||!type) {
            throw createHttpError(400, "User must have a username ,email and password.");
        }

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: password,
            type: "Manager",
            
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};


interface UpdateUserParams {
    userId: string;
}

interface UpdateUserBody {
    username?: string;
    email?: string;
    password?: string;
   
}

export const UpdateUser: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
    const userId = req.params.userId;
    const newusername = req.body.username;
    const newemail = req.body.email;
    const newpassword = req.body.password;
    

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid userid");
        }

        if (!newusername || !newemail || !newpassword ) {
            throw createHttpError(400, "User must have a username, email, password .");
        }

        const userItem = await UserModel.findById(userId).exec();

        if (!userItem) {
            throw createHttpError(404, "User item not found");
        }

        userItem.username = newusername;
        userItem.email = newemail;
        userItem.password = newpassword;
       

        const updatedUser = await userItem.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid userId");
        }

        const userItem = await UserModel.findById(userId).exec();

        if (!userItem) {
            throw createHttpError(404, "user item not found");
        }

        await userItem.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


interface LoginBody {
    username?: string;
    password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Username and password are required.");
        }

        const user = await UserModel.findOne({ username }).select("+password +email").exec();
        if (!user) {
            throw createHttpError(401, "Invalid credentials.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials.");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};


interface CreateUserBody {
    username?: string;
    email?: string;
    password?: string;
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const { username, email, password } = req.body;
    const type = "Manager";

    try {
        if (!username || !email || !password) {
            throw createHttpError(400, "Username, email, and password are required.");
        }

        const existingUser = await UserModel.findOne({ email }).exec();
        if (existingUser) {
            res.status(400).json({ error: "User already exists." });
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            type,
        });

        await newUser.save();
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
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid userId.");
        }

        if (!username || !email || !password) {
            throw createHttpError(400, "Username, email, and password are required.");
        }

        const userItem = await UserModel.findById(userId).exec();
        if (!userItem) {
            throw createHttpError(404, "User not found.");
        }

        userItem.username = username;
        userItem.email = email;

       
        if (password) {
            userItem.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userItem.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};


export const deleteUser: RequestHandler = async (req, res, next) => {
    const { userId } = req.params;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid userId.");
        }

        const userItem = await UserModel.findById(userId).exec();
        if (!userItem) {
            throw createHttpError(404, "User not found.");
        }

        await userItem.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";  
import UserModel from './models/user';

const port = env.PORT; 

async function createAdminUser() {
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin";
        const adminUsername = "admin";
        const adminType = "Admin";

        const existingAdmin = await UserModel.findOne({ type:adminType }).exec();
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const adminUser = new UserModel({
            username: adminUsername,
            email: adminEmail,
            password: hashedPassword,
            type: adminType,
        });

        await adminUser.save();
        console.log("Admin user created successfully.");
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
}

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(async () => {  
        console.log("Mongoose connected");

        await createAdminUser();

        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);


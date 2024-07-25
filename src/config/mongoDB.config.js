import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gusmartin91:123@ecommerce.o43oskf.mongodb.net/ecommerce')
            .then(() => console.log("Successfully connected to the database using Mongoose!!"))
            .catch((err) => console.log(err))
    } catch (error) {
        console.error("Could not connect to the database using Mongoose: " + error);
        process.exit();
    }
}
import mongoose from 'mongoose';
import enviroments from '../../config/enviroments.js';

const MONGODB_URL = enviroments.MONGODB_URL;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);

        console.log('MongoDB database connected!');
    } catch (error) {
        console.log('MongoDB database connected!');

        process.exit(1);
    }
};

export default connectToMongoDB;
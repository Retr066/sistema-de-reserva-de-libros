import mongoose from "mongoose";
import configENV from './configEnv';


const connectMongoose = () => {
    const MONGO_URI = `mongodb+srv://${configENV.MONGO_USER}:${configENV.MONGO_PASSWORD}@cluster0.xolvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, {
        autoIndex: true,
        dbName: `${configENV.MONGO_DB}`,   
          
    })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
}
export default connectMongoose



// mongodb+srv://<db_username>:<db_password>@cluster0.xolvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

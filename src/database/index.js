import mongoose from "mongoose";

const connectToDB = async () =>{
        const conn_string = process.env.CONNECTION_STRING;
        mongoose.connect(conn_string).then(()=>{
            console.log('DATABASE CONNECTED SUCCESSFULLY')
        }).catch((err)=>{
                console.log(`Connection Error: ${err}`)
        })
};

export default connectToDB; 
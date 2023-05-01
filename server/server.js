import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import connectDb from './connection/connect.js';
import userRoutes from './routes/userRoutes.js'

const app=express();
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())


app.get('/',(req,res)=>{
    res.send('APP IS RUNNING.')
})
// Authentication Routes
app.use('/api/users',userRoutes)
app.use('/api/users',userRoutes)


const startServer=async()=>{

    try {
        connectDb("mongodb+srv://Danish:danish3042002@cluster0.znnx9cl.mongodb.net/?retryWrites=true&w=majority")
        app.listen(8080,()=>console.log("Starting server on port 8080"));

    } catch (error) {
        console.log(error)
    }
}

startServer();

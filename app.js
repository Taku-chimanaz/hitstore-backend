import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'
import { envVariables } from './config.js';
import productRoutes from './api/product-api.js';
import orderRoutes from './api/order-api.js';
import eventRoutes from './api/event-api.js';
import tutorRoutes from './api/tutor-api.js';
import assignmentRoutes from './api/assignment-api.js';
import userRoutes from './api/user-api.js';
import accomodationRoutes from './api/accomodation-api.js';
import generalRoutes from './routes/generalRoutes.js';
import gossipRoutes from './api/gossip-api.js';
import commentRoutes from './api/comments-api.js';

const app  = express();
const corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization']
}


app.use(cors(corsOptions));
//app.options("*", cors())

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


const  PORT = process.env.PORT || 5000


mongoose.connect(envVariables.database, (err)=>{

    if(err){
        console.log("Could not connect to db");
    } else {
        console.log("Connected to the db");
        app.listen(PORT, () => console.log(`The App is listening`))
    }
})



// Routes

app.get('/', (req,res)=>{
    res.json({message: "Hit store api"})
})

// routes middleware
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accomodations', accomodationRoutes);
app.use('/api/gossips', gossipRoutes);
app.use('/general', generalRoutes);
app.use('/api/comments', commentRoutes);



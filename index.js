import 'dotenv/config'
import express from "express"
import authRouter from './routes/authRoutes.js';
import { connect } from './config/db.js';
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();
app.use(express.json());
app.use("/auth", authRouter)
connect().then(() => {
   
    app.listen(port, () => { 
        console.log(`👋 Server running on port ${port}`);
    });
})






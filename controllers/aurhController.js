import userModel from "../models/user.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken"
export const signUp = async (req, res) => {


    try {

        const { first_name, last_name, email, password } = req.body;


        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }



        const oldUser = await userModel.findOne({ email : email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }


        const encryptedPassword = await bcrypt.hash(password, 10);


        const user = await userModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            
        });


        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;
        


        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

};


export const login = async (req, res) => {


    try {

        const { email, password } = req.body;
       


        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await userModel.findOne({ email : email });

      
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );


            user.token = token;


            res.status(200).send(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

};

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashPassword });
    await newUser.save();

    res.json({ message: "User register successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: "User doesn't exists" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Username / password incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userId: user._id });
});

export { router as UserRouter };
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../models/db';

const router = express.Router();

// login to web
router.post("/login", async (req: any, res: any) => {
    
    const { username, password } = req.body;
    console.log(req.body.password);
    const storedHashedPassword = await db.query("SELECT password FROM users WHERE username=$1", [username]);
    console.log(storedHashedPassword.rows[0].password);

    const isPasswordMatched = await bcrypt.compare(req.body.password,storedHashedPassword.rows[0].password);
    if (isPasswordMatched) {
        const result = await db.query("SELECT * FROM users WHERE username=$1 AND password=$2", [username, storedHashedPassword.rows[0].password]);
        const user = result.rows[0];
    
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    } else {
        res
        .status(500)
        .send({ error: "Credential error" });
    }
});

export default router;
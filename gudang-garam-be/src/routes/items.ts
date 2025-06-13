import express from "express";
import { db } from "../models/db";
import { authorizeRoles } from "../middlware/auth";

const router = express.Router();

// GET all items
router.get("/", async (_, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching items:", error);
        res
        .status(500)
        .send({ error: "An error occurred while fetching items." });
    }
});

// CREATE new item
router.post("/", authorizeRoles("admin", "staff"), async (req: any, res: any) => {
    try {
        const { name, quantity, description } = req.body;
        await db.query('INSERT INTO items(name, quantity, description) VALUES ($1, $2, $3)', [name, quantity, description]);
        res.status(201).json({ message: 'Item created' });
    } catch (error) {
        console.error("Error creating new item:", error);
        res
        .status(500)
        .send({ error: "An error occurred while creating new item." });
    }
});

// UPDATE item
router.put("/:id", authorizeRoles("admin"), async (req: any, res : any) => {
    try {
        const { name, quantity, description } = req.body;
        await db.query("UPDATE items SET name=$1, quantity=$2, description=$3, updated_at=DEFAULT WHERE id=$4", [name, quantity, description, req.params.id]);
        res.json({ message: 'Item updated' });
    } catch (error) {
        console.error("Error updating item:", error);
        res
        .status(500)
        .send({ error: "An error occurred while updating item." });
    }
});

// DELETE item
router.delete("/:id", authorizeRoles("admin"), async (req: any, res: any) => {
    try {
        await db.query("DELETE FROM items WHERE id=$1", [req.params.id]);
        res.json({ message: "Item deleted" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res
        .status(500)
        .send({ error: "An error occurred while deleting item." });
    }
});

export default router;
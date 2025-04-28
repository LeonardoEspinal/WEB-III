const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME}`);
        res.json(results);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
})

router.post("/create", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('All fields are required');
    }

    try {
        const [checkResults] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE email = ?`, [email]);
        if (checkResults[0].count > 0) {
            return res.status(409).send('User already exists');
        }

        const [insertResults] = await req.pool.query(`INSERT INTO ${process.env.DB_TABLENAME} (name, email) VALUES (?, ?)`, [name, email]);
        res.status(201).json({ id: insertResults.insertId, name, email });
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send("Internal server error");
    }
});

router.put("/edit/:id", async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;

    if (!id || !name || !email) {
        return res.status(400).send('All fields are required');
    }

    try {
        const [checkIfUserExists] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        if (checkIfUserExists[0].count === 0) {
            return res.status(404).send("User does not exist.");
        }

        await req.pool.query(`UPDATE ${process.env.DB_TABLENAME} SET name = ?, email = ? WHERE id = ?`, [name, email, id]);
        res.status(200).json({ id, name, email });
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send("Internal server error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ID is required');
    }

    try {
        const [checkIfUserExists] = await req.pool.query(`SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        if (checkIfUserExists[0].count === 0) {
            return res.status(404).send("User does not exist.");
        }

        await req.pool.query(`DELETE FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        res.status(200).send(`ID ${id} deleted successfully`);
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;

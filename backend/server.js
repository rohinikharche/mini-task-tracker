require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* Get all issues */
app.get("/issues", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM issues ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
  }
});

/* Add issue */
app.post("/issues", async (req, res) => {

  try {

    const { title, description } = req.body;

    const newIssue = await pool.query(
      "INSERT INTO issues(title, description) VALUES($1, $2) RETURNING *",
      [title, description]
    );

    res.json(newIssue.rows[0]);

  } catch (error) {
    console.log(error);
  }
});

/* Update issue status */
app.put("/issues/:id", async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE issues SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.json("Issue Updated");

  } catch (error) {
    console.log(error);
  }
});

/* Delete issue */
app.delete("/issues/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM issues WHERE id = $1",
      [id]
    );

    res.json("Issue Deleted");

  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
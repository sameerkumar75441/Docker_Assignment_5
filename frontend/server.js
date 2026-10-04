const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Docker Assignment 5</title>
        </head>
        <body>
            <h1>Student Information Form</h1>

            <form action="/submit" method="POST">

                <label>Name:</label>
                <input type="text" name="name" required>
                <br><br>

                <label>Email:</label>
                <input type="email" name="email" required>
                <br><br>

                <label>Age:</label>
                <input type="number" name="age" required>
                <br><br>

                <button type="submit">Submit</button>

            </form>
        </body>
        </html>
    `);
});

app.post("/submit", async (req, res) => {
    try {
       const response = await fetch("http://localhost:5000/process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.send(`
            <h1>Form Submitted Successfully</h1>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Age:</strong> ${data.age}</p>
        `);

    } catch (error) {
        console.error("Error:", error);

        res.status(500).send(`
            <h1>Error</h1>
            <p>Could not connect to Flask backend.</p>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});
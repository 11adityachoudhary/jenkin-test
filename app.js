const express = require("express");
const app = express();
const port =  3000;

// app.use();

app.get("/", (req, res) => {
    res.status(200).send("Hello World, this is second run!!");
});

app.get("/health", (req, res) => {
    res.status(200).send("App is running!"); 
});

app.get('/userName', (req, res) => {
    let name = req.query.name;
    // const alphabeticRegex = /[^a-zA-Z]/g;
    // const sanitizedInput = name.replace(alphabeticRegex, '');
    res.send(name);
});

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
});

module.exports = app

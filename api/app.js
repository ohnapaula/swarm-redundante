const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("API online: sistema redundante com Docker Swarm!");
});

app.get("/info", (req, res) => {
    res.json({
        status: "ok",
        host: process.env.HOSTNAME, // Mostra qual container atendeu a requisição
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
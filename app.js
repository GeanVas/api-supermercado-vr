const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Manco')
})

app.listen(PORT, () => console.log("Server on port:", PORT));

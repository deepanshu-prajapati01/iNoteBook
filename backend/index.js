const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
connectToMongo();

const app = express()
const port = 5000;
app.use(cors())
app.use(express.json())

// Available Routes
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/notes", require("./routes/notes.js"))

app.get('/', (req, res) => {
    res.send('This app is working fine now!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
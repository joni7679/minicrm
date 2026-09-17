const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const connectToDb = require("./src/config/db/db");
const authRoute = require("./src/routes/auth.route");
const leadsRoute = require("./src/routes/lead.route");
const cors = require("cors")
dotenv.config()
const port = 3000 || process.env.PORT;
connectToDb();
app.use(morgan("dev"))
app.use(cookieParser())
// middelware
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.get('/', (req, res) => {
    res.send('Bakend server is running')
})

// Auth Route here
app.use("/api/auth", authRoute);
// leads route
app.use("/api/leads", leadsRoute)
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
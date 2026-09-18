const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const connectToDb = require("./src/config/db/db");
const authRoute = require("./src/routes/auth.route");
const leadsRoute = require("./src/routes/lead.route");
const cors = require("cors")
const helmet = require("helmet");
dotenv.config()
// FIX (prod): was `3000 || process.env.PORT` which is ALWAYS 3000.
// Hosts like Render/Railway assign a dynamic PORT env var.
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
// Required so `secure` cookies work behind Render/Railway/Vercel proxies
app.set("trust proxy", 1);
connectToDb();
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan(isProduction ? "combined" : "dev"))
app.use(cookieParser())
// middelware
app.use(express.json())
// FIX (prod): support comma-separated CLIENT_URL list, trim trailing slashes,
// and allow requests with no Origin (curl/health checks).
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const clean = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(clean)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.get('/', (req, res) => {
    res.send('Bakend server is running')
})
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: "OK", env: process.env.NODE_ENV || "development" });
})

// Auth Route here
app.use("/api/auth", authRoute);
// leads route
app.use("/api/leads", leadsRoute)
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
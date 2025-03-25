const express = require("express");
const app = express();
const winston = require("winston");

// Logger setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "sub-service" },
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

const subtract = (n1, n2) => n1 - n2;

app.get("/sub", (req, res) => {
    try {
        console.log("Query Parameters:", req.query); // Debugging step

        if (!req.query.n1 || !req.query.n2) {
            logger.error("Missing query parameters");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 is incorrectly defined" });
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            return res.status(400).json({ statusCode: 400, msg: "Error: n2 is incorrectly defined" });
        }

        logger.info(`Parameters ${n1} and ${n2} received for subtraction`);
        const result = subtract(n1, n2);

        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Start the server
const port = 3040;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

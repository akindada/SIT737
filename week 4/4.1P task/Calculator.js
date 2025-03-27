const express = require("express");
const app = express();
const winston = require("winston");

// Logger setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculator-service" },
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// Arithmetic operations
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n2 !== 0 ? n1 / n2 : NaN; // Prevent division by zero

// Function to validate and parse input
const validateAndParseInput = (req, res) => {
    const { n1, n2 } = req.query;

    if (!n1 || !n2) {
        logger.error("Missing query parameters");
        return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
    }

    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error("Invalid numbers provided");
        return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
    }

    return { num1, num2 };
};

// API endpoints
app.get("/add", (req, res) => {
    try {
        const values = validateAndParseInput(req, res);
        if (!values) return;

        const result = add(values.num1, values.num2);
        logger.info(`Addition: ${values.num1} + ${values.num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/sub", (req, res) => {
    try {
        const values = validateAndParseInput(req, res);
        if (!values) return;

        const result = subtract(values.num1, values.num2);
        logger.info(`Subtraction: ${values.num1} - ${values.num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/mul", (req, res) => {
    try {
        const values = validateAndParseInput(req, res);
        if (!values) return;

        const result = multiply(values.num1, values.num2);
        logger.info(`Multiplication: ${values.num1} * ${values.num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/div", (req, res) => {
    try {
        const values = validateAndParseInput(req, res);
        if (!values) return;

        if (values.num2 === 0) {
            logger.error("Division by zero attempted");
            return res.status(400).json({ statusCode: 400, msg: "Error: Division by zero is not allowed" });
        }

        const result = divide(values.num1, values.num2);
        logger.info(`Division: ${values.num1} / ${values.num2} = ${result}`);
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

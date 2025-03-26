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
const divide = (n1, n2) => n1 / n2;
const power = (n1, n2) => Math.pow(n1, n2);
const sqrt = (n1) => Math.sqrt(n1);
const modulo = (n1, n2) => n1 % n2;

// API endpoints
app.get("/add", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for addition");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for addition");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        const result = add(num1, num2);
        logger.info(`Addition operation successful: ${num1} + ${num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Use 'sub' as alias for subtraction
app.get("/sub", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for subtraction");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for subtraction");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        const result = subtract(num1, num2);
        logger.info(`Subtraction operation successful: ${num1} - ${num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Use 'mul' as alias for multiplication
app.get("/mul", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for multiplication");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for multiplication");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        const result = multiply(num1, num2);
        logger.info(`Multiplication operation successful: ${num1} * ${num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Use 'div' as alias for division
app.get("/div", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for division");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for division");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        if (num2 === 0) {
            logger.error("Attempt to divide by zero");
            return res.status(400).json({ statusCode: 400, msg: "Error: Division by zero is not allowed" });
        }

        const result = divide(num1, num2);
        logger.info(`Division operation successful: ${num1} / ${num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/power", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for exponentiation");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for exponentiation");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        const result = power(num1, num2);
        logger.info(`Exponentiation operation successful: ${num1} ^ ${num2} = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/sqrt", (req, res) => {
    try {
        const { n1 } = req.query;
        if (!n1) {
            logger.error("Missing query parameter for square root");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameter n1" });
        }

        const num1 = parseFloat(n1);

        if (isNaN(num1)) {
            logger.error("Invalid number for square root");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 is not a valid number" });
        }

        if (num1 < 0) {
            logger.error("Attempt to compute square root of a negative number");
            return res.status(400).json({ statusCode: 400, msg: "Error: Square root of negative number is not allowed" });
        }

        const result = sqrt(num1);
        logger.info(`Square root operation successful: sqrt(${num1}) = ${result}`);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

app.get("/modulo", (req, res) => {
    try {
        const { n1, n2 } = req.query;
        if (!n1 || !n2) {
            logger.error("Missing query parameters for modulo");
            return res.status(400).json({ statusCode: 400, msg: "Error: Missing query parameters n1 or n2" });
        }

        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);

        if (isNaN(num1) || isNaN(num2)) {
            logger.error("Invalid numbers for modulo");
            return res.status(400).json({ statusCode: 400, msg: "Error: n1 and/or n2 are not valid numbers" });
        }

        const result = modulo(num1, num2);
        logger.info(`Modulo operation successful: ${num1} % ${num2} = ${result}`);
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

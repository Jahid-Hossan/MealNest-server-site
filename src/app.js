const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 5000;

const connectDB = require('./db/connectDB');
const mealsRoutes = require('./routes/findAllMeals/index');
const findAMeal = require('./routes/findAMeal/index');
const updateLike = require('./routes/updateLike/index');
const membership = require('./routes/membership/index')



app.use(cors({
    origin: [
        "http://localhost:5174",
        "http://localhost:5173"
    ]
}));
app.use(express.json());


app.use(mealsRoutes);
app.use(findAMeal)
app.use(updateLike)
app.use(membership)








app.get('/', (req, res) => {
    res.send('MealNest is running...')
})

app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
})

const globalErrorHandler = (err, _req, res, _next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};

module.exports = globalErrorHandler;

const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`MealNest Server is running on port ${port}`);
    });

}

main()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 5000;

const connectDB = require('./db/connectDB');
const mealsRoutes = require('./routes/findAllMeals/index')

app.use(cors());
app.use(express.json());


app.use(mealsRoutes)



// console.log(meals)

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
// app.get('/meals', async (req, res) => {
//     try {
//         const result = await mealCollection.find();
//         res.send(result);
//     } catch (error) {
//         console.log(error)
//     }
// })

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
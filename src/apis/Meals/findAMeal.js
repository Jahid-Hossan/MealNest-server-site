const meals = require("../../models/findAllMeals/meals");
const reviews = require('../../models/findReviews/findReviews');


const findAMeal = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: id }
        const reviewQuery = { mealId: id }
        const allReviews = await reviews.find(reviewQuery)
        const result = await meals.find(query);
        console.log(allReviews)
        res.send([result, allReviews]);
    } catch (error) {
        console.log(error)
    }
}

module.exports = findAMeal
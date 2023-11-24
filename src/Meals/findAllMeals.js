const meals = require("../models/findAllMeals/meals");


const findAllMeals = async (req, res) => {
    try {
        const result = await meals.find();
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = findAllMeals
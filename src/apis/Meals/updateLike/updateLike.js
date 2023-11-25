const Meals = require("../../../models/findAllMeals/meals.js");


const updateLike = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: id };
        const likeInc = {
            $inc: {
                likes: 1
            }
        };

        const result = await Meals.updateOne(query, likeInc);

        // console.log(result)

        res.send(result);
    } catch (error) {
        console.log(error)
    }
}


module.exports = updateLike
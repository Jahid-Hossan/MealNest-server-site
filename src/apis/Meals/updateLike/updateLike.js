const Meals = require("../../../models/findAllMeals/meals.js");
const LikerUser = require("../../../models/likes/likes.js")


const updateLike = async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.body.email;
        console.log(userEmail)
        const query = { _id: id };
        const likeInc = {
            $inc: {
                likes: 1
            }
        };

        const userLiker = {
            email: userEmail,
            mealId: id
        }

        const filter = { email: userEmail, mealId: id };

        const liked = await LikerUser.findOne(filter)

        console.log(liked)
        if (liked) {
            return res.send({ massage: 'You have already liked this meal', insertedId: null, modifiedCount: null })
        }

        const added = await LikerUser.create(userLiker)

        const result = await Meals.updateOne(query, likeInc);

        console.log(added)

        res.send(result);
    } catch (error) {
        console.log(error)
    }
}


module.exports = updateLike
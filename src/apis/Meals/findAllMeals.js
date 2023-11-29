const meals = require("../../models/findAllMeals/meals");


const findAllMeals = async (req, res) => {
    try {

        const filter = req.query;

        const searchString = filter?.search;


        let query = {}

        if (req?.query?.type) {
            query = {
                type: req?.query?.type
            };
        }

        const options = {
            sort: {
                price: filter.sort === 'asc' ? 1 : -1
            }
        };

        const result = await meals.find(query).sort(options.sort);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = findAllMeals
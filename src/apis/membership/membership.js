
const memberships = require("../../models/membership/membership");


const allMemberships = async (req, res) => {
    try {

        const query = { price: { $ne: 'free' } }

        const options = {
            sort: {
                price: 1
            }
        };

        const result = await memberships.find(query,).sort(options.sort);
        res.send(result);

    } catch (error) {
        console.log(error)
    }
}

module.exports = allMemberships
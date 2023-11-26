// const users = require("../../../models/Users/addUser/addUser");
// const memberships = require("../../../models/membership/membership");


// const addUser = async (req, res) => {
//     try {
//         const user = req.body;
//         const query = { email: user.email }
//         const existingUser = await users.findOne(query);
//         console.log(user)
//         if (existingUser) {
//             return res.send({ massage: 'user already exist', insertedId: null })
//         }
//         const result = await users.create(user);
//         console.log(result)
//         // res.send(result);
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = addUser;

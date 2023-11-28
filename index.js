const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

require('dotenv').config()

const connectDB = require('./src/db/connectDB');
const mealsRoutes = require('./src/routes/findAllMeals/index');
const findAMeal = require('./src/routes/findAMeal/index');
const updateLike = require('./src/routes/updateLike/index');
const membership = require('./src/routes/membership/index');
const payment = require('./src/routes/payments/index');
const createToken = require('./src/routes/createToken/index');






app.use(cors({
    origin: [
        "http://localhost:5174",
        "http://localhost:5173"
    ]
}));
app.use(express.json());


app.use(mealsRoutes);
app.use(findAMeal);
app.use(updateLike);
app.use(membership);
app.use(payment);
app.use(createToken);

// ***************************** mongodb ********************************************//



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

DBname = process.env.DB_NAME
const URI = process.env.DB_URI;
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




const userCollection = client.db(DBname).collection("users");
const reviewsCollection = client.db(DBname).collection("reviews");
const mealRequestCollection = client.db(DBname).collection("mealRequest");
const mealsCollection = client.db(DBname).collection("meals");
const membershipsCollection = client.db(DBname).collection("memberships");

//middleware

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ massage: 'Forbidden Access' })
    }
    const token = req.headers.authorization.split(' ')[1]
    // console.log(token)

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(401).send({ massage: 'Forbidden Access' })
        }
        req.decoded = decoded;
        next()
    })
}


const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await userCollection.findOne(query);
    const isAdmin = user?.role === "Admin";
    if (!isAdmin) {
        return res.status(403).send({ massage: "unauthorized access" })
    }
    next()
}

// add user

app.get('/users', verifyToken, async (req, res) => {
    try {
        // console.log('hitted')
        const email = req.decoded.email;
        // console.log(email)
        const emailQuery = { email: email }
        const existingUser = await userCollection.findOne(emailQuery);
        const membershipIds = existingUser.membershipId

        const objectIds = membershipIds.map(id => new ObjectId(id));

        const membershipQuery = { _id: { $in: objectIds } };

        const result = await membershipsCollection.find(membershipQuery).toArray()
        // console.log(result)
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})


app.get('/all-users', async (req, res) => {
    try {
        const userName = req.query;
        const userEmail = req.query.userEmail;

        console.log(typeof (userName))

        const query = {};

        if (userName) {
            query.name = { $regex: new RegExp(userName, 'i') };
        }

        if (userEmail) {
            query.email = { $regex: new RegExp(userEmail, 'i') };
        }


        const memberships = await membershipsCollection.find().toArray();
        const result = await userCollection.find(query).toArray();
        res.send({ result, memberships });
        console.log('result', result, memberships)
    } catch (error) {
        console.log(error)
    }
})


app.post('/users', async (req, res) => {
    try {
        // console.log('hitted')
        const user = req.body;
        const query = { email: user.email }
        const existingUser = await userCollection.findOne(query);
        if (existingUser) {
            return res.send({ massage: 'user already exist', insertedId: null })
        }
        const result = await userCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})

app.patch('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
            $set: {
                role: 'Admin'
            }
        }
        const result = await userCollection.updateOne(query, updatedDoc)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})



// add review

app.get('/reviews', verifyToken, async (req, res) => {
    try {
        const userEmail = req.query.email;
        const query = { email: userEmail }
        // console.log(query)
        const myReviews = await reviewsCollection.find(query).toArray();
        // res.send(result)

        const mealReviewIds = [];
        const getMealReviewsIds = myReviews.map(review => {
            return mealReviewIds.push(review.mealId)
        })

        const objectIds = mealReviewIds.map(id => new ObjectId(id));
        const mealRequestQuery = { _id: { $in: objectIds } };
        const result = await mealsCollection.find(mealRequestQuery).toArray();

        // const reviewsQuery = { mealId: { $in: mealRequestIds } };
        // const reviewRes = await reviewsCollection.find(reviewsQuery).toArray()

        res.send({ result, myReviews })
        // console.log(result, myReviews)
    } catch (error) {
        console.log(error)
    }
})

app.post('/reviews', async (req, res) => {
    try {
        const reviewData = req.body;
        const result = await reviewsCollection.insertOne(reviewData);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})

app.patch('/reviews/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body;
        console.log(id)
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
            $set: {
                rating: data.rating,
                comment: data.comment
            }
        }
        const result = await reviewsCollection.updateOne(query, updatedDoc)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})


app.delete('/reviews/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await reviewsCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})



// meal request
app.get('/requestMeals', verifyToken, async (req, res) => {
    try {
        const userEmail = req.query.email;
        const query = { email: userEmail }
        // console.log(query)
        const mealRequest = await mealRequestCollection.find(query).toArray();
        // res.send(result)

        const mealRequestIds = [];
        const getMealRequestIds = mealRequest.map(meal => {
            return mealRequestIds.push(meal.mealId)
        })

        const objectIds = mealRequestIds.map(id => new ObjectId(id));
        const mealRequestQuery = { _id: { $in: objectIds } };
        const result = await mealsCollection.find(mealRequestQuery).toArray();

        const reviewsQuery = { mealId: { $in: mealRequestIds } };
        const reviewRes = await reviewsCollection.find(reviewsQuery).toArray()

        res.send({ result, reviewRes, mealRequest })
        // console.log(result, reviewRes)
    } catch (error) {
        console.log(error)
    }
})


app.post('/requestMeals', async (req, res) => {
    try {
        const requestData = req.body;
        const email = requestData.email;
        const mealId = requestData.mealId;
        const query = {
            email: email,
            mealId: mealId
        }

        const exist = await mealRequestCollection.findOne(query)
        if (exist?.status === 'pending') {
            return res.send({ massage: 'You have already request for this meal. wait until delivery.', insertedId: null })
        }
        // if (exist) {
        //     return res.send({ massage: 'You have already requested for this meal', insertedId: null })
        // }

        const result = await mealRequestCollection.insertOne(requestData);
        res.send(result);
    } catch (error) {
        console.log(error)

    }
})




app.get('/upcoming', async (req, res) => {
    try {
        const query = { upcoming: 'true' }

        const result = await mealsCollection.find(query).toArray()
        // console.log(result)

        res.send(result);
    } catch (error) {
        console.log(error)

    }
})



//**************************************************************************************************//

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

app.use(globalErrorHandler);

const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`MealNest Server is running on port ${port}`);
    });

}

main()



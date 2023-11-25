const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



const payments = async (req, res) => {
    try {
        const price = req.body;
        const amount = parseInt(price * 100)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })


    } catch (error) {
        console.log(error)
    }
}

export default payments;
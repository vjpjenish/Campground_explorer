if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const Category = require('../models/category');
const cities = require('./cities')
const { places, descriptors } = require('./seedhelpers')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxtoken = 'pk.eyJ1IjoieWFzaGZhbGtlNzciLCJhIjoiY2t1MjQ2Z2cwMmxjazJvbXI2OGk5b2V0dSJ9.BGnMIJbpa2OzthfRTtTP6w'
const geocoder = mbxGeocoding({ accessToken: mapBoxtoken })
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const user = ["669f36f676a48e34d0dc3ae1", "66a0969e433aae0f6852b428", "66a2074e48229d3d509e1291"]

const sample = array => array[Math.floor(Math.random() * array.length)];

const catSample = array => Math.floor(Math.random() * array.length)

const images = [
    {
        url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366952/i1_j3h6mk.jpg',
        filename: 'yelpcamp/i1_j3h6mk',
    },
    {
        url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366952/i2_ivij7y.jpg',
        filename: 'yelpcamp/i2_ivij7y',
    },
    {
        url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366952/i3_h8okqe.jpg',
        filename: 'yelpcamp/i3_h8okqe',
    }
]


const seeDB = async () => {
    // await Campground.deleteMany({});
    const category = await Category.find({})
    for (let index = 0; index < 50; index++) {
        const random400 = Math.floor(Math.random() * 400);
        const randCat = Math.floor(Math.random() * 6)
        const random3 = Math.floor(Math.random() * 3 )
        const price = Math.floor(Math.random() * 20) + 10;
        const location = `${cities[random400].city}, ${cities[random400].admin_name}`
        const geodata = await geocoder.forwardGeocode({
            query: location,
            limit: 1
        }).send()
        const camp = new Campground({
            author: user[random3],
            location: location,
            geometry: geodata.body.features[0].geometry,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: images[random3],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias modi libero exercitationem excepturi nobis recusandae assumenda consequatur fugit omnis, nihil voluptates dolore, provident sequi minus sint iusto. Esse, asperiores velit.',
            price: price,
            category: category[randCat]._id
            
        })
        // console.log(categories[randCat]._id);
        await camp.save();
    }
}

seeDB()
    .then((result) => {
        db.close()
    }).catch((err) => {
        console.log(err);
    });
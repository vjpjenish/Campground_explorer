if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const mongoose = require('mongoose');
const Category = require('../models/category')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const categories = [
    {
        title: 'Tent Camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366902/1_reuglh.jpg',
            filename: 'yelpcamp/1_reuglh',
        },
        description: 'This is the most basic and famous type of camping all over the world. This involves heading to a park where you can pitch your tent where you will sleep for some nights. You can go tent camping on a campsite, a beach, in the woods, or anywhere you like. Tent camping is a great option to try out for people that are new to camping and wants to start without having to spend a lot of money. Tent camping is a perfect option for families with children as it creates the chance to bond and learn how to work together.'
    },
    {
        title: 'RV and Van Camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366935/2_wgltq7.jpg',
            filename: 'yelpcamp/2_wgltq7',
        },
        description: 'Going camping in a recreation vehicle gives you the opportunity to enjoy fun outdoor destinations. With a recreational vehicle, you will have almost all that you have at home and it includes comfortable bed and entertainment. You will also get the chance to park all the equipment and toys that you want wherever you go. All you will need is to find a suitable RV park where you can dock your vehicle.'
    },
    {
        title: 'Canoe Camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366940/3_uqiooj.jpg',
            filename: 'yelpcamp/3_uqiooj',
        },
        description: 'Canoe camping is quite similar to backpacking and you are going to get more freedom and lots of advantages of traveling by water. With canoe camping, you will not have to worry much about weight as you can carry more equipment. You will also be able to travel further and reach places that are not accessible to hikers on foot or vehicles. Canoe camping is best suited for groups or two or more tourists in case there is an emergency. You can also go as a solo traveler but you will need to make more preparation. It is also important to put rainfall into consideration during canoe camping because the water flow can change easily.'
    },
    {
        title: 'Survivalist camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366903/4_wlgdbk.jpg',
            filename: 'yelpcamp/4_wlgdbk',
        },
        description: 'In this type of camping, you will need to learn all the skills that you will need to survive in a variety of outdoor situations. In survivalist camping, you are going to hunt for food in the wild and also discover emergency medical treatments by yourself. By acquiring these skills, you will be able to survive in case of emergency or during harsh weather conditions.'
    },
    {
        title: 'Backpacking Camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366880/5_g0yrjp.jpg',
            filename: 'yelpcamp/5_g0yrjp',
        },
        description: 'Backpacking Camping mainly involves spending the day jus carrying your gear and equipment on your back while you travel through nature. A backpacking trip can range from night to several months. Backpacking trip gives you the chance to spend time away from the hustle and bustle of everyday life while you get closer to nature. If you are planning to go on a backpacking trip, you will need to plan your trip while you also inform someone about your plans in case of an emergency. They will help to alert authorities and initiate a search and rescue operation.'
    },
    {
        title: 'Glamping Camping',
        image: {
            url: 'https://res.cloudinary.com/dmguz6chl/image/upload/v1722366911/6_boxps2.jpg',
            filename: 'yelpcamp/6_boxps2',
        },
        description: 'Glamping is also known as glamorous camping and it involves camping with the luxuries of a home or hotel. You are going to find a wide range of glamping accommodations that are available all over the world from staying in a yurt on a mountaintop to enjoying panoramic sceneries in an eco-lodge. Glamping is more than a nice tent as you can find varieties of options that range from cabins, villas, tipis, lodges, and treehouses.'
    }
]

const insert = async () => {
    for(const category of categories){
    const cat = new Category({
        title: category.title,
        image: category.image,
        description: category.description
    })
    await cat.save()
    console.log(cat);
    }
}

insert()
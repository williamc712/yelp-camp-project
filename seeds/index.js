const mongoose = require('mongoose');
const cities  = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
main().catch(err => console.log('WOI ERROR',err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('DB Connected!');
}

const sample = (arr) =>{
    return arr[Math.floor(Math.random() * arr.length)]
}

const seedDb = async()=>{
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const randthou = Math.floor(Math.random()*1001)
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'62d7baffc22a8f0e23d67d22',
            location :`${cities[randthou].city}, ${cities[randthou].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur nihil omnis eos unde maiores obcaecati quae sapiente itaque doloribus, quasi perferendis quaerat corporis, commodi aliquam quia adipisci fugit a.',
            price,
            geometry:{
                type: "Point",
                coordinates: [cities[randthou].longitude, cities[randthou].latitude]
            },
            images: [
                {
                    "url": "https://res.cloudinary.com/ddidens5i/image/upload/v1660219530/YelpCamp/mtn3k8rgemxwbwaek6l3.jpg",
                    "filename": "YelpCamp/mtn3k8rgemxwbwaek6l3",
                },
                {
                    "url": "https://res.cloudinary.com/ddidens5i/image/upload/v1660219470/YelpCamp/s8mggr2aurvx4g75datj.jpg",
                    "filename": "YelpCamp/s8mggr2aurvx4g75datj",
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})
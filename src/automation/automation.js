const nodemailer = require('nodemailer');
const Item = require('../models/item');
const checkPrice = require('../webScraper/cheerio');
const password = process.env.EMAIL_PASSWORD;

const sendMail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pricetracker4u@gmail.com',
      pass: password,
    },
  });

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else if (info.response.ok) {
    }
  });
};

const checkAndUpdate = async() => {
  const items = await Item.find({});
  // console.log(items);
  Array.from(items).forEach(async(item) => {
    const updatedPrice = await checkPrice(item.url);
    if(updatedPrice !== item.currentPrice){
      if(updatedPrice <= item.requiredPrice){
        let mailOptions = {
          from: '"Price Tracker"<pricetracker4u@gmail.com>', // sender address
          to: item.gmail, // list of receivers
          subject: 'Price drop notification', // Subject line
          text: `Price of ${item.name} has been dropped to ${updatedPrice}, purchase it now at ${item.url}`,
        };
        item.currentPrice = updatedPrice;
        await sendMail(mailOptions);
      }
      await item.save();
    }
  })
}

setInterval(checkAndUpdate, 1800000);
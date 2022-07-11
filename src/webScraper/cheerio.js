const request = require('request-promise');
const cheerio = require('cheerio');

const checkPrice = async(url) => {
  const response = await request({
    url,
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,hi;q=0.8"
    },
    gzip: true
  })

  let $ = cheerio.load(response);

  let priceString = $("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d").text();

  priceString = priceString.replace('₹', '');
  if(priceString.includes(',')){
    priceString = priceString.replace(',', '');
  }
  const price = parseInt(priceString);
  console.log(price);

  return price;
}

module.exports = checkPrice;
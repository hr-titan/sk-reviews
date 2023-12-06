const convert = require('csvtojson');
const { createWriteStream } = require('fs');
const path = require('path');

const newFile = createWriteStream('./convertedCharacteristics.json');

async function initiateConvert() {
  try {
    const char = await convert().fromFile(path.join(__dirname, 'characteristics.csv'));
    const reviews = await convert().fromFile(path.join(__dirname, 'characteristic_reviews.csv'));
    const reviewDictionary = {};
    reviews.forEach((review, index) => {
      console.log('Converting data: ', index);
      if (reviewDictionary[review.review_id]) {
        reviewDictionary[review.review_id] = {
          ...reviewDictionary[review.review_id],
          [char[JSON.parse(review.characteristic_id) - 1].name] : review.value,
        }
      } else {
        reviewDictionary[review.review_id] = {
          [char[JSON.parse(review.characteristic_id) - 1].name] : review.value,
          product_id: char[JSON.parse(review.characteristic_id) - 1].product_id,
        }
      }
    });
    const list = Object.values(reviewDictionary);
    for (let i = 0; i < list.length; i++) {
      console.log('Writing characteristic: ', i);
      if (i === 0) {
        newFile.write('[' + JSON.stringify(list[i]) + ',\n');
      } else if (i === list.length - 1) {
        newFile.write(JSON.stringify(list[i]) + ']');
      } else {
        newFile.write(JSON.stringify(list[i]) + ',\n');
      }
    }
    newFile.end();
  } catch(err) {
    console.log(err);
  }
}
initiateConvert();
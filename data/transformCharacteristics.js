const convert = require('csvtojson');
const { createWriteStream } = require('fs');
const path = require('path');

const newFile = createWriteStream('./characteristicsParsed.json');

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
          [char[JSON.parse(review.characteristic_id) - 1].name] : +review.value,
        }
      } else {
        reviewDictionary[review.review_id] = {
          [char[JSON.parse(review.characteristic_id) - 1].name] : +review.value,
          product_id: +char[JSON.parse(review.characteristic_id) - 1].product_id,
          review_id: + review.review_id,
        }
      }
    });
    const list = Object.values(reviewDictionary);
    const chunkSize = 1000;
    for (let i = 0; i < list.length; i += chunkSize) {
      const section = JSON.stringify(list.slice(i, i + chunkSize)).slice(1, -1);
      console.log('Writing characteristic: ', i);
      if (i === 0) {
        newFile.write('[' + section + ',\n');
      } else if (i + chunkSize - 1 >= list.length - 1) {
        newFile.write(section + ']');
      } else {
        newFile.write(section + ',\n');
      }
    }
    console.log('Finished writing file');
    newFile.end();
  } catch(err) {
    console.log(err);
  }
}
initiateConvert();
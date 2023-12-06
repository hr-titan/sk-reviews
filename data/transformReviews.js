const convert = require('csvtojson');
const { createWriteStream, appendFileSync } = require('fs');
const path = require('path');

const newFile = createWriteStream('./convertedReviews.json');

async function initiateConvert() {
  try {
    const reviewList = await convert().fromFile(path.join(__dirname, 'reviews.csv'));
    const photoList = await convert().fromFile(path.join(__dirname, 'reviews_photos.csv'));

    const newList = reviewList.map((review, index) => {
      console.log('Transforming review: ', index);
      const newReview = {
        ...review,
        photos: []
      }
      delete newReview.id;
      return newReview;
    });
    photoList.forEach((photo, index) => {
      console.log('Adding photo: ', index)
      if (newList[JSON.parse(photo.review_id) - 1]) {
        newList[JSON.parse(photo.review_id) - 1].photos.push(photo.url);
      }
    });

    for (let i = 0; i < newList.length; i++) {
      console.log('Writing to file: ', i);
      if (i === 0) {
        appendFileSync(path.join(__dirname, 'convertedReviews.json'), '[' + JSON.stringify(newList[i]) + ', \n', { encoding: 'utf8' });
      } else if (i === newList.length - 1) {
        appendFileSync(path.join(__dirname, 'convertedReviews.json'), JSON.stringify(newList[i]) + ']', { encoding: 'utf8' });
      } else {
        appendFileSync(path.join(__dirname, 'convertedReviews.json'), JSON.stringify(newList[i]) + ', \n', { encoding: 'utf8' });
      };
    };

    console.log('File writing completed.');
    return;
  } catch(err) {
    console.log(err);
  }
}

initiateConvert();
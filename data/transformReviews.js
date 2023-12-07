const convert = require('csvtojson');
const { appendFileSync } = require('fs');
const path = require('path');

async function initiateConvert() {
  try {
    const reviewList = await convert().fromFile(path.join(__dirname, 'reviews.csv'));
    const photoList = await convert().fromFile(path.join(__dirname, 'reviews_photos.csv'));

    const newList = reviewList.map((review, index) => {
      console.log('Transforming review: ', index);
      const reported = review.reported === 'undefined' ? false : review.reported === undefined ? false : JSON.parse(review.reported);
      const recommend = review.recommend === 'undefined' ? false : review.recommend === undefined ? false : JSON.parse(review.recommend);
      return {
        review_id: +review.id,
        rating: +review.rating,
        summary: review.summary,
        body: review.body,
        reviewer_name: review.reviewer_name,
        reviewer_email: review.reviewer_email,
        response: review.response,
        helpfulness: +review.helpfulness,
        product_id: +review.product_id,
        recommend: recommend,
        reported: reported,
        date: +review.date,
        photos: []
      }
    });
    photoList.forEach((photo, index) => {
      console.log('Adding photo: ', index)
      if (newList[JSON.parse(photo.review_id) - 1]) {
        newList[JSON.parse(photo.review_id) - 1].photos.push(photo.url);
      }
    });

    const chunkSize = 50;
    for (let i = 0; i < newList.length; i += chunkSize) {
      const section = JSON.stringify(newList.slice(i, i + chunkSize)).slice(1, -1);
      console.log('Writing to file: ', i, 'to', i + chunkSize - 1);
      if (i === 0) {
        appendFileSync(path.join(__dirname, 'reviewsParsed.json'), '[' + section + ', \n', { encoding: 'utf8' });
      } else if (i + chunkSize - 1 >= newList.length - 1) {
        appendFileSync(path.join(__dirname, 'reviewsParsed.json'), section + ']', { encoding: 'utf8' });
      } else {
        appendFileSync(path.join(__dirname, 'reviewsParsed.json'), section + ', \n', { encoding: 'utf8' });
      };
    };
    console.log('File writing completed.');
    return;
  } catch(err) {
    console.log(err);
  }
}

initiateConvert();
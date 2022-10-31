const fs = require('fs');

const imageToBase64 = (image) => {
    const imageAsBase64 = fs.readFileSync(image, 'base64');
    return imageAsBase64;
}

module.exports = imageToBase64;
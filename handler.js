'use strict';

module.exports.mockText = (event, context, callback) => {
  let userText = event.queryStringParameters.text,
      textArr = userText.split(''),
      counter = 0,reg = /^[a-z]+$/i;

  textArr.forEach((letter, index) => {
    if (counter % 2)
      textArr[index] = letter.toUpperCase()

    if (reg.test(letter))
      counter += 1
  })

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: textArr.join('')
    }),
  };
  callback(null, response);
};

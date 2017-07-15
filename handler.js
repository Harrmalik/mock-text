'use strict';
function getQueryParams(str) {
    let qs = str.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params
}

module.exports.mockText = (event, context, callback) => {
  let userText = getQueryParams(event.body).text.toLowerCase(),
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
        response_type: "in_channel",
        text: textArr.join(''),
        attachments: [
            {
                image_url: "http://i0.kym-cdn.com/entries/icons/original/000/022/940/spongebobicon.jpg"
            }
        ]
    })
  };

  callback(null, response);
};

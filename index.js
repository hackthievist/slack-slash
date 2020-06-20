const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const axios = require('axios');
app.use(bodyParser({ extended: false }));

app.get('/', (req, res) => res.send('Haha what are you looking for?'));

app.post('/get-gif', async (req, res) => {
    try {
        console.log(req.body);
        const urls = [
            'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592702/samples/khadijah/Animated_GIF-downsized_large_2.gif',
            'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592765/samples/khadijah/Animated_GIF-downsized_large_1.gif',
        ];
        const randomIndex = Math.floor(Math.random() * urls.length);
        const responseUrl = req.body.response_url;
        // const response = await fetch(responseUrl, {
        //     method: 'post',
        //     body: JSON.stringify({ delete_original: "true" }),
        //     headers: { 'Content-Type': 'application/json' },
        // });
        const response = await axios({
            method: 'POST',
            url: responseUrl,
            headers: { 'content-type': 'application/json' },
            data: { delete_original: true },
        });
        console.log('res', req.body.response_url);
        console.log(response);
        return res.status(200).send({
            response_type: 'in_channel',
            text: `<${urls[randomIndex]}| good job>`,
            unfurl_media: true,
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => console.log(`App listening at ${process.env.HOST}:${port}`));
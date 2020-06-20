const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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
        const username = req.body.user_name;
        const text  = `<${urls[randomIndex]}| good job> by @<${username}>`;

        await fetch(responseUrl, {
            method: 'post',
            body: JSON.stringify({ text, response_type: 'in_channel' }),
            headers: { 'Content-Type': 'application/json' },
        });
        return res.status(200).end();
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => console.log(`App listening at ${process.env.HOST}:${port}`));
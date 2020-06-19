const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Haha what are you looking for?'));

app.get('/get-gif', (req, res) => {
    const urls = [
        'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592702/samples/khadijah/Animated_GIF-downsized_large_2.gif',
        'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592765/samples/khadijah/Animated_GIF-downsized_large_1.gif',
    ];
    const randomIndex = Math.floor(Math.random() * urls.length);
    return res.status(200).send(urls[randomIndex]);
});

app.listen(port, () => console.log(`App listening at ${process.env.HOST}:${port}`));
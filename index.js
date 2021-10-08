const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser());

// Home
app.get('/', (req, res) => res.send('Haha what are you looking for?'));

// Endpoint that sends media to Slack
app.post('/get-gif', async (req, res) => {
    try {
        const urls = getUrls();
        const randomIndex = Math.floor(Math.random() * urls.length);
        const url = urls[randomIndex];

        /* Slack slash commands have an invocation structure that includes:
            - response_url: a hook/url that a POST request can be sent to for sending, editing or deleting messages
            - user_id: a Slack code that represents the invoking user's Display Name
        */
        const { response_url: responseUrl, user_id: userID } = req.body;
        const text = generateBody(url, userID);
        postToChannel(responseUrl, text);
        return res.status(200).end();
    } catch (err) {
        console.log(err);
    }
});

const getUrls = () => ([
    // urls where media files are hosted.
    'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592702/samples/khadijah/Animated_GIF-downsized_large_2.gif',
    'https://res.cloudinary.com/dlz2qvds4/image/upload/v1592592765/samples/khadijah/Animated_GIF-downsized_large_1.gif',
    'https://res.cloudinary.com/dlz2qvds4/image/upload/v1633704245/samples/khadijah/KDJ.gif',
]);

const postToChannel = async (responseUrl, text) => {
    return fetch(responseUrl, {
        method: 'POST',
        /* Slack slash commands and apps generally expect a body with the following attributes:
            - "text" (required) which is the data that would be sent to Slack
            - "response_type": ephemeral/in_channel.

               By default (i.e if not explicitly set), it is "ephemeral";
               this means, the response from the command is visible to just the invoking user.

               It can also be set to "in_channel" which means the response from the command is visible in whatever channel it is invoked.      
        */
        body: JSON.stringify({
            text,
            response_type: 'in_channel',
            icon_url: 'https://res.cloudinary.com/dlz2qvds4/image/upload/v1633696606/samples/khadijah/image_2.png',
        }),
        headers: { 'Content-Type': 'application/json' },
    });
}

const generateBody = (url, userID) => {
    /* Slack formats text in special ways:
        For URLS: <https://paystack.com| paystack> returns a hyperlinked "paystack" text to https://paystack.com.
        For Display Names: The user_id sent from the Slash command looks like this - Q016JVU6XFD
        To get the display name, the ID has to be formatted: <@Q016JVU6XFD> would return @userxyz for example

        Note: There is a user_name field but that can many times be different from the user's actual display name.
    */
    return `<${url}| good job> by <@${userID}>`
}

app.listen(port, () => console.log(`App listening at ${process.env.HOST}:${port}`));
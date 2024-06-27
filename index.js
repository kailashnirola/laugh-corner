import express from 'express';
import axios from 'axios';

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.post('/get-joke', async (req, res) => {
    const cat = req.body.category;
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/" + cat);
        const newJoke = {
            joke: result.data.joke || result.data.setup + ' ' + result.data.delivery,
            category: result.data.category,
        }
        res.render('index.ejs', { Joke: newJoke });
    } catch (error) {
        res.redirect('/');
    }
});

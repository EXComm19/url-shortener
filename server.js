const express = require('express');
const nedb = require('nedb');
const shortid = require('shortid')
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
db = new nedb('url.db');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static('public'));
db.loadDatabase();

app.post('/api/shorten', (req, res) => {
    const longURL = req.body.longURL;
    const shortCode = shortid.generate()
    const data = {
        shortCode,
        longURL,
        shortURL: `https://url---shortener.herokuapp.com/${shortCode}`
    };
    db.insert(data);
    console.log(data);

    res.status(200).json(data);
});

app.get('/:shortURL', function (req, res) {
    shortURL = req.params.shortURL
    db.findOne({ shortCode: shortURL }, (err, docs) => {
        if (err) {
            res.redirect(404, 'https://url---shortener.herokuapp.com/');
        }
        try {
            url = docs.longURL
            console.log(url);
            if (!url.includes('http')) {
                url = `http://${url}`
            }
            res.status(200).redirect(url);

        } catch (err) {
            res.redirect(404, 'https://url---shortener.herokuapp.com/');
        }


    })
})
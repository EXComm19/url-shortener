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
        shortURL: `http://localhost:3000/shorten/${shortCode}`
    };
    db.insert(data);

    res.status(200).json(data);
});

app.get('/shorten/:shortURL', function (req, res) {
    shortURL = req.params.shortURL
    db.find({ shortCode: shortURL }, (err, docs) => {
        const longURL = docs.longURL;
        if (!err) {
            return res.status(200).redirect(longURL);
        } else { res.status(404).json("Invalid URL"); }

    })
})
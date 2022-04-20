import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/../views/index.html`)
});

app.listen(3000, function() {
    console.log('Running on port 3000');
});
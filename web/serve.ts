import * as express from 'express';

const app = express();

app.use('/static', express.static(`${__dirname}/static`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/view/index.html`);
});

app.listen(3000, function() {
    console.log('Running on port 3000');
});
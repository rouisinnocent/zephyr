const express = require('express');
const app = express();

app.use(express.static('dist'));

app.use('/systemjs', express.static('systemjs'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, () => {
    console.log('[SERVER]: started at port :3000');
});
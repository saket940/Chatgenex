const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.use(express.static(__dirname));

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const html = fs.readFileSync('index.html', 'utf8');
    res.send(html);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
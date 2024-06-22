const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'uploads', req.file.originalname);

    fs.rename(tempPath, targetPath, err => {
        if (err) return res.sendStatus(500);
        res.json({ url: `/uploads/${req.file.originalname}` });
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

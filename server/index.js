const express = require("express");
const cors = require('cors');
const Joi = require("joi"); 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(25).required(), 
    age: Joi.number().min(18).max(45).required(), 
});

app.post('/user', (req, res) => {
    const { error, value } = schema.validate(req.body); 

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }
    return res.json({ message: 'Data is valid', data: value });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

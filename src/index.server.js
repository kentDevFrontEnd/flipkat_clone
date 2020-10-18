const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
// app.use(express.json());

// routers
const userRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin/admin.route');

env.config();
// mongo connect
// mongodb+srv://root:<password>@cluster0.b2loh.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.b2loh.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=>{
    console.log('database connected');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', userRoutes)

app.use('/api/admin', adminRoutes);

app.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Hello from server'
    })
})

app.post('/data',(req, res, next)=>{
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`listen from port: ${process.env.PORT}`)
})
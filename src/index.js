const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const mongoURL = 'mongodb+srv://dinesh:dinesh123@cluster0.b5piw.mongodb.net/paper_recycling?retryWrites=true&w=majority'

mongoose.connect(mongoURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('database connected');
}).catch(() =>{
	console.log("not conndected")
})


const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const pointRoutes = require('./routes/points')
const dashRoutes = require('./routes/dashboard')

const app = express();
const port = process.env.PORT || 1000

app.use(bodyParser.json())
app.use('/api' , userRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , pointRoutes);
app.use('/api' , dashRoutes);

app.listen(port, () => console.log(`listening ${port}` ))


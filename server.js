//SERVER
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
}).then(()=> console.log('DB Connection succesful!'));


const port = process.env.PORT;
app.listen(port, () => { console.log(`App running on port ${port}`) })
//SERVER
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
}).then(()=> console.log('DB Connection succesful!'))

console.log("NODE_ENV:", process.env.NODE_ENV);

const port = process.env.PORT;
app.listen(port, () => { console.log(`App running on port ${port}`) })
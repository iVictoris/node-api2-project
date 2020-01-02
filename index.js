const express = require('express')
const app = express()

const {router: postRouter} = require('./routes/post');
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/posts', postRouter)


app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
})
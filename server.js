const express = require('express')
const app = express()
const PORT = 3000
const postsRouter = require('./routers/posts_rout')
const errorServer = require('./middlewares/serverError')
const notFound = require("./middlewares/notFound");

app.use(express.static('public'))

app.use(express.json())


app.listen(PORT, () => {
    console.log(`Example app listening on PORT http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('<h1>Server del mio blog</h1>')
})

app.use('/posts', postsRouter)




app.use(errorServer)
app.use(notFound)
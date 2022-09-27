const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')

app.use(cors())

app.get('/about', async(req, res)=>{
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=The_Weeknd&rvprop=content')
    res.json(await response.json())
})

app.listen(3000)
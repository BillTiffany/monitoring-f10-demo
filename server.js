const express = require('express')

const path = require('path')

const app = express()

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'ec44c98d9f6d448690fe8a967482e9f7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4242

app.listen(port, () => console.log(`listening on port ${port}`));
const express = require('express')

const path = require('path')

const app = express()

const Rollbar = require('rollbar')

let students = []

app.use(express.json())

let rollbar = new Rollbar({
    accessToken: 'ec44c98d9f6d448690fe8a967482e9f7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    rollbar.log('Student added successfully', {author: 'Bill', type: 'manual entry'})
    
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4242

app.listen(port, () => console.log(`listening on port ${port}`));
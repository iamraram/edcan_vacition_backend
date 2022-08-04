import postsSchema from './schema/posts'
import usersSchema from './schema/users'

import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fs from 'fs'
import crypto from 'crypto'

const app = express()
dotenv.config()

const ID: any = process.env.DBID
const PW: any = process.env.PASSWORD
const TOKEN: any = process.env.SECRETCODE
const SALT: any = process.env.SALT
const port: any = process.env.PORT

app.listen((port || 8080), () => {
    console.log('listning on' + port)
});

app.get('/', (req, res, error) => {
    try {
        res.json('mainPage')
    }
    catch (error) {
        console.log(error)
        res.redirect(`/error/${error}`)
    }
})

app.get('/register', (req, res, error) => {
    res.json('register')
})

app.get('/login', (req, res, error) => {
    res.json('login')
})

app.post('/register', async (req, res, error) => {
    const tokenPw = TOKEN + req.body.passWord
    const changedPw = crypto.createHash('sha512', Buffer.from(SALT))
    const resultPw = changedPw.update(tokenPw).digest('base64')

    const schema = new usersSchema ({
        num: 1,
		name: req.body.name,
		userId: req.body.userId,
        userPw: resultPw.replace(('==' || '='), ''),
        email: req.body.email,
        isMale: req.body.isMale,
        friendly: 1
	})

    try {
        await schema.save()
        console.log('complete added new account')
        res.send(() => {
            res.json({
                status: 200,
                name: req.body.name
            })
            res.redirect('/')
        })
    }
    catch (err) {
        console.log('error')
        res.redirect('/error/404')
    }
})

app.get('/community', (req, res, error) => {
    res.json('community')
})

app.get('/write', (req, res, error) => {
    res.json('write')
})

app.post('/write', async (req, res, error) => {
    const schema = new postsSchema ({
        num: 1,
		title: req.body.title,
		desc: req.body.desc,
        created: Date.now(),
        comment: []
	})
	await schema.save()
    console.log('complete uploaded posts')
    res.redirect('/write')
})

app.get('/message', (req, res, error) => {
    res.json('message')
})

app.post('/message', (req, res, err) => {
    const receive_message: String = req.body
    let data: String = ""
    let status: Number = 200

    const wordlist = fs.readFileSync('./modules/wordlist.json', 'utf8')
    const chat_data = JSON.parse(wordlist)
    const chat_data_length = Object.keys(chat_data).length

    function analyze_message(message: String) {
        let result_message = ""
        try {
            const splited_message: Array<String> = message.split(" ")
            for (let i = 0; i < splited_message.length; i ++) {
                for (let j = 0; j < chat_data_length; j ++) {
                    // add: analyze message and return correct data
                }
            }
            return {status, result_message}
        }
        catch(error) {
            console.log(error)
            status = 500
            return {status, result_message}
        }
    }

    data = analyze_message(receive_message).result_message
    res.json({ status, data })
})

const address = 'mongodb+srv://' + ID + ':' + PW + '@cluster0.fzore.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(address)
const db = mongoose.connection

db.on('error', (error) =>
    console.log(error)
)

db.once('open', () =>
    console.log('connected to Mongoose')
)

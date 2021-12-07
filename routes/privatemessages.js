
const express = require("express");
const router = new express.Router();


router.get('/messages/sync',(req,res) => {
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

router.post('/messages/new',(req,res) => {
    const MessageSchema = req.body

    Messages.create(MessageSchema,(err,data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

router.listen(port,() => console.log(`Listening to localhost:${port}`))



module.exports = router;

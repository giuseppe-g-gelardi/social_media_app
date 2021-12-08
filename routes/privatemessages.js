const express = require("express");
const { PrivateMessages, validatePrivateMessages } = require("../models/privatemessages");
const router = new express.Router();


router.post("/api/:userID/sendMessage",  async (req, res) => {
    try {
        const temp = await Messages.findById({
            sendMessage: req.params.userID,
        });

        if (!temp) {
            const message = new message({
                sendMessage: req.params.userID,
                status: 0,
            })
            await message.save();
        }else {
            await Messages.deleteMsg({
                sendMessage: req.params.userID,
            });
            const user1 = await user1.findById({ userID:req.params.userID });
            user1.newMessage = user1.newMessage -1;
            await user1.save();
            const user2 = await user1.findById({ userID: req.params.userID });
            user2.messaging = user2.messaging -1;
            await user2.save();
        }

        res.send();
    }   catch (e) {
        res.status(500).send(e);
    }
});



module.exports = router;


// router.get('/messages/sync',(req,res) => {
//     Messages.find((err,data) => {
//         if(err) {
//             res.status(500).send(err)
//         }
//         else {
//             res.status(200).send(data)
//         }
//     })
// })

// router.post('/messages/new',(req,res) => {
//     const MessageSchema = req.body

//     Messages.create(MessageSchema,(err,data) => {
//         if(err) {
//             res.status(500).send(err)
//         }
//         else {
//             res.status(201).send(data)
//         }
//     })
// })

// router.listen(port,() => console.log(`Listening to localhost:${port}`))

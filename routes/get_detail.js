const express = require('express');
const { authorize } = require('./auth');
const router = express();


router.get('/get_detail',authorize , (req,res) => {
    if(req.session.user)
    {
        res.send(req.session.user);
    }

})

module.exports = router;
const {Router} = require('express');
const { join } = require('$/services/user');
const router = Router();
const passport = require('passport');
const passportService = require('$/services/passport.js');
const flash = require('connect-flash');

router.get('/', (req, res)=>{
    res.send({result : 'hi', sid :  req.user});
});

router.post('/process', (req,res,next)=>{
    passport.authenticate('local-join', (err,user,info) => {
        if(err) return next(err);
        if (!user) return res.status(401).json(info.message);

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.header({
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': true
            });
            return res.status(200).json({result: true, sid: user.sid});
        });
    })(req, res, next);
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})




module.exports = router;
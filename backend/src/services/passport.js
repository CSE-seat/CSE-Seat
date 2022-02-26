const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy
const userService = require('$/services/user')

passport.serializeUser(function(user, done){
    console.log('passport session save : ', user.sid)
    done(null, user.sid)
});

passport.deserializeUser(function(sid, done){
    console.log('passport session getdata : ', sid)
    done(null, sid); //user라는 객체에 담아 request로 전달한다
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'sid',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, sid, password, done)=>{
        userDTO = req.body;
        userDTO.only_friend = 'true' ? true : false;
        try{
            result = await userService.join(userDTO);
            if(result.result == false) 
                throw result;
            return done(null, {sid : userDTO.sid});
        }catch(e){
            console.log('오류 항목:', e.message);
            return done(null, false, {message : e.message});
        }
    }
));

passport.use('local-login', new LocalStrategy({
    usernameField: 'sid',
    passwordField: 'password',
    passReqToCallback : true
    }, async (req, sid, password, done)=>{
        userDTO = req.body;
        try{
            result = userService.login(userDTO);
            if(result.result == false) 
                throw result;
            return done(null, {sid : userDTO.sid});            
        }catch(e){
            console.log('오류 항목:', e.message);
            return done(null, false, {message : e.message});
        }
    }
));

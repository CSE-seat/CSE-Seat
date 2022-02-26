const userModel = require('../models/user')
const crypto = require('crypto');

const createSalt = () =>
            new Promise((resolve, reject) => {
                crypto.randomBytes(64, (err, buf) => {
                    if (err) reject(err);
                    resolve(buf.toString('base64'));
                });
            });

const createHashedPassword = (plainPassword) =>
new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString('base64'), salt });
    });
});

const makePasswordHashed = (sid, password) =>
    new Promise(async (resolve, reject) => {
        const salt = await userModel
            .findById(sid)
            .then((result) => result.salt);
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

module.exports = {
    
    join: async (userDTO)=>{
        try{
            if (!userDTO.sid) throw Error('학번을 입력하세요.')
            if (!userDTO.password) throw Error('비밀번호를 입력하세요.')
            if (!userDTO.email) throw Error('이메일을 입력하세요.')
            if (!userDTO.birth) throw Error('생일을 입력하세요.')
            if (!userDTO.major) throw Error('학번을 입력하세요.')
            let result = await userModel.findById(userDTO.sid).catch((err)=>{throw err;});
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            if(result.length>0) throw Error('이미 가입한 학번이 존재합니다.');
            
            hashed = await createHashedPassword(userDTO.password);
            userDTO.password = hashed.password;
            userDTO.password_salt = hashed.salt;
            result = await userModel.insert(userDTO);
            if(!result) throw Error('데이터 베이스 오류입니다. 관리자에게 문의하세요.');
            return {result : result};
        }catch(e){
            console.log('userService Join error: ',e)
            return {result : false, message: e.message};
        }
    },
    login : async (userDTO) => {
        try{
            if (!userDTO.sid) throw Error('학번을 입력하세요.')
            if (!userDTO.password) throw Error('비밀번호를 입력하세요.')
            rightPassword = await userModel.findById(sid)
            .then(result => result.password)
            .catch((err)=>{throw err;});
            if (rightPassword == makePasswordHashed(userDTO.password)){
                return {result: true}
            }
            else throw Error('비밀번호가 틀렸습니다.');
        }catch(e){
            console.log('userService Login error: ',e)
            return {result : false, message: e.message};
        }     
    },
}
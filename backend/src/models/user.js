let db = require('./mysql');

module.exports = {
    findById : async (sid) => new Promise( async (resolve, reject) => {
        let sql = "select * from user where sid = ?"
        let result = await db.query(sql,[sid]);
        if (result)
            return resolve(result);
        return reject(new Error('해당하는 학번이 없습니다.'));
    }),
    insert : async(userDTO) => {
        try {
            let sql = "INSERT INTO user SET ?"
            set = {
                sid : userDTO.sid,
                name : userDTO.name,
                birth : userDTO.birth,
                password : userDTO.password,
                password_salt : userDTO.password_salt,
                only_friend : userDTO.only_friend,
                major : userDTO.major,
                email : userDTO.email
            }
            let result = await db.query(sql,set);
            if (result && result.affectedRows > 0)
                return true;
            else
                throw Error('fail to insert')
        } catch(e){
            console.log(e);
            return false;
        }
        
    }
}
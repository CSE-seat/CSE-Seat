let db = require('./mysql');

module.exports = {
    findList : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where building_id = ? and seat_room = ? "
        + "and date = ? order by reservation_part, seat_num ASC";
        let set  = [
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.date
        ]

        let result = await db.query(sql,set);
        if (result)
            return resolve(result);
        return reject(Error('reservation findList error'));
    }),
}
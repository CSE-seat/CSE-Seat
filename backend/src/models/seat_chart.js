const room101 = [
    [-1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12],
    [13,14,15]
]
const room104  = [
    [16,17,18,19],
    [20,21,22,23],
    [24,25,26,27],
    [28,29,30,31],
    [32,33,34,35],
    [36,37,38,39],
    [40,41,42,43],
    [44,45,46,47]
]
const room108 = [
    [48,49,50,51,52],
    [53,54,55,56,57],
    [-1,-1,58,59,60],
    [61,-1,62,63,64],
    [-1,-1,65,66,67],
    [68,-1,69,70,71]
]
const getRoomArray =  (rNum) => {
    if (rNum == 101) return room101;
    if (rNum == 104) return room104;
    if (rNum == 108) return room108;
    return null;
}

const getRoomMap = (rNum) => {
    roomMap = new Map();
    roomArray = getRoomArray(rNum);
    n = roomArray.length
    m = roomArray[0].length
    for (let i = 0; i<n; i++){
        for(let j = 0; j<m; j++){
            if (roomArray[i][j] != -1){
                roomMap.set(roomArray[i][j], [i,j])
            }
        }
    }
    return roomMap;      
}
module.exports = {
    getRoomArray : getRoomArray,
    getRoomMap : getRoomMap
}
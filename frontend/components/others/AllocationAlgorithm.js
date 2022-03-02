const di = [0, 1, 0, -1, 1, 1, -1, -1];
const dj = [1, 0, -1, 0, -1, 1, 1, -1];
const zi = [1, 1, -1, -1];
const zj = [-1, 1, -1, 1];

const seatNumber = [
    [
        [-1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15],
    ],
    [
        [16, 17, 18, 19],
        [20, 21, 22, 23],
        [24, 25, 26, 27],
        [28, 29, 30, 31],
        [32, 33, 34, 35],
        [36, 37, 38, 39],
        [40, 41, 42, 43],
        [44, 45, 46, 47],
    ],
    [
        [48, 49, 50, 51, 52],
        [53, 54, 55, 56, 57],
        [-1, -1, 58, 59, 60],
        [61, -1, 62, 63, 64],
        [-1, -1, 65, 66, 67],
        [68, -1, 69, 70, 71],
    ],
]

const arr = [
    {
        N: 5,
        M: 3,
        seats: [
            [
                [-1, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [-1, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        ],
    },
    {
        N: 8,
        M: 4,
        seats: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ],
    },
    {
        N: 6,
        M: 5,
        seats: [
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
                [-1, -1, 0, 0, 0],
                [0, -1, 0, 0, 0],
            ],
        ],
    },
]

const requests = [
    {
        building_id: "414",
        apply_time: "20220226170505",
        seat_room: ["101", "104", "108"],
        seat_num: "",
        isToday: false,
        part1: true,
        part2: true,
        friends: [1, 2,],
    },
    // {
    //     building_id: "414",
    //     apply_time: "20220226170506",
    //     seat_room: ["101", "104"],
    //     seat_num: "",
    //     isToday: false,
    //     part1: true,
    //     part2: false,
    //     friends: [1, 2, ],
    // },
    // {
    //     building_id: "414",
    //     apply_time: "20220226170507",
    //     seat_room: ["101",],
    //     seat_num: "",
    //     isToday: false,
    //     part1: true,
    //     part2: false,
    //     friends: [2018115201, 2018115202, 2018115202,],
    // },
]

const hopeNumber = [
    [0, 0, 0],
    [0, 0, 0],
]

const seatNumChanger = (num) => {
    let seatPosition = [0, 0, 0],
        flag = false;
    if(!num) return seatPosition;
    seatNumber.forEach((e, index) => {
        const N = e.length;
        const M = e[0].length;
        for(let i = 0; i < N; i++){
            for(let j = 0; j < M; j++){
                if(num === e[i][j]){
                    seatPosition = [index, i, j];
                    flag = true;
                    break;
                }
            }
            if(flag) break;
        }
    })
    return seatPosition;
}

const handleEmptySeat = () => {
    const emptySeatNum = [
        [0, 0, 0],
        [0, 0, 0],
    ]
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 2; j++)
            for(let p = 0; p < arr[i].N; p++)
                for(let q = 0; q < arr[i].M; q++)
                        if(arr[i].seats[j][p][q] === 0) emptySeatNum[j][i]++;
    return emptySeatNum;
}

const emptySeat = handleEmptySeat();

const handleRoomApply = (arr) => {
    const isRoomApply = [false, false, false];
    arr.forEach((e) => {
        e === '101' ? isRoomApply[0] = true : 
        e === '104' ? isRoomApply[1] = true :
        e === '108' ? isRoomApply[2] = true : false;
    })
    return isRoomApply;
}

const settingHopeNumber = (arr, part1, part2, num) => {
    const isRoomApply = handleRoomApply(arr);
    const part = [part1, part2];
    for(let i = 0; i < 2; i++)
        if(part[i])
            for(let j = 0; j < 3; j++)
                if(isRoomApply[j]) hopeNumber[i][j] += num;
}

const onlyException = (seats, weight, i, j, N, M) => {
    let data = {
        sum: weight,
        pos: [[i, j]],
    }
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] += d === 1 ? 3 : 0;
        }
    }
    
    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[1][p][q] > max){
                max = seats[1][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    data.sum += max;
    data.pos.push([next.i, next.j]);

    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }

    return data;
}

const separateExceptionBacktracking = (seats, weight, i, j, N, M, num1, num2) => {
    let data = {
        sum: weight,
        pos: [[num1 === 1 ? 1 : 0, i, j]],
    };
    if(num2 === 1) return data;
    const isOne = num1 > 1 ? 1 : 0;
    seats[isOne ? 0 : 1][i][j] = -1;
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[0][ni][nj] === -1) continue;
            if(l < 4) seats[0][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[0][ni][nj] += d === 1 ? 3 : 0;
        }
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] += d === 1 ? 3 : 0;
        }
    }

    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[num1 === 2 ? (isOne ? 1 : 0) : (isOne ? 0 : 1)][p][q] > max){
                max = seats[num1 === 2 ? (isOne ? 1 : 0) : (isOne ? 0 : 1)][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    let tempData = num1 > 1 ? separateExceptionBacktracking(seats, max, next.i, next.j, N, M, num1 - 1, num2) : separateExceptionBacktracking(seats, max, next.i, next.j, N, M, num1, num2 - 1);
    data.sum += tempData.sum;
    data.pos.push(...tempData.pos);
    
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[0][ni][nj] === -1) continue;
            if(l < 4) seats[0][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[0][ni][nj] -= d === 1 ? 3 : 0;
        }
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[1][ni][nj] === -1) continue;
            if(l < 4) seats[1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }
    seats[isOne ? 0 : 1][i][j] = weight;
    return data;
}

const separateBacktracking = (seats, part, weight, i, j, N, M, num) => {
    let data = {
        sum: weight,
        pos: [[i, j]],
    };
    if(num === 1) return data;
    seats[part[0] ? 0 : 1][i][j] = -1;
    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[part[0] ? 0 : 1][ni][nj] === -1) continue;
            if(l < 4) seats[part[0] ? 0 : 1][ni][nj] += d === 1 ? 5 : 1;
            else if(l < 8) seats[part[0] ? 0 : 1][ni][nj] += d === 1 ? 3 : 0;
        }
    }
    
    let max = -1;
    let next = {
        i: undefined,
        j: undefined,
    }
    for(let p = 0; p < N; p++){
        for(let q = 0; q < M; q++){
            if(seats[part[0] ? 0 : 1][p][q] > max){
                max = seats[part[0] ? 0 : 1][p][q];
                next = {
                    i: p,
                    j: q,
                }
            }
        }
    }

    let tempData = separateBacktracking(seats, part, max, next.i, next.j, N, M, num - 1);
    seats[part[0] ? 0 : 1][i][j] = weight;
    data.sum += tempData.sum;
    data.pos.push(...tempData.pos);

    for(let d = 1; d <= 2; d++){
        for(let l = 0; l < 8; l++){
            let ni = di[l] * d + i;
            let nj = dj[l] * d + j;
            if(ni < 0 || nj < 0 || ni >= N || nj >= M) continue;
            if(seats[part[0] ? 0 : 1][ni][nj] === -1) continue;
            if(l < 4) seats[part[0] ? 0 : 1][ni][nj] -= d === 1 ? 5 : 1;
            else if(l < 8) seats[part[0] ? 0 : 1][ni][nj] -= d === 1 ? 3 : 0;
        }
    }

    return data;
}

const makePosition = (num, part, roomNum, seatNum) => {
    const N = arr[roomNum].N,
        M = arr[roomNum].M,
        seats = JSON.parse(JSON.stringify(arr[roomNum].seats)),
        seatPosition = seatNumChanger(seatNum);

    for(let k = 0; k < 2; k++){
        if(part[k]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[k][i][j] === -1) continue;
                    if(part[0] ^ part[1] && seats[k === 0 ? 1 : 0][i][j] === -1) seats[k][i][j] += 5;
                    for(let l = 0; l < 8; l++){
                        let ni = di[l] + i;
                        let nj = dj[l] + j;
                        if(ni < 0 || ni >= N || nj < 0 || nj >= M){
                            seats[k][i][j]++;
                            continue;
                        }
                        if(seats[k][ni][nj] === -1) seats[k][i][j]++;
                    }
                    if(part[0] & part[1] && seats[k === 0 ? 1 : 0][i][j] !== -1) seats[k][i][j] += 20;
                    if(seatNum && seatPosition.toString() == [roomNum, i, j]){
                        seats[k][i][j] += 40;
                        for(let d = 1; d <= 2; d++){
                            for(let l = 0; l < 4; l++){
                                let ni = di[l] * d + i;
                                let nj = dj[l] * d + j;
                                if(ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                                if(seats[k][ni][nj] === -1) continue;
                                seats[k][ni][nj] += d === 1 ? 10 : 5;
                            }
                        }
                        for(let l = 4; l < 8; l++){
                            let ni = di[l] + i;
                            let nj = dj[l] + j;
                            if(ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                            if(seats[k][ni][nj] === -1) continue;
                            seats[k][ni][nj] += 5;
                        }
                    }
                }
            }
        }
    }

    let max = -1;
    let data = {
        pos: [],
        isDone: false,
        roomNum: roomNum,
        num: num,
        max: -1,
    };
    const friendArr = [];
    if(num > 1){
        if(part[0] ^ part[1]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[part[0] ? 0 : 1][i][j] === -1) continue;
                    friendArr.push([seats[part[0] ? 0 : 1][i][j], i, j]);
                }
            }
        }
        else{
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    friendArr.push([seats[0][i][j] + seats[1][i][j], i, j]);
                }
            }
        }

        friendArr.sort((a, b) => {
            return a[0] - b[0];
        })
        while(friendArr.length){
            const [weight, i, j] = friendArr.pop();
            for(let l = 0; l < 4; l++) {
                let flag = false;
                let pos;
                if(num === 2){
                    pos = [
                        [i, j],
                        [i + di[l], j + dj[l]],
                    ];
                }
                else if(num === 3){
                    pos = [
                        [i, j],
                        [i, j + zj[l]],
                        [i + zi[l], j],
                    ];
                }
                else{
                    pos = [
                        [i, j],
                        [i, j + zj[l]],
                        [i + zi[l], j],
                        [i + zi[l], j + zj[l]],
                    ];
                }
                
                for(let k = 0; k < num; k++){
                    if(pos[k][0] < 0 || pos[k][1] < 0 || pos[k][0] >= N || pos[k][1] >= M) {
                        flag = true;
                        break;
                    }
                    if(part[0] ^ part[1]){
                        if(seats[part[0] ? 0 : 1][pos[k][0]][pos[k][1]] === -1){
                            flag = true;
                            break;
                        }
                    }
                    else{
                        if(seats[0][pos[k][0]][pos[k][1]] === -1 || seats[1][pos[k][0]][pos[k][1]] === -1){
                            flag = true;
                            break;
                        }
                    }
                }
                if(flag) continue;
                let sum = 0;
                for(let k = 0; k < num; k++){
                    if(part[0] ^ part[1])
                        sum += seats[part[0] ? 0 : 1][pos[k][0]][pos[k][1]];
                    else
                        sum += seats[0][pos[k][0]][pos[k][1]] + seats[1][pos[k][0]][pos[k][1]];
                }
                if(sum > max) {
                    max = sum;
                    data.isDone = true;
                    for(let k = 0; k < num; k++) data.pos.push([pos[k][0], pos[k][1]]);
                }
            }
            if(max > 0) break;
        }
    }
    else{
        if(part[0] ^ part[1]){
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[part[0] ? 0 : 1][i][j] > max){
                        max = seats[part[0] ? 0 : 1][i][j];
                        data.isDone = true;
                        data.pos.push([i, j]);
                    }
                }
            }
        }
        else{
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[0][i][j] !== -1 && seats[1][i][j] !== -1 && seats[0][i][j] + seats[1][i][j] > max){
                        max = seats[0][i][j] + seats[1][i][j];
                        data.isDone = true;
                        data.pos.push([i, j]);
                    }
                }
            }
        }
    }
    if(max !== -1){
        data.max = max;
        return data;
    }

    let posData;
    if(part[0] ^ part[1]){
        let friendArr1 = [];
        for(let i = 0; i < N; i++){
            for(let j = 0; j < M; j++){
                if(seats[part[0] ? 0 : 1][i][j] === -1) continue;
                friendArr1.push([seats[part[0] ? 0 : 1][i][j], i, j]);
            }
        }
        friendArr1.sort((a, b) => {
            return a[0] - b[0];
        })
        
        while(friendArr1.length){
            const [weight, i, j] = friendArr1.pop();
            let separateData = separateBacktracking(seats, part, weight, i, j, N, M, num);
            if(separateData.sum > max){
                max = separateData.sum;
                posData = separateData.pos;
            }
        }
        data.pos = posData;
        data.isDone = true;
        data.max = max;
    }
    else{
        if(num === 1){
            let onlyArr = [];
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                        if(seats[0][i][j] === -1) continue;
                        onlyArr.push([seats[0][i][j], i, j]);
                }
            }
            onlyArr.sort((a, b) => {
                return a[0] - b[0];
            })

            while(onlyArr.length){
                const [weight, i, j] = onlyArr.pop();
                let onlyData = onlyException(seats, weight, i, j, N, M);
                if(onlyData.sum > max){
                    max = onlyData.sum;
                    posData = onlyData.pos;
                }
            }
            data.pos = posData;
            data.isDone = true;
            data.max = max;
        }
        else{
            let friendArr2 = [];
            for(let i = 0; i < N; i++){
                for(let j = 0; j < M; j++){
                    if(seats[0][i][j] === -1) continue;
                    friendArr2.push([seats[0][i][j], i, j]);
                }
            }
            friendArr2.sort((a, b) => {
                return a[0] - b[0];
            })

            let max = -1;
            let posData;
            while(friendArr2.length){
                const [weight, i, j] = friendArr2.pop();
                let separateExceptionData = separateExceptionBacktracking(seats, weight, i, j, N, M, num + 1, num);
                if(separateExceptionData.sum > max){
                    max = separateExceptionData.sum;
                    posData = separateExceptionData.pos;
                }
            }
            data.pos = posData;
            data.isDone = true;
            data.max = max;
        }
    }

    return data;
}

const selectSeats = ({isDone, pos, roomNum, num}, part, isRoomApply) => {
    if(isDone){
        pos.forEach((e) => {
            if(part[0]) arr[roomNum].seats[0][e[0]][e[1]] = -1;
            if(part[1]) arr[roomNum].seats[1][e[0]][e[1]] = -1;
        })
        for(let i = 0; i < 2; i++)
            for(let j = 0; j < 3; j++)
                if(part[i]){
                    if(isRoomApply[j]) hopeNumber[i][j] -= num;
                    if(j === roomNum) emptySeat[i][j] -= num;
                }
    }
    else
        for(let i = 0; i < 2; i++)
            for(let j = 0; j < 3; j++)
                if(part[i])
                    if(isRoomApply[j]) hopeNumber[i][j] -= num;
}

const solveReq = (seat_room, seat_num, part1, part2, num) => {
    if(num === 0) return ;
    const isRoomApply = handleRoomApply(seat_room),
        part = [part1, part2];
    let data = [];
    let flag = false;
    const res = []
    if(part1 ^ part2){
        for(let i = 0; i < 3; i++){
            if(isRoomApply[i] && emptySeat[part1 ? 0 : 1][i] >= num) {
                data.push(makePosition(num, part, i, Number(seat_num)));
                flag = true;
            }
        }
        if(flag){
            data.sort((a, b) => {
                if(emptySeat[part1 ? 0 : 1][a.roomNum] / hopeNumber[part1 ? 0 : 1][a.roomNum] === emptySeat[part1 ? 0 : 1][b.roomNum] / hopeNumber[part1 ? 0 : 1][b.roomNum])
                    return a.max > b.max;
                return emptySeat[part1 ? 0 : 1][a.roomNum] / hopeNumber[part1 ? 0 : 1][a.roomNum] - emptySeat[part1 ? 0 : 1][b.roomNum] / hopeNumber[part1 ? 0 : 1][b.roomNum];
            })
            res.push(data.pop());
            selectSeats(res[res.length - 1], part, isRoomApply);
            return res;
        }

        let capacity = 0,
            maxCapacity = 0,
            twoCapacity = 0;
        for(let i = 0; i < 3; i++){
            if(isRoomApply[i]) {
                capacity += emptySeat[part1 ? 0 : 1][i];
                maxCapacity = emptySeat[part1 ? 0 : 1][i] > maxCapacity ? emptySeat[part1 ? 0 : 1][i] : maxCapacity;
                if(emptySeat[part1 ? 0 : 1][i] === 2) twoCapacity++;
            }
        }
        if(capacity < num) solveReq(seat_room, seat_num, part1, part2, num - 1).forEach(prop => res.push(prop));
        else{
            if(maxCapacity === 3){
                if(twoCapacity >= 2){
                    solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                }
                else{
                    solveReq(seat_room, seat_num, part1, part2, 3)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                }
            }
            else{
                if(num === 4){
                    if(twoCapacity >= 2){
                        solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                        solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                    }
                    else{
                        solveReq(seat_room, seat_num, part1, part2, 3)?.forEach(prop => res.push(prop));
                        solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                    }
                }
                else if(num === 3){
                    if(twoCapacity >= 1){
                        solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                        solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                    }
                    else{
                        solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                        solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                        solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                    }
                }
                else if(num === 2){
                    solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                }
            }
        }
    }
    else{
        for(let i = 0; i < 3; i++){
            if(isRoomApply[i] && Math.min(emptySeat[0][i], emptySeat[1][i]) >= num) {
                data.push(makePosition(num, part, i, Number(seat_num)));
                flag = true;
            }
        }
        if(flag){
            data.sort((a, b) => {
                const orderA = Math.min(emptySeat[0][a.roomNum] / hopeNumber[0][a.roomNum], emptySeat[1][a.roomNum] / hopeNumber[1][a.roomNum]),
                    orderB = Math.min(emptySeat[0][b.roomNum] / hopeNumber[0][b.roomNum], emptySeat[1][b.roomNum] / hopeNumber[1][b.roomNum]);
                if(orderA === orderB) return a.max > b.max;
                return orderA - orderB;
            })
            res.push(data.pop());
            selectSeats(res[res.length - 1], part, isRoomApply);
            return res;
        }

        let capacity = [0, 0],
            maxCapacity = [0, 0],
            twoCapacity = [0, 0],
            maxBoth = [999, 999, 999];
        for(let d = 0; d < 2; d++){
            for(let i = 0; i < 3; i++){
                if(isRoomApply[i]) {
                    maxBoth[i] = Math.min(emptySeat[d][i], maxBoth[i]);
                    capacity[d] += emptySeat[d][i];
                    maxCapacity[d] = emptySeat[d][i] > maxCapacity[d] ? emptySeat[d][i] : maxCapacity[d];
                    if(emptySeat[d][i] === 2) twoCapacity[d]++;
                }
            }
        }
        if(capacity[0] < num || capacity[1] < num){
            if(capacity[0] < num && capacity[1] < num) solveReq(seat_room, seat_num, part1, part2, num - 1)?.forEach(prop => res.push(prop));
            else if(capacity[0] < num){
                solveReq(seat_room, seat_num, part1, part2, num - 1)?.forEach(prop => res.push(prop));
                solveReq(seat_room, seat_num, false, part2, 1)?.forEach(prop => res.push(prop));
            }
            else{
                solveReq(seat_room, seat_num, part1, part2, num - 1)?.forEach(prop => res.push(prop));
                solveReq(seat_room, seat_num, part1, false, 1)?.forEach(prop => res.push(prop));
            }
        }
        else{
            let sumOfMaxBoth = 0;
            let twoBoth = 0;
            let maxOfBoth = 0;
            for(let i = 0; i < 3; i++){
                if(isRoomApply[i]) {
                    sumOfMaxBoth += maxBoth[i];
                    maxOfBoth = maxBoth[i] > maxOfBoth ? maxBoth[i] : maxOfBoth;
                    if(maxBoth[i] >= 2) twoBoth++;
                }
            }
            if(sumOfMaxBoth >= num){
                if(num === 4 && twoBoth >= 2){
                    solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, 2)?.forEach(prop => res.push(prop));
                }
                else {
                    solveReq(seat_room, seat_num, part1, part2, num - 1)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, 1)?.forEach(prop => res.push(prop));
                }
            }
            else{
                if(maxOfBoth === 0){
                    solveReq(seat_room, seat_num, part1, false, num)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, false, part2, num)?.forEach(prop => res.push(prop));
                }
                else{
                    solveReq(seat_room, seat_num, part1, part2, maxOfBoth)?.forEach(prop => res.push(prop));
                    solveReq(seat_room, seat_num, part1, part2, num - maxOfBoth)?.forEach(prop => res.push(prop));
                }
            }
        }        
    }
    return res;
}

const Allocation = () => {
    const sortedRequests = requests.slice().sort((a, b) => {
        return Number(a.apply_time) - Number(b.apply_time);
    });
    sortedRequests.forEach((e) => {
        settingHopeNumber(e.seat_room, e.part1, e.part2, e.friends.length + 1);
    })
    sortedRequests.forEach(({seat_room, seat_num, part1, part2, friends}, index) => {
        const data = (solveReq(seat_room, seat_num, part1, part2, friends.length + 1));
        console.log(data);
        // 이제 위치는 받았고, 사람을 기준으로 자리를 배정해준다.
        // 이때, 한 자리에서 1,2부가 같다면 하나의 res가 나오면 되고,
        // 1,2부 자리가 다르다면 res는 2개가 나와야한다.
        // 안 겹치도록 apply_id도 부여해야한다. ( 친구 공통 )
        // 유저 sid도 보내야한다. 본인이면 user id에 0 넣어서 보내주자.
        // 나머지 보내야할것들 : part, building_id, seat_room, seat_num, date(그대로)
    })
    return <></>
}

export default Allocation;
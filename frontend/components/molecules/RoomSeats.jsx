import { useRecoilValue, useSetRecoilState } from 'recoil';
import { seatModalAtom } from '../others/state';
import {Seat} from "../atoms/Seat";
import SquareImg from '../atoms/Img';
import { todayAtom } from '../others/state';

const RoomData = [
    {
        room : 101,
        seats : [
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
            [31, 0, 1, 0, 0],
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
            [34, 1, 1, 0, 0],
            [35, 0, 1, 0, 0],
            [36, 1, 1, 0, 0],
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
        ],
    },
    {
        room : 104,
        seats : [
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
            [34, 1, 1, 0, 0],
            [35, 0, 1, 0, 0],
            [36, 1, 1, 0, 0],
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
        ],
    },
    {
        room : 108,
        seats : [
            [37, 1, 1, 0, 0],
            [38, 0, 0, 0, 0],
            [39, 0, 1, 0, 0],
            [40, 1, 1, 0, 0],
            [41, 1, 1, 0, 0],
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [22, 0, 1, 0, 0],
            [23, 1, 1, 0, 0],
            [24, 3, 3, 0, 0],
            [25, 0, 1, 0, 0],
            [26, 0, 0, 0, 0],
            [27, 0, 0, 0, 0],
            [28, 0, 1, 0, 0],
            [29, 3, 3, 0, 0],
            [30, 0, 0, 0, 0],
            [31, 0, 1, 0, 0],
            [32, 2, 2, 0, 0],
            [33, 3, 3, 0, 0],
        ],
    }  
]

const RoomSeats = ({roomNumber, length="50px", basic=false}) => {
    const setModalState = useSetRecoilState(seatModalAtom);
    const isToday = useRecoilValue(todayAtom);    
    const openSeatModal = (room, today, prop) => {
        let seatInfo = {
            roomNumber : room,
            isToday : today,
            seatNumber : prop[0],
            one : undefined,
            two : undefined
        };
        if(today){
            seatInfo.one = prop[1];
            seatInfo.two = prop[2];
        }
        else{
            seatInfo.one = prop[3];
            seatInfo.two = prop[4];
        }
        let tempObject = {
            isModalOpen : true,
            seatInfo : seatInfo
        };
        setModalState(tempObject);
    }

    return (
        <>
            <div className="roomSeatsDiv">
                <span className="seatTitle">{RoomData[roomNumber].room}호
                {basic ? `` : <><span className="bar">|</span>{isToday ? "오늘" : "내일"}</>}</span>
                <div className="front">
                    <SquareImg src="/images/square.png"
                    length="40px"/>
                    <span>정면</span>
                </div>
                <div className="seats">
                {
                    RoomData[roomNumber].seats.map((prop, index) => {
                        return (
                            <div className="seatDiv" key={prop + index} onClick={() => openSeatModal(roomNumber, isToday, prop)}>
                                {
                                    basic ?
                                    <Seat length={length}/> :
                                    isToday ? 
                                    <Seat length={length} left={prop[1]} right={prop[2]}/>
                                    : 
                                    <Seat length={length} left={prop[3]} right={prop[4]}/>
                                }
                                <span>{prop[0]}</span>
                            </div>
                        );
                    })
                }
                </div>
            </div>
            <style jsx>{`
                .roomSeatsDiv{
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    margin-top: 20px;
                    margin-bottom: 40px;
                    width: 100%;
                    max-width: 400px;
                }
                .seatTitle{
                    width: 100%;
                    margin: 15px;
                }
                .bar{
                    margin: 0 14px;
                }
                .front{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                }
                .front span{
                    font-size: 14px;
                }
                .seats{
                    display:flex;
                    flex-wrap: wrap;
                }
                .seatDiv{
                    display: flex;
                    width: 25%;
                    flex-direction: column;
                    align-items:center;
                }
            `}</style>
        </>
    );
}

export default RoomSeats;
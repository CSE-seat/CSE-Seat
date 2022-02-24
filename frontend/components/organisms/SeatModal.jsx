import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Seat, seatColor } from "../atoms/Seat";
import { refreshIndexAtom, seatModalAtom } from "../others/state";

const SeatModal = () => {
    const [refreshData, setRefreshData] = useRecoilState(refreshIndexAtom);
    const [modalState, setModalState] = useRecoilState(seatModalAtom);
    const { isModalOpen, seatInfo: { one, two, roomNumber, isToday, seatNumber } } = modalState
    const [oneColor, setOneColor] = useState('');
    const [twoColor, setTwoColor] = useState('');
    const [isMySeat, setIsMySeat] = useState([false, false]);
    const [isReadyToRequest, setIsReadyToRequest] = useState([false, false]);
    const modalOutside = useRef();
    const cancelBtn = useRef();

    const changeColor = (color) => {
        if (color === seatColor[0]) return seatColor[4];
        if (color === seatColor[4]) return seatColor[0];
        if (color === seatColor[2]) return seatColor[5];
        if (color === seatColor[5]) return seatColor[2];
    }

    const clickModal = (event) => {
        if (event.target === modalOutside.current || event.target === cancelBtn.current) {
            let tempObject = { ...modalState };
            tempObject.isModalOpen = false;
            setModalState(tempObject);
            modalOutside.current.style.display = "none";
        }
    };

    const closeModal = () => {
        const tempModalState = { ...modalState };
        tempModalState.isModalOpen = false;
        setModalState(tempModalState);
    }

    const selectTime = (prop) => {
        if (prop === 0) {
            if (one === 0 || one === 2) {
                setOneColor(changeColor(oneColor));
                setIsReadyToRequest([!isReadyToRequest[0], isReadyToRequest[1]]);
            }
        }
        else {
            if (two === 0 || two === 2) {
                setTwoColor(changeColor(twoColor));
                setIsReadyToRequest([isReadyToRequest[0], !isReadyToRequest[1]]);
            }
        }
    };

    const fetchingCancel = async (one = isReadyToRequest[0], two = isReadyToRequest[1], isFinish = true) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/seat/reservation-cancel", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                building_id: "414",
                seat_room: roomNumber.toString(),
                seat_num: seatNumber.toString(),
                isToday: isToday,
                part1: one,
                part2: two,
            })
        })
        const data = res.json();
        if ((data.result === true) & isFinish) {
            setRefreshData(!refreshData);
            closeModal();
        }
    }

    const fetchingReservation = async (one = isReadyToRequest[0], two = isReadyToRequest[1]) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/seat/reservation", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                building_id: "414",
                seat_room: [roomNumber.toString()],
                seat_num: seatNumber.toString(),
                isToday: isToday,
                part1: one,
                part2: two,
            })
        })
        const data = res.json();
        if (data.result === true) {
            setRefreshData(!refreshData);
            closeModal();
        }
    }

    const submitReq = async () => {
        if (isReadyToRequest[0] ^ isReadyToRequest[1]) {
            if (isReadyToRequest[0] & isMySeat[0]) fetchingCancel();
            else if (isReadyToRequest[0]) fetchingReservation();
            else if (isReadyToRequest[1] & isMySeat[1]) fetchingCancel();
            else if (isReadyToRequest[1]) fetchingReservation();
        }
        else {
            if (isMySeat[0] & isMySeat[1]) fetchingCancel();
            else if (isMySeat[0] | isMySeat[1]) {
                if (isMySeat[0]) {
                    await fetchingCancel(true, false, false);
                    fetchingReservation(false, true);
                }
                else {
                    await fetchingCancel(false, true, false);
                    fetchingReservation(true, false);
                }
            }
            else fetchingReservation();
        }
    }

    const clickBtn = (e) => {
        e.preventDefault();
        if (isReadyToRequest[0] | isReadyToRequest[1]) submitReq();
    }

    useEffect(() => {
        modalOutside.current.style.display = isModalOpen ? "flex" : "none";
        setOneColor(seatColor[one]);
        setTwoColor(seatColor[two]);
        setIsReadyToRequest([false, false]);
        if (isModalOpen) {
            let tempSeat = [false, false];
            one === 2 ? tempSeat[0] = true : false;
            two === 2 ? tempSeat[1] = true : false;
            setIsMySeat(tempSeat);
        }
    }, [isModalOpen]);

    return (
        <>
            <div className="modal" onClick={clickModal} ref={modalOutside}>
                <div>
                    <span>{roomNumber}호<span className="bar">|</span>
                        {isToday ? "오늘" : "내일"}<span className="bar">|</span>
                        {seatNumber}번 좌석</span>
                    <Seat length="120px" left={oneColor} right={twoColor} isColor />
                    <div className="time">
                        <span>시간</span>
                        <div>
                            <div className="one" onClick={() => { selectTime(0) }}>1부
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    selectTime(0);
                                }}>(06:00 ~ 18:00)</span></div>
                            <div className="two" onClick={() => { selectTime(1) }}>2부
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    selectTime(1);
                                }}>(18:00 ~ 06:00)</span></div>
                        </div>
                    </div>

                    {isMySeat[0] | isMySeat[1] ?
                        <>
                            <div className="check">
                                <div>
                                    <button>입실</button><span>22.01.19<span className="space" />06 : 24</span>
                                </div>
                                <div>
                                    <button>퇴실</button><span>22.01.19<span className="space" />06 : 24</span>
                                </div>
                            </div>
                            <button className="submit" onClick={clickBtn}>자리 수정</button>
                        </>
                        :
                        <button className="submit" onClick={clickBtn}>신청하기</button>
                    }

                    <img src="/images/cancel.png"
                        className="cancel"
                        onClick={clickModal}
                        ref={cancelBtn}
                    />
                </div>
            </div>
            <style jsx>{`
            .modal{
                display: none;
                position: fixed;
                top:-1vh;
                left:-1%;
                justify-content: center;
                align-items: center;
                width: 102%;
                height: 102vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
                cursor: auto;
            }
            .modal > div{
                display: flex;
                position: relative;
                flex-direction : column;
                align-items:center;
                width: 350px;
                min-height: 400px;
                background: #fff;
                gap: 25px;
                z-index: 12;
                padding-bottom: 90px;
            }
            .modal > div > span{
                width: 100%;
                font-size: 18px;
                margin: 10px 0 0 15px;
            }
            .bar{
                margin: 0 14px;
            }
            .cancel{
                position: absolute;
                top: 6px;
                right: 6px;
                width: 30px;
                height: 30px;
            }
            .time{
                display:flex;
            }
            .time > span{
                padding-top: 8px;
                width: 70px;
                font-size: 20px;
            }
            .time > div{
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .time > div > div{
                display: flex;
                justify-content: center;
                align-items:center;
                width: 160px;
                height: 40px;
                font-size: 18px;
                
            }
            .time > div > div > span{
                margin-left: 5px;
                font-size: 14px;
                white-space: nowrap;
            }
            .one{
                border:solid;
                border-width: 1px;
                border-color: ${(oneColor === seatColor[0] ? "#ddd" : oneColor)};
                background: ${(oneColor)};
            }
            .one, .one > span{
                cursor: ${(one === 0 ? "pointer" :
                    one === 2 ? "pointer" : "default")};
                color: ${(oneColor === seatColor[0] ? "#000" : "#fff")};
            }
            .two{
                border:solid;
                border-width: 1px;
                border-color: ${(twoColor === seatColor[0] ? "#ddd" : twoColor)};
                background: ${(twoColor)};
            }
            .two, .two > span{
                cursor: ${(two === 0 ? "pointer" :
                    twoColor === 2 ? "pointer" : "default")};
                color: ${(twoColor === seatColor[0] ? "#000" : "#fff")};
            }
            .check{
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 10px;
            }
            .space{
                margin: 0 10px;
            }
            .check button{
                width: 80px;
                height: 35px;
                outline: none;
                border: solid;
                border-width: 1px;
                border-color: #ddd;
                background: #fff;
                margin-left: 50px;
                margin-right: 25px;
            }
            .check span{
                width: 200px !important;
                height: 100%;
            }
            .submit{
                position: absolute;
                bottom: 25px;
                width: 160px;
                height: 40px;
                outline: none;
                border: solid;
                border-width: 1px;
                background: #fff;
                ${(isReadyToRequest[0] | isReadyToRequest[1] ?
                    `
                    box-shadow: 0 0 1px;
                    border-color: #999;
                    cursor: pointer;
                    color: #000;
                    `
                    :
                    `
                    border-color: #ddd;
                    color: #ddd;
                    cursor: default;
                    `
                )}
                transition: 0.2s;
            }
        `}</style>
        </>
    );
}

export default SeatModal;
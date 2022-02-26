import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import RoomSeats from "../molecules/RoomSeats";
import { seatingChartModalAtom } from "../others/state";

const SeatingChartModal = () => {
    // 한 room의 width를 250~400. width 조절 처리 끝
    // RoomSeats에 length 달 수 있게 설정해놨으니까
    // 내일 seat 크기 조절해서 modal창에 넣도록.


    // 스크롤바도 안 보이게 해야함


    const [isOpenModal, setIsOpenModal] = useRecoilState(seatingChartModalAtom);
    const [targetRoom, setTargetRoom] = useState(0);
    const modalOutside = useRef();
    const cancelBtn = useRef();

    const closeModal = (event) => {
        if(event.target === modalOutside.current || event.target === cancelBtn.current){
            setIsOpenModal(false);
        }
    }

    const changeTargetRoom = (prop) => {
        setTargetRoom(prop);
    }

    return (
        <>
        <div className="background" onClick={closeModal} ref={modalOutside}>
            <div className="modal">
                <div className="header">
                    <span onClick={() => changeTargetRoom(0)}>101호</span>
                    <div></div>
                    <span onClick={() => changeTargetRoom(1)}>104호</span>
                    <div></div>
                    <span onClick={() => changeTargetRoom(2)}>108호</span>
                </div>
                
                <div className="rooms">
                    <div className="room0">
                        <RoomSeats length="40px" basic roomNumber={0}/>
                    </div>
                    <div className="bar"></div>
                    <div className="room1">
                        <RoomSeats length="40px" basic roomNumber={1}/>
                    </div>
                    <div className="bar"></div>
                    <div className="room2">
                        <RoomSeats length="40px" basic roomNumber={2}/>
                    </div>
                </div>
                <img src="/images/cancel.png"
                    className="cancel"
                    onClick={closeModal}
                    ref={cancelBtn}/>
            </div>
        </div>
        <style jsx>{`
            .background{
                display: ${(isOpenModal ? "flex" : "none")};
                justify-content: center;
                align-items: center;
                position: fixed;
                top: -1vh;
                left: -1vw;
                width: 102vw;
                height: 102vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 11;
            }
            .modal{
                display: flex;
                position: relative;
                align-items: center;
                top:0;
                left:0;
                height: 70%;
                background: #fff;
                cursor: default;
                border:none;
                overflow: auto;
            }
            .header{
                position: absolute;
                top:0;
                left:0;
                justify-content: space-around;
                align-items:center;
                width: 80%;
                height: 40px;
                border: solid #bbb;
                border-width: 0 1px 1px 0;
            }
            .header > span{
                display: flex;
                justify-content: center;
                align-items:center;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            .header > div{
                width: 1px;
                height: 15px;
                background: #bbb;
                border:solid;
                border-width:1px;
                border-color:#bbb;
            }
            .rooms{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
            }
            .rooms .bar{
                width: 0;
                height: 80%;
                border: 1px solid #eee;
                border-width: 0 1px 0 0;
            }
            .cancel{
                position: absolute;
                top: 6px;
                right: 6px;
                width: 30px;
                height: 30px;
            }
            @media(min-width: 1024px){
                .modal{
                    width: 70%;
                    min-width: 900px;
                    max-width: 1300px;
                }
                .header{
                    display: none;
                }
            }
            @media(max-width: 1023px){
                .modal{
                    width: 400px;
                    padding-top: 25px;
                }
                .header{
                    display: flex;
                }
                .rooms > div{
                    display: none;
                }
                .room${(targetRoom)}{
                    display: flex !important;
                }
                .bar{
                    display: none;
                }
            }
        `}</style>
        </>
    );
}

export default SeatingChartModal;
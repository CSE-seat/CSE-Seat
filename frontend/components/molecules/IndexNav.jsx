import { useRecoilState } from "recoil";
import { showRoomAtom, todayAtom } from "../others/state";

const IndexNav = () => {
    const [isToday, setIsToday] = useRecoilState(todayAtom);
    const [targetRoom, setTargetRoom] = useRecoilState(showRoomAtom);

    const changeToToday = (prop) => {
        prop ? setIsToday(true) : setIsToday(false);
    }

    const changeTargetRoom = (prop) => {
        setTargetRoom(prop);
    }

    return (
        <>
            <div className="nav">
                <div>
                    <span onClick={() => changeTargetRoom(0)}>101호</span>
                    <div></div>
                    <span onClick={() => changeTargetRoom(1)}>104호</span>
                    <div></div>
                    <span onClick={() => changeTargetRoom(2)}>108호</span>
                </div>
                <div>
                    <span onClick={() => changeToToday(true)}>오늘 자리</span>
                    <div></div>
                    <span onClick={() => changeToToday(false)}>내일 자리</span>
                </div>
            </div>
            <style jsx>{`
                .nav{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                .nav > div{
                    display: flex;
                    justify-content: space-around;
                    align-items:center;
                    width: 100%;
                    height: 50%;
                    border-bottom: solid;
                    border-width: 1px;
                    border-color: #ddd;
                }
                .nav > div > span{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
                .nav > div > div{
                    width: 1px;
                    height: 15px;
                    background: #ddd;
                    border:solid;
                    border-width:1px;
                    border-color:#ddd;
                }
            `}</style>
        </>
    );
}

export default IndexNav;
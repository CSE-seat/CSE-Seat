import { useRecoilState } from "recoil";
import { todayAtom } from "../others/state";

const TodayButton = () => {
    const [isToday, setIsToday] = useRecoilState(todayAtom);

    const changeToToday = () => {
        if(!isToday){
            setIsToday(!isToday);
        }
    }

    const changeToTomarrow = () => {
        if(isToday){
            setIsToday(!isToday);
        }
    }

    return (
        <>
            <div className="buttonDiv">
                <div className="left" onClick={changeToToday}>
                    <div className="roundA"></div>
                    <div className="a"></div>
                    <span className="aa">오늘 자리</span>
                </div>
                <div className="right" onClick={changeToTomarrow}>
                    <div className="b"></div>
                    <div className="roundB"></div>
                    <span className="bb">내일 자리</span>
                </div>
            </div>
            <style jsx>{`
            .buttonDiv{
                display: flex;
                position: relative;
                justify-content: center;
                width: 170px;
                height: 40px;
            }
            .buttonDiv > div{
                display: flex;
                position: relative;
                width: 85px;
            }
            .buttonDiv .left{
                justify-content: flex-end;
            }
            .buttonDiv .right{
                justify-content: left;
            }
            .buttonDiv > div > div{
                width: 70px;
                height: 100%;
                cursor: pointer;
            }
            .buttonDiv div .a{
                border: solid;
                border-width: 1px 1px 1px 0;
                ${(isToday ? `
                background: #0F5BCC;
                border-color: #0F5BCC;
                ` : `
                background: #fff;
                border-color: #ccc;
                `)}
                z-index: 1;
            }
            .buttonDiv div .b{
                border: solid;
                border-width: 1px 0 1px 0;
                ${(isToday ? `
                background: #fff;
                border-color: #ccc;
                ` : `
                background: #0F5BCC;
                border-color: #0F5BCC;
                `)}
                z-index: 1;
            }
            
            .buttonDiv div .roundA, .buttonDiv div .roundB{
                position: absolute;
                top: 0;
                width: 30px;
                border-radius: 100% 100%;
            }
            .buttonDiv div .roundA{
                left: 0;
                border: solid;
                border-width: 1px 0 1px 1px;
                ${(isToday ? `
                background: #0F5BCC;
                border-color: #0F5BCC;
                ` : `
                background: #fff;
                border-color: #ccc;
                `)}
                z-index: 0;
            }
            .buttonDiv div .roundB{
                right: 0;
                border: solid;
                border-width: 1px 1px 1px 0;
                ${(isToday ? `
                background: #fff;
                border-color: #ccc;
                ` : `
                background: #0F5BCC;
                border-color: #0F5BCC;
                `)}
                z-index: 0;
            }
            .buttonDiv div span{
                position: absolute;
                top: 10px;
                z-index: 2;
                cursor: pointer;
            }
            .buttonDiv div .aa{
                left: 12px;
                ${(isToday ? `
                color: #fff;
                ` : `
                color: #000;
                `)}
            }
            .buttonDiv div .bb{
                right: 12px;
                ${(isToday ? `
                color: #000;
                ` : `
                color: #fff;
                `)}
            }
            `}</style>
        </>
    );

}

export default TodayButton;
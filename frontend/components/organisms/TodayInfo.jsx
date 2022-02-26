import { useState } from "react";
import Checkbox from "../atoms/Checkbox";
import { MyLink } from "../atoms/Div";

const TodayInfo = () => {
    const [isSelectCancel, setIsSelectCancel] = useState(false);
    const [checkboxState, setCheckboxState] = useState([0, 0, 0, 2]);

    const handleCancel = () => {
        // 자리 취소 누르고 아무것도 행동 안하거나 이상 없으면 그냥 boolean만 바꿔줘
        if(isSelectCancel){
            alert("신청");
            setIsSelectCancel(false);
        }
        else{
            setIsSelectCancel(true);
        }
    }

    const clickCheckbox = (index) => {
        const tempCheckboxState = checkboxState.slice(0, 4);
        if(tempCheckboxState[index] !== 2){
            tempCheckboxState[index] = tempCheckboxState[index] === 0 ? 1 : 0;
            setCheckboxState(tempCheckboxState);
        }
    }

    return (
    <>
    <div className="today">
        <div className="todayInfo">
            <span>오늘</span><span>1부</span><span>101호 47번 좌석</span>
            <span></span><span>2부</span><span>101호 47번 좌석</span>
            <span>내일</span><span>1부</span><span>101호 47번 좌석</span>
            <span></span><span>2부</span><span>101호 47번 좌석</span>
        </div>
        <div className="infoOption">
            {isSelectCancel ? 
            <>
            {
                checkboxState.map((prop, index) => {
                    return (
                        <div key={prop + index} onClick={() => clickCheckbox(index)}>
                            <Checkbox state={checkboxState[index]} />
                        </div>
                    );
                })
            }
            </>
                :
            <>
            <div><button>입실</button><button>퇴실</button></div>
            <div><button>입실</button><button>퇴실</button></div>
            <div><button>입실</button><button>퇴실</button></div>
            <div><button>입실</button><button>퇴실</button></div>
            </>
            }
        </div>
        <MyLink href="/history" border width="140px" height="30px" fontSize="13px">신청 기록 확인</MyLink>
        <button className="cancelBtn" onClick={handleCancel}>{isSelectCancel ? "취소하기" : "자리 취소"}</button>
    </div>
    <style jsx>{`
        .today{
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: 140px 50px;
            justify-items: flex-end;
            align-items: flex-end;
            width: 100%;
            max-width: 400px;
            height: 100%;
            padding: 0 5px;
        }
        .todayInfo{
            display: grid;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            width: 100%;
            height: 100%;
            align-items: center;
        }
        .infoOption{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            justify-self: center;
            height: 100%;
        }
        ${(isSelectCancel ? `
        .infoOption div{
            display: flex;
            width: 25px;
            height: 25px;
            overflow: hidden;
            cursor: pointer;
        }
        ` : `
        .infoOption div{
            display: flex;
            gap: 7px;
        }
        .infoOption button{
            width: 50px;
            height: 25px;
            border: 1px solid #ddd;
            outline: none;
            background: #fff;
            cursor: pointer;
        }
        `)}
        .cancelBtn{
            width: 100px;
            height: 30px;
            background: #fff;
            outline: none;
            border: 1px solid #ddd;
            font-size: 13px;
            justify-self: center;
        }
        @media(min-width: 480px){
            .todayInfo{
                grid-template-columns: 60px 60px 1fr;
            }
        }
        @media(max-width: 479px){
            .todayInfo{
                grid-template-columns: 50px 50px 1fr;
            }
        }
    `}</style>
    </>);
}

export default TodayInfo;
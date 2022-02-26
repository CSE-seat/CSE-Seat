import { useRecoilState } from "recoil";
import EnrollBox from "../molecules/EnrollBox";
import { enrollFriendAtom } from "../others/state";

const EnrollFriend = () => {
    const [enrollFriend, setEnrollFriend] = useRecoilState(enrollFriendAtom);
    const {isOn} = enrollFriend;

    const handleOnOff = (isOnReq) => {
        if(isOn !== isOnReq){
            const tempEnrollFriend = {...enrollFriend};
            tempEnrollFriend.isOn = isOnReq;
            setEnrollFriend(tempEnrollFriend);
        }
        // post도 해야함.
        // post랑 setEnroll이랑 같이해도 되는건가?
    }

    return (<>
    <div className="enroll">
        <div className="enrollHeader">
            <span>특정 사람만 함께 신청 허용</span>
            <div>
                <div className="on" onClick={() => handleOnOff(true)}>on</div>
                <div className="off" onClick={() => handleOnOff(false)}>off</div>
            </div>
        </div>
        <EnrollBox />
    </div>
    <style jsx>{`
        .enroll{
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 600px;
            height: 100%;
            min-height: 180px;
        }
        .enrollHeader{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 35px;
            gap: 20px;
        }
        .enrollHeader > div{
            display: flex;
            width: 80px;
            height: 25px;
        }
        .on, .off{
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            cursor: pointer;
        }
        .on{
            padding-left: 11px;
            border-radius: 15px 0 0 15px / 50% 0 0 50%;
            ${(isOn ? `
            border: 1px solid #0F5BCC;
            background: #0F5BCC;
            color: #fff;
            `: `
            border: 1px solid #ddd;
            background: #fff;
            color: #000;
            `)}
        }
        .off{
            padding-left: 5px;
            border-radius: 0 15px 15px 0 / 0 50% 50% 0;
            ${(isOn ? `
            border: 1px solid #ddd;
            background: #fff;
            color: #000;
            `: `
            border: 1px solid #0F5BCC;
            background: #0F5BCC;
            color: #fff;
            `)}
        }
        
        @media(min-width: 480px){
            .enrollHeader{
                padding: 0 15%;
            }
        }
        @media(max-width: 479px){
            .enrollHeader{
                padding: 0 20px;
            }
            
        }
    `}</style>
    </>);
}

export default EnrollFriend;
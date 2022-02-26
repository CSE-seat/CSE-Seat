import { useRecoilState } from "recoil";
import SquareImg from "../atoms/Img";
import { enrollFriendAtom } from "../others/state";

const EnrollBox = () => {
    const [enrollFriend, setEnrollFriend] = useRecoilState(enrollFriendAtom);
    const {isOn, friends} = enrollFriend;

    const deleteFriend = (sid) => {
        // enrollFriend 배열에서 sid가 같은 녀석을 없애고 새로운 배열로 만들고 싶어
        // const tempFriends = friends.filter((prop) => {
        //     return (prop !== sid);
        // });
        // setEnrollFriend(tempFriends);
    }

    const Friend = ({sid}) => {
        return (<>
            <div>
                <span>{sid}</span><button onClick={() => deleteFriend(sid)}><SquareImg src="/images/cancel_color.png" length="12px" /></button>
            </div>
            <style jsx>{`
                div{
                    display: flex;
                    justify-content: center;
                    width: 110px;
                    font-size: 14px;
                    border: solid #ccc;
                    border-width: 0 0 1px 0;
                    padding: 3px 0;
                    gap: 6px;
                }
                span{
                    height: 100%;
                }
                button{
                    display:flex;
                    justify-content: center;
                    align-items:center;
                    width: 15px;
                    height: 15px;
                    background: none;
                    outline:none;
                    border:none;
                    cursor:pointer;
                }
            `}</style>
        </>);
    }

    return (
        <>
        <div className="box">
            <form>
                <input type="text" placeholder="학번 입력" />
                <button>등록하기</button>
            </form>
            <div className="friends">
                {
                    friends.map((prop, index) =>{
                        return <Friend key={prop + index} sid={prop}/>;
                    })
                }
            </div>
        </div>
        <style jsx>{`
            .box{
                display: ${(isOn ? `flex` : `none`)};
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            form{
                display: flex;
                align-items: center;
                width: 100%;
                max-width: 380px;
                height: 50px;
                padding-left: 30px;
                margin-bottom: 15px;
                gap: 15px;
            }
            form > input{
                text-align: center;
                width: 140px;
                height: 30px;
                border: 1px solid #ddd;
                outline: none;
                font-size: 14px;
            }
            form > input::placeholder{
                font-size: 14px;
                color: #999;
            }
            form > button{
                width: 90px;
                height: 25px;
                outline: none;
                border: 1px solid #ddd;
                background: #fff;
            }
            .friends{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;
                gap: 17px;
                padding: 0 15px;
                margin-bottom: 40px;
            }
        `}</style>
        </>
    );
}

export default EnrollBox;
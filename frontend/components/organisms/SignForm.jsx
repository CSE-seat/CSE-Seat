import { useState, useRef } from "react";
import {SignInput} from "../atoms/Input";
import SquareImg from "../atoms/Img";

const SignForm = () => {

    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const fileInput = useRef();

    const changeFormState = () => {
        setIsLoginForm(!isLoginForm);
    }

    const clickFileDiv = () => {
        fileInput.current.click();
    }

    return (
        <>
            {
                isLoginForm ?
                <form className="signForm">
                    <SignInput src="/images/user.png"
                        radius="5px"/>
                    <SignInput src="/images/lock.png"
                        type="password"
                        placeholder="비밀번호" />
                    <button className="formBtn">로그인</button>
                    <div className="changeBtn" onClick={changeFormState}>회원가입</div>
                </form>
                : 
                <form className="signForm">
                    <div className="fileDiv" onClick={clickFileDiv}>
                        <SquareImg src="/images/user.png"
                        radius="5px" length="20px"/>
                        <label for="inputFile">모바일 학생증 업로드</label>
                        <span className="fileUpload">✅</span>
                    </div>
                    <input type="file" id="inputFile" 
                    accept="image/*"
                    ref={fileInput}
                    onChange={
                        () => {
                            setIsFileUpload(true);
                        }
                    } />
                    <SignInput src="/images/lock.png"
                        type="password"
                        value
                        placeholder="비밀번호" />
                    <SignInput src="/images/lock.png"
                        type="password"
                        placeholder="비밀번호 확인" />
                    {/* <span className="samePassword">✅</span> */}
                    <button className="formBtn">회원가입</button>    
                    <div className="changeBtn" onClick={changeFormState}>로그인</div>
                </form>
            }
            <style jsx>{`
                .signForm{
                    display:flex;
                    position:relative;
                    align-items:center;
                    flex-direction:column;
                    width:400px;
                    height:${(isLoginForm? "250px" : "300px")};
                    border:solid;
                    border-color:#ddd;
                    border-width:1px;
                    gap: 5px;
                    padding: 20px;
                }
                #inputFile{
                    display:none;
                }
                .fileDiv{
                    display:flex;
                    width: 300px;
                    height: 50px;
                    align-items:center;
                    border:solid;
                    border-color:#ddd;
                    border-width:1px;
                    padding-left: 12px;
                    gap: 14px;
                }
                .fileDiv label{
                    font-size: 14px;
                }
                .fileUpload{
                    ${(isFileUpload ? "display: flex;" : "display: none;")}
                }
                .formBtn{
                    width: 300px;
                    height: 40px;
                    border:none;
                    outline:none;
                    background: #5C9EFF;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 550;
                    letter-spacing: 3px;
                    margin: 10px 0;
                }
                .changeBtn{
                    position: absolute;
                    bottom:20px;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}

export default SignForm;
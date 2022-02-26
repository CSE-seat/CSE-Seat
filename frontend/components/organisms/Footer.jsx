import { Div } from "../atoms/Div";
import SquareImg from "../atoms/Img";

const Footer = () => {

    return (
        <>
        <div className="footerDiv">
            <Div width="100%" height="40px">
                <div className="footerTitle"><span className="title">CSE Seat</span></div>
            </Div>
            <div className="footerSubDiv">
                <Div width="200px" height="25px" jusContent="left" gap="10px">
                    <span>CSE : </span>
                    <a href="https://www.instagram.com/knu_cse/"><SquareImg src="/images/instagram.png" length="30px" /></a>
                </Div>
                <Div width="200px" height="25px" jusContent="left">
                    <span>Contact : pove2019@gmail.com</span>
                </Div>
            </div>
            <div className="footerSubDiv">
                <Div width="200px" height="25px" jusContent="left" gap="10px">
                    <span>Developers : </span>
                    <Div width="25px" height="25px" hidden>
                        <a href="https://www.instagram.com/yoonlang__/"><SquareImg src="/images/instagram.png" length="30px" /></a>
                    </Div>
                    <Div width="25px" height="25px" hidden>
                        <a href="https://www.instagram.com/cold__rainnn/"><SquareImg src="/images/instagram_color.png" length="30px" /></a>
                    </Div>
                </Div>
                <Div width="200px" height="25px" jusContent="left" gap="10px">
                    <span className="github">Github : </span>
                    <a href="https://github.com/Yoonlang"><SquareImg src="/images/github.png" length="25px" invert/></a>
                    <a href="https://github.com/chanwooDev"><SquareImg src="/images/github_color.png" length="25px"/></a>
                </Div>
            </div>
        </div>
        <style jsx>{`
            span{
                color: #fff;
                font-size: 12px;
            }
            .github{
                margin-left: 24px;
            }
            .title{
                margin-top: 10px;
                font-size: 14px;
            }
            .footerDiv{
                display:flex;
                width: 100%;
                justify-content: center;
                align-items: center;
                background: #373737;
            }
            .footerTitle{
                display:flex;
                width: 200px;
            }
            .footerSubDiv{
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 80ox;
                gap: 12px;
            }
            @media(min-width: 480px){
                .footerDiv{
                    height: 150px;
                    flex-wrap: wrap;
                }
                .footerTitle{
                    justify-content: center;
                }
                .footerSubDiv{
                    width: 50%;
                }
            }
            @media(max-width: 479px){
                .footerDiv{
                    height: 220px;
                    flex-direction: column;
                    gap: 10px;
                }
                .footerSubDiv{
                    width: 100%;
                }
            }
        `}</style>
        </>
    );
}

export default Footer;
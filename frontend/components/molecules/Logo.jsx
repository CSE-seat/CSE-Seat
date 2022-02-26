import {MyLink} from "../atoms/Div";

const Logo = () => {
    return (
        <MyLink href="/" passHref={true} width="180px" height="50%">
            <img className="logoImg" src="/images/cse.png"/>
            <span>CSE Seat</span>
            <style jsx>{`
                span{
                    margin-left: 10px;
                    font-size: 22px;
                    white-space: nowrap;
                }
                @media(min-width: 768px){
                    .logoImg{
                        width: 45px;
                        height: 45px;
                    }    
                }
                @media(max-width: 767px){
                    span{
                        display:none;
                    }
                    .logoImg{
                        width: 35px;
                        height: 35px;
                    }    
                }
            `}</style>
        </MyLink>
    );
}

export default Logo;
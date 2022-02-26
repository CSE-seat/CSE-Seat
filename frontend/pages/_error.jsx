import { PageDiv } from "../components/atoms/Div";

const Error = () => {
    return(
        <PageDiv>
            <div>
                잘못된 페이지입니다.
            </div>
            <style jsx>{`
                div{
                    width: 100%;
                    height: 100%;
                    background: #ddd;
                }
            `}</style>
        </PageDiv>
    );
}

export default Error;
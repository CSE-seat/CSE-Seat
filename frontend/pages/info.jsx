import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import BasicInfo from "../components/organisms/BasicInfo";
import TodayInfo from "../components/organisms/TodayInfo";
import EnrollFriend from "../components/organisms/EnrollFriend";

const InfoDiv = styled(BorderDiv)`
    max-width: 672px;
`;

const Info = () => {
    return (
        <PageDiv dis="flex" jus="center">
            <HeadTitle title="info"/>
            <InfoDiv>
                <BasicInfo />
                <div className="bar"></div>
                <TodayInfo />
                <div className="bar"></div>
                <EnrollFriend />
            </InfoDiv>
            <style jsx>{`
                .bar{
                    height: 0;
                    box-shadow: 0 0 0 0.8px #ddd;
                    margin: 25px 0;
                }
                @media(min-width: 768px){
                    .bar{
                        width: 90%;
                    }
                }
                @media(max-width: 767px){
                    .bar{
                        width: 100%;
                    }
                }
            `}</style>
        </PageDiv>
    )
}

export default Info;
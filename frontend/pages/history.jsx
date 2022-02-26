import { BorderDiv, PageDiv } from "../components/atoms/Div";
import HeadTitle from "../components/others/headTitle"
import styled from "styled-components";
import { useEffect } from "react";
import SeatHistory from "../components/organisms/SeatHistory";

const HistoryDiv = styled(BorderDiv)`
    max-width: 723px;
`;

const History = () => {

    useEffect(() => {
        // fetch user data
        // user data를 atom으로 받아오는게 더 낫지 않을까?
        // History에 넣어두면 메인페이지에서 입/퇴실 누를 때 곤란할거같은데
        // 지금은 UI 설계만 하고 나중에 테스트 해보자.
    }, [])

    return (
        <PageDiv dis="flex" ali="center" dir="column">
            <HeadTitle title="history"/>
            <HistoryDiv>
                <div className="title">입퇴실 / 신청 기록 열람</div>
                <div className="seatHistorys">
                    <SeatHistory />
                    <SeatHistory />
                    <SeatHistory />
                </div>
            </HistoryDiv>
            <style jsx>{`
                .title{
                    padding: 6% 0 30px 4%;
                    width: 100%;
                    height: 100%;
                    font-size: 22px;
                }
                .seatHistorys{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </PageDiv>
    )
}

export default History;
import {Seat} from "../atoms/Seat";

const Explain = () => {
    return (
        <>
        <div>
            <Seat length="80px" dist="35" />
            <span className="sp">1부(왼): 06:00 ~ 18:00</span>
            <span>2부(오): 18:00 ~ 06:00</span>
        </div>
        <style jsx>{`
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .sp{
                margin-bottom: 3px;
            }
        `}</style>
        </>
    );

}

export default Explain; 
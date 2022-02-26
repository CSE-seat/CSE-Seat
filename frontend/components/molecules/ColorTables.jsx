
const ColorTable = ({children, color}) => {
    return (
        <>
            <div className="colorTable">
                <div></div>
                <span>{children}</span>
            </div>
            <style jsx>{`
                .colorTable{
                    display: flex;
                    width: 100%;
                    height: 25%;
                }
                .colorTable div{
                    width: 20px;
                    height: 20px;
                    background: ${(color)};
                    border: solid;
                    border-width: 1px;
                    margin-right: 8px;
                }
            `}</style>
        </>
    );
}

const ColorTables = () => {
    return (
        <>
            <div className="colorTables">
                <ColorTable color="white">예약 가능</ColorTable>
                <ColorTable color="#969696">예약 불가능</ColorTable>
                <ColorTable color="#0F5BCC">본인 자리</ColorTable>
                <ColorTable color="#007435">친구 자리</ColorTable>
            </div>        
            <style jsx>{`
                .colorTables{
                    display:flex;
                    flex-direction: column;
                    width:120px;
                    height: 100px;
                }
            `}</style>
        </>
    );    

}

export default ColorTables;
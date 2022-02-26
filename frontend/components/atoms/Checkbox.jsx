import { useEffect, useRef } from "react";

const Checkbox = ({state = 0}) => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;

        const makeMore = (state) => {
            if(state === 1){
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(44, 10);
                ctx.lineTo(18, 38);
                ctx.lineTo(6, 26);
                ctx.stroke();
            }
            else if(state === 2){
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(0, 50);
                ctx.lineTo(50, 0);
                ctx.strokeStyle = `#cdcdcd`;
                ctx.stroke();
            }
        }
        ctx.scale(1, 1);

        ctx.clearRect(0, 0, 50, 50);
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(50, 50);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 0);
        ctx.strokeStyle =  state === 1 ? `#0F5BCC` : `#ccc`;
        ctx.stroke();

        makeMore(state);
    })

    return (
        <>
        <canvas ref={canvasRef} width="1920" height="1080"></canvas>
        <style jsx>{`
            canvas{
                width: 25px;
                height: 25px;
            }
        `}</style>
        </>
    );

}

export default Checkbox;
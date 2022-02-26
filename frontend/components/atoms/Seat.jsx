import {useRef, useEffect} from 'react';

const seatColor = ['#ffffff', '#969696', '#0F5BCC', '#007435', '#5C9DFF', '#D60505'];

const Seat = ({length = "50px", left = 0, right = 0, dist = 0, width = 26, isColor = false}) => {
    const canvasRef = useRef();
    const leng = length.slice(0, length.match("px").index);

    useEffect(() => {
        if(!isColor){
            left = seatColor[left];
            right = seatColor[right];
        }
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;
        const hX = canvas.width / 2;
        const dis = Number(dist);
        const hW = width / 2;

        const fillLeft = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(hX - dist, 300 + hW);
            ctx.moveTo(hX - dist, 451 - hW);
            ctx.lineTo(63 - dist, 451 - hW);
            ctx.bezierCurveTo(50 + hW - dist, 350 + hW, 50 - dist, 300 + 10, hX - dist, 300 + hW);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(hX - dist, 140, 67, Math.PI * 0.5, Math.PI * 1.5);
            ctx.fill();
        }

        const fillRight = (color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(hX + dis, 300 + hW);
            ctx.bezierCurveTo(450 + dis, 310, 450 - hW + dis, 367, 451 - hW + dis, 451 - hW);
            ctx.lineTo(hX + dis, 451 - hW);
            ctx.moveTo(hX + dis, 300 + hW)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(hX + dis, 140, 67, Math.PI * 1.5, Math.PI * 0.5);
            ctx.fill();
        }

        ctx.scale(0.5, 0.5);

        ctx.lineWidth = width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        ctx.beginPath();
        ctx.arc(hX - dis, 140, 79, Math.PI * 0.5, Math.PI * 1.5);
        ctx.lineTo(hX - dis, 138 + 80 + hW);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hX + dis, 140, 79, Math.PI * 1.5, Math.PI * 2.5);
        ctx.lineTo(hX + dis, 142 - 80 - hW);
        ctx.stroke();

        ctx.beginPath();
        dist === 0 ? ctx.moveTo(hX - dis, 300) : ctx.moveTo(hX - dis, 300 - hW);
        dist === 0 ? ctx.moveTo(hX - dis, 450) : ctx.lineTo(hX - dis, 450);
        ctx.lineTo(50 - dis, 450);
        ctx.bezierCurveTo(50 - dis, 350, 50 - dis, 300, hX - dis, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(hX + dis, 300);
        ctx.bezierCurveTo(450 + dis, 300, 450 + dis, 350, 450 + dis, 450);
        ctx.lineTo(hX + dis, 450);
        dist === 0 ? ctx.moveTo(hX + dis, 300) : ctx.lineTo(hX + dis, 300 - hW);
        ctx.stroke();
        
        fillLeft(left);
        fillRight(right);

    })

    return (
        <>
        <div className="canvasDiv">
            <canvas ref={canvasRef} width="1920" height="1080"></canvas>
        </div>
        <style jsx>{`
                .canvasDiv{
                    display: flex;
                    width: ${(leng)}px;
                    height: ${(leng)}px;
                    overflow: hidden;
                }
                canvas{
                    width:${(leng * 2)}px;
                    height:${(leng * 2)}px;
                }
            `}</style>
        </>
        
    );
}

export {Seat, seatColor};
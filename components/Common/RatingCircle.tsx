'use client'

import { useEffect, useRef } from "react"
import {Kanit} from 'next/font/google'


const kanit = Kanit({ weight:'500', subsets:['latin'] })


export default function RatingCircle({rating}:{rating:number}) {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            const canvas:HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d');  
            if (context) {
                context.beginPath();
                context.arc(20, 20, 17.5,  0, Math.PI*2 );
                context.strokeStyle="#4C5454";
                context.lineWidth=2;
                context.stroke()
                context.beginPath();
                context.arc(20, 20, 17.5, -Math.PI/2, Math.PI * rating / 5 - Math.PI/2 );
                if (rating<4) {
                    context.strokeStyle = "#FF261C";
                }
                else if (rating < 7 )
                {
                    context.strokeStyle = "#FFD366";
                }
                else{
                    context.strokeStyle="rgb(20,184,166)";
                }
                context.stroke();

            }
    
        } 
    },[rating])  

    return (
    <div className="w-10 h-10 bg-teal-950 rounded-full flex items-center justify-center text-white">
        <div className="absolute">
            <canvas ref={canvasRef} width={40} height={40}/>
        </div>
        <div className={kanit.className}>
            {rating}<span className="text-[6px]">/10</span>
        </div>
    </div>
  )
}

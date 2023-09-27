'use client'

import { useEffect, useRef } from "react"
import {Kanit} from 'next/font/google'


const kanit = Kanit({ weight:'500', subsets:['latin'] })


export default function RatingCircleHQ({rating}:{rating:number}) {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');  
            if (context) {
                context.beginPath();
                context.arc(50, 50, 46,  0, Math.PI*2 );
                context.strokeStyle="#4C5454";
                context.lineWidth=4;
                context.stroke()
                context.beginPath();
                context.arc(50, 50, 46, -Math.PI/2, Math.PI * rating / 5 - Math.PI/2 );
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
    },[])  

    return (
    <div className="w-[100px] h-[100px] bg-teal-950 rounded-full flex items-center justify-center text-white text-4xl">
        <div className="absolute">
            <canvas ref={canvasRef} width={100} height={100}/>
        </div>
        <div className={kanit.className + ' pt-2'}>
            {rating}<span className="text-[10px]">/10</span>
        </div>
    </div>
  )
}

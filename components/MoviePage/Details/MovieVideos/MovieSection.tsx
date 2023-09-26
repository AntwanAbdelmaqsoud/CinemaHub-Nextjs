'use client'

import { MovieVideoResponse } from "@/model/Response"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { useState } from "react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

export default function MovieSection({data}:{data:MovieVideoResponse}) {
    function nextCarouselItem(){
        setCarouselIndex((prev:number) => prev==0?Math.min(10, data.results.length-1):prev-1);
    }

    const [carouselIndex, setCarouselIndex] = useState(0);



    const MovieVideos = data.results.slice(0,Math.min(10, data.results.length)).map((item)=>{
        if(item.site=="YouTube"){
            return (
                <div className="aspect-[16/9] h-[180px] md:h-[400px]"> 
                    <LiteYouTubeEmbed id={item.key} title={item.name}/>
                </div>
            )
        }
    })
  return (
    <div className="relative w-full h-full overflow-hidden md:overflow-auto">
        <div className="md:hidden flex items-center justify-center absolute left-0 top-[80px] z-10 bg-slate-500 rounded-md w-10 h-10 cursor-pointer hover:bg-slate-600 transition-all" onClick={()=>nextCarouselItem()}>
            <FaCaretLeft size={35}/>
        </div>
        <div className="md:hidden flex items-center justify-center absolute right-0 top-[80px] z-10 bg-slate-500 rounded-md w-10 h-10 cursor-pointer hover:bg-slate-600 transition-all" onClick={()=>setCarouselIndex((prev:number) => prev==Math.min(10, data.results.length-1)?0:prev+1)}>
            <FaCaretRight size={35}/>
        </div>
        <div className="hidden items-baseline w-full h-full p-2 flex-shrink-0 transition-all md:flex">
            {MovieVideos.length?MovieVideos:<h1 className="p-2 font-semibold opacity-80">No videos available for this movie yet</h1>}
        </div>
        <div className="flex items-baseline w-full h-full p-2 flex-shrink-0 transition-all md:hidden" style={{transform: `translateX(-${carouselIndex*323}px)`}}>
            {MovieVideos.length?MovieVideos:<h1 className="p-2 font-semibold opacity-80">No videos available for this movie yet</h1>}
        </div>
    </div>
  )
}

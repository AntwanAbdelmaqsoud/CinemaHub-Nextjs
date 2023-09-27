'use client'

import { useState, useEffect} from 'react'
import CarouselItem from './CarouselItem'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { StandardResponse } from '@/model/Response';
import CardsCarousel from './HeroCards';

export default function HeroCarousel({data}:{data:StandardResponse}) {
    function nextCarouselItem(){
        setCarouselIndex((prev:number) => prev==0?4:prev-1);
    }

    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(()=>{
        const autoSlide  = setInterval(nextCarouselItem, 6000);
        return ()=>clearInterval(autoSlide)
    },[carouselIndex])

    const CarouselItems = data.results.slice(0,5).map((item)=>(
        <CarouselItem key={item.backdrop_path} mediaType={item.media_type} name={item.name} id={item.id} genres={item.genre_ids} src={item.backdrop_path} overview={item.overview} title={item.title} vote_average={item.vote_average}/>))
return (
    <>
    <div id="viewArea" className="container mx-auto relative bg-black aspect-video max-h-[300px] lg:max-h-[400px] overflow-hidden rounded-lg md:rounded-xl mt-3">
        <div className="absolute bottom-0 right-0 z-20 flex-col flex gap-2 m-2 text-white">
            <div className="bg-slate-500 rounded-md cursor-pointer hover:bg-slate-600 transition-all" onClick={()=>setCarouselIndex((prev:number) => prev==0?4:prev-1)}>
                <FaCaretLeft size={35}/>
            </div>
            <div className="bg-slate-500 rounded-md cursor-pointer hover:bg-slate-600 transition-all" onClick={()=>setCarouselIndex((prev:number) => prev==4?0:prev+1)}>
                <FaCaretRight size={35}/>
            </div>
        </div>
        <div id="movingDiv" className="h-full w-full flex transition-all duration-300 bg-black" style={{transform: `translateX(-${carouselIndex*100}%)`}}>
            {CarouselItems}
        </div>
    </div>
    <CardsCarousel data={data}/>
    </>
  )
}



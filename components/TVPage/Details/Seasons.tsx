'use client'
import posterBlank from '@/public/posterBlank.png'
import { TvDetailsResponse} from "@/model/Response";
import Image from "next/image";
import { Roboto } from "next/font/google";
import {useState} from 'react';

const roboto = Roboto({ weight:'400', subsets:['latin'] })  


function formatDate(dateString:string) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' } as const;
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Extract the day from the formatted date
    const day = parseInt(formattedDate.replace(/\D/g, ''), 10);
  
    // Determine the suffix for the day
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    } else {
      daySuffix = 'th';
    }
  
    // Format the final date string
    const finalDateString = formattedDate.replace(/\d+/g, '') + ' ' + day + daySuffix + ' ' + date.getFullYear();
    return finalDateString;
  }



function OverView({overview}:{overview:string}){
  const [readMore, setReadMore] = useState<boolean>(true);
  return(
    <>
    <h1 className="font-bold text-xs md:text-base">Overview:</h1>
    <p className={roboto.className + " text-xs md:text-base transition-all opacity-90 font-light"}>{readMore?overview.slice(0,50)+'...':overview}
      <button className="p-1 opacity-80 font-medium rounded text-xs md:text-base" onClick={()=>setReadMore((prev)=>!prev)}>{readMore?'Show more':'Show less'}</button>
    </p>
    </>
  )
}


export default function Seasons({data}:{data:TvDetailsResponse}) {
    const [showMoreSeasons, setShowMoreSeasons] = useState<boolean>(false);
    let Seasons;
    if (data.seasons.length){
      Seasons = data.seasons.map((item)=>(
        <div className="max-w-[600px] w-full my-2 shrink-0 flex items-center">
            <div className="aspect-[2/3] w-20 md:w-28 lg:w-36 rounded-md overflow-hidden shrink-0 relative">
                <Image src={item.poster_path?`https://www.themoviedb.org/t/p/original${item.poster_path}`:posterBlank} alt={item.name} width={200} height={300} className="object-cover"/>
                <div className="font-semibold text-xs md:text-base flex items-center justify-center w-6 h-6 md:w-10 md:h-10 bg-teal-400 dark:bg-teal-700 bottom-0 right-0 absolute">#{item.episode_count}</div>
            </div>
            <div className="flex flex-col items-baseline p-2">
                <div className="font-bold text-xs md:text-base">{item.name}<h1 className="opacity-90 font-normal">{item.air_date?formatDate(item.air_date):'NA'}</h1></div>
                {item.overview&&
                  <OverView overview={item.overview}/>
                }
            </div>
        </div>
    ))
  }


  return (
    <div className="dark:bg-slate-800/90 bg-slate-100 xs:bg-none">
      <div className="container mx-auto py-2">
          <h1 className="m-2 font-bold text-lg md:text-3xl ">Seasons</h1>
          <div className="flex flex-wrap items-baseline gap-4 overflow-x-auto flex-shrink-0 p-2">
              {Seasons &&
              Seasons.length>5?
              <>
                {Seasons.slice(0,5)}
                {showMoreSeasons && Seasons.slice(5,Seasons.length)}
                <button className="dark:bg-slate-600 bg-slate-300 p-2 font-semibold rounded" onClick={()=>setShowMoreSeasons((prev)=>!prev)}> {showMoreSeasons?'Show Less':'Show More'}</button>
              </>
              :
              Seasons
            }
          </div>
      </div>
    </div>
  )
}

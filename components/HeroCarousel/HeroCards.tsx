import Image from "next/image"
import Link from "next/link"
import { StandardResponse } from "@/model/Response"
import {FaTv} from 'react-icons/fa'
import {RiMovie2Line} from 'react-icons/ri'

function HeroCards({title, poster_path, index,id, type}:{type:string, id:number,index:number, title:string,  poster_path:string}) {
  return (
    <Link href={`/${type}/${id}`}>
        <div className="flex flex-col shrink-0 w-40 mx-2 rounded-lg overflow-hidden my-2 hover:opacity-75 transition-opacity duration-300">
            <div className="w-full relative">
                <div className="absolute top-0 left-0 w-9 h-9 dark:bg-teal-700 bg-teal-300 flex items-center gap-0.5 justify-center font-black text-lg opacity-90"><h1>{index+1}</h1>{type=='tv'? <FaTv/>: <RiMovie2Line/>}</div>
                <Image alt={title} src={`https://www.themoviedb.org/t/p/w200${poster_path}`} width={200} height={300} className="object-cover"/>
            </div>
            <h1 className="font-semibold mt-0.5">{title}</h1>
        </div>
    </Link>
  )
}

export default function CardsCarousel({data}:{data:StandardResponse}){
    return(
        <div className="dark:bg-slate-800/80 bg-slate-300 p-2 mt-8">
    <div className=" flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Trending</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
    <div className="container mx-auto overflow-auto flex mt-4 ">
        {data.results.slice(0,10).map((item, index)=>(
            <HeroCards id={item.id} type={item.media_type} title={item.title || item.name} poster_path={item.poster_path} index={index}/>
        ))}
    </div>
    </div>)
}

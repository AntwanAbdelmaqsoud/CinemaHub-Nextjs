'use client'

import {useState, useEffect} from 'react';
import {FaTv} from 'react-icons/fa';
import {RiMovie2Line} from 'react-icons/ri'
import { StandardResponse } from '@/model/Response';
import Image from 'next/image';
import Link from 'next/link';
import RatingCircle from '@/components/RatingCircle';
import Pagination from '@/components/Discover/Pagination';
import posterBlank from '@/public/posterBlank.png'

function DiscoverCards({title, poster_path,id, mediaType, rating} : {rating:number,mediaType:string, id:number, title:string,  poster_path:string}) {
  return (
    <Link href={`/${mediaType}/${id}`}>
        <div className="flex flex-col shrink-0 w-32 md:w-40 lg:w-60 xl:w-[19rem] 2xl:w-64 rounded-lg my-2 hover:opacity-75 transition-opacity duration-300">
            <div className="w-full relative">
                <div className="absolute rounded-tl-md top-0 left-0 w-9 h-9 dark:bg-teal-700 bg-teal-300 flex items-center gap-0.5 justify-center font-black text-lg opacity-90">{mediaType==="tv"? <FaTv/>: <RiMovie2Line/>}</div>
                <div className="absolute -bottom-2 -right-2"><RatingCircle rating={Math.round(rating*10)/10}/></div>
                <Image alt={title} src={poster_path?`https://www.themoviedb.org/t/p/w342${poster_path}`:posterBlank} width={200} height={300} className="object-cover w-full aspect-[2/3] rounded-t-md"/>
            </div>
            <h1 className="font-semibold mt-0.5 w-full break-words text-center">{title}</h1>
        </div>
    </Link>
  )
}

export default function page() {
    const [selectedMediaType, setSelectedMediaType] = useState<'movie'|'tv'>('movie');
    const [data, setData] = useState<null|StandardResponse>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(()=>{
        async function fetchDiscoverData(){
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGE1M2VlNzc4OTFjZDEyOTE4NDQ0ZTU5Y2MzMTYzNSIsInN1YiI6IjY1MDNmMzExNjNhYWQyMDBlMTJkMDBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NTn6VJvdhgOv_UyuFDZpt6_DO6sjhQY127HtGPmlBFc'
            }
          };
          const res = await fetch(`https://api.themoviedb.org/3/search/${selectedMediaType}?query=${searchQuery}&language=en-US&page=${pageNumber}`, options)
          const data  = await res.json();
          setData(data);
        }
        fetchDiscoverData()
    },[selectedMediaType, pageNumber, searchQuery])

    useEffect(()=>{
      setPageNumber(1);
    },[searchQuery, selectedMediaType])

  return (
    <div className="container mx-auto py-5">
        {/* Title */}
        <div className="flex items-center w-full">
          <span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span><h1 className="text-4xl font-bold font-mono mx-3">SEARCH</h1><span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span>
        </div>
        {/* Discover buttons */}
        <div className=" w-full flex flex-col gap-2 font-semibold mb-6 px-2">
                <div className="w-full flex justify-around items-center p-2 rounded-md border dark:border-slate-700"> <button className={selectedMediaType=='tv'?'text-teal-600 transition-all':'transition-all'} onClick={()=>setSelectedMediaType('tv')}><FaTv size='20'/></button> <button className={selectedMediaType=='tv'?'transition-all':'text-teal-600 transition-all'} onClick={()=>setSelectedMediaType('movie')}><RiMovie2Line size='20'/></button> </div>
                <input onChange={(ev)=>setSearchQuery(ev.target.value)} type="text" placeholder={`Search for ${selectedMediaType=='tv'?'tv series':'movies'} by their titles.`} className="indent-1 md:indent-2 w-full rounded-md border dark:border-slate-700 p-2"/>
        </div>
        {/* Pagination */}
        {data && data.results.length>0 &&
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={Math.min(data.total_pages,100)}/>
        }
        {/* Content */}
        <div className="w-full flex gap-2 flex-wrap justify-around">
          {data && data.results.length>0 ? data.results.map(item=>(
            <DiscoverCards rating={item.vote_average} id={item.id} poster_path={item.poster_path} title={item.name || item.title} mediaType={selectedMediaType}/>
          )):
          <div className="my-96"></div>
          }    
        </div>
        {/* Pagination */}
        {data && data.results.length>0 &&
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={Math.min(data.total_pages,100)}/>
        }        
    </div>
  )
}


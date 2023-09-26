'use client'

import { MovieGenres, SeriesGenres } from '@/components/utils/Genres';
import {useState, useEffect, useRef} from 'react';
import {FaTags,FaSort,FaUndo,FaTv, FaWindowClose } from 'react-icons/fa';
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
    const sortDropDownMenu = useRef<null|HTMLDivElement>(null);
    const genresSelectionMenu = useRef<null|HTMLDivElement>(null);
    const [selectedMediaType, setSelectedMediaType] = useState<'movie'|'tv'>('movie');
    const [openSort, setOpenSort] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('popularity.desc');
    const [openGenres, setOpenGenres] = useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [broadGenres, setBroadGenres] = useState<boolean>(false);
    const [data, setData] = useState<null|StandardResponse>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(()=>{
        async function fetchDiscoverData(){
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGE1M2VlNzc4OTFjZDEyOTE4NDQ0ZTU5Y2MzMTYzNSIsInN1YiI6IjY1MDNmMzExNjNhYWQyMDBlMTJkMDBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NTn6VJvdhgOv_UyuFDZpt6_DO6sjhQY127HtGPmlBFc'
            }
          };
          const res = await fetch(`https://api.themoviedb.org/3/discover/${selectedMediaType}?include_video=false&language=en-US&page=${pageNumber}&sort_by=${sortBy}&with_genres=${selectedGenres.map(id=>{if(broadGenres) {return id+'%2C'} else{return id+'%7C'}})}`, options)
          const data  = await res.json();
          setData(data);
          
        }
        fetchDiscoverData()
    },[selectedGenres, sortBy, selectedMediaType, pageNumber])
    useEffect(()=>{
      setPageNumber(1);
    },[selectedGenres, sortBy, selectedMediaType])
    useEffect(() => {

      function handleClickOutside(event) {
        if (sortDropDownMenu.current && !sortDropDownMenu.current.contains(event.target)) {
          setOpenSort(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [sortDropDownMenu, setOpenSort]);
    useEffect(() => {
      function handleClickOutside(event) {
        if (genresSelectionMenu.current && !genresSelectionMenu.current.contains(event.target)) {
          setOpenGenres(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [genresSelectionMenu, setOpenGenres]);


  return (
    <div className="container mx-auto py-5">
        {/* Title */}
        <div className="flex items-center w-full">
          <span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span><h1 className="text-4xl font-bold font-mono mx-3">DISCOVER</h1><span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span>
        </div>
        {/* Discover buttons */}
        <div className="[&>button]:border [&>button]:rounded-md [&>div]:rounded-md [&>button]:dark:border-slate-700 [&>div]:border [&>div]:dark:border-slate-700 w-full flex gap-2 font-semibold mb-6 px-2">
                <div className="w-1/4 flex justify-around items-center p-2"> <button className={selectedMediaType=='tv'?'text-teal-600 transition-all':'transition-all'} onClick={()=>{setSelectedMediaType('tv'); setSelectedGenres([])}}><FaTv size='20'/></button> <button className={selectedMediaType=='tv'?'transition-all':'text-teal-600 transition-all'} onClick={()=>{setSelectedMediaType('movie'); setSelectedGenres([])}}><RiMovie2Line size='20'/></button> </div>
                <div ref={sortDropDownMenu} className="cursor-pointer w-1/4 relative flex items-center justify-center gap-1 p-1 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>setOpenSort(prev=>!prev)}>
                   <FaSort/> <span className="hidden xs:block">Sort</span>
                    <div className={`overflow-hidden absolute top-full left-0 w-full flex flex-col dark:bg-[#1f1f1f] bg-white text-[11px] xs:text-base z-10 transition-all duration-500 ${openSort?"max-h-[600px]":"max-h-0"}`}> 
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('popularity.desc')}}>Popularity Descending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('popularity.asc')}}>Popularity Ascending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('revenue.desc')}}>Revenue Descending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('revenue.desc')}}>Revenue Ascending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('primary_release_date.desc')}}>Release Date Descending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('primary_release_date.asc')}}>Release Date Ascending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('vote_average.desc')}}>Rating Descending</button>
                      <button className="w-full flex items-center justify-center gap-1 p-2 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setOpenSort(true); setSortBy('vote_average.asc')}}>Rating Ascending</button>
                    </div>
                </div>
                <div className=" w-1/4 flex items-center " > 
                  <div className="cursor-pointer flex items-center justify-center gap-1 p-1 transition-all hover:bg-teal-200 dark:hover:bg-teal-950 w-full h-full" onClick={()=>setOpenGenres(true)}><FaTags/> <span className="hidden xs:block">Genres</span></div>
                  
                  <div className={`top-0 left-0 ${openGenres?' opacity-100 z-10':'opacity-0 -z-10'} h-full w-full transition-all duration-300 bg-black/70 fixed flex items-center justify-center overflow-hidden`}>
                    <div ref={genresSelectionMenu} className="max-w-xl bg-white dark:bg-[#121212] rounded-lg p-4">
                        <div className="flex items-center justify-center relative border-b pb-2">
                          <div className="absolute top-2 left-0 hover:cursor-pointer hover:opacity-90 transition-all" onClick={()=>setOpenGenres(false)}>
                            <FaWindowClose size={24}/>
                          </div>
                          <h1 className="text-3xl">Genres</h1>
                        </div>
                        <div className="flex justify-between my-4">
                          <div>
                            <h1 className="text-xl"> Broad Matches </h1>
                            <p className="opacity-90 font-light">
                              More results, but less accurate. {selectedMediaType=='tv'?'TV series ': 'Movies '} will match if they contain any selected genre rather than all selected genres.
                            </p>
                          </div>
                          <div className="flex items-center p-2">
                            <div className="w-10 h-2 bg-gray-500 rounded-xl relative"  onClick={()=>setBroadGenres(prev=>!prev)}>
                              <div className={`absolute ${broadGenres?'left-7 bg-teal-400':'-left-2 bg-slate-700'} -top-[6px] w-5 h-5 rounded-full  cursor-pointer hover:opacity-90 transition-all duration-200`}>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-2">
                          <h1 className="text-xl"> include Tags </h1>
                          <p className="opacity-90 font-light">
                            Find {selectedMediaType=='tv'?'TV series ': 'Movies '} that have {broadGenres?'any of ': 'all '}selected genres below.
                          </p>
                        </div>
                        <div className="flex gap-2 w-full h-full flex-wrap my-4">
                          {
                            selectedMediaType=='tv'?
                            SeriesGenres.map(item=>(
                              <button onClick={()=>{selectedGenres.includes(item.id)?setSelectedGenres(selectedGenres.filter(id=>id!=item.id)):setSelectedGenres(prev=>[...prev,item.id])}} className={`rounded-xl border dark:border-[0.1px] transition-all duration-300 p-1 font-semibold ${selectedGenres.includes(item.id)?"bg-teal-600 text-white":''}`}>
                                {item.name}
                              </button>
                            ))
                            :
                            MovieGenres.map(item=>(
                              <button onClick={()=>{selectedGenres.includes(item.id)?setSelectedGenres(selectedGenres.filter(id=>id!=item.id)):setSelectedGenres(prev=>[...prev,item.id])}} className={`rounded-xl border dark:border-[0.1px] transition-all duration-300 p-1 font-semibold ${selectedGenres.includes(item.id)?"bg-teal-600 text-white":''}`}>
                                {item.name}
                              </button>
                            ))
                          }
                        </div>
                    </div>
                  </div>
                </div>
                <button className="w-1/4 flex items-center justify-center gap-1 p-1 transition-all hover:bg-teal-200 dark:hover:bg-teal-950" onClick={()=>{setSelectedGenres([]); setSelectedMediaType('movie'); setSortBy('popularity.desc')}}> <FaUndo/> <span className="hidden xs:block">Reset</span> </button>
        </div>
        {/* Pagination */}
        {data && 
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={Math.min(data.total_pages,100)}/>
        }
        {/* Content */}
        <div className="w-full flex gap-2 flex-wrap justify-around">
          {data&& data.results.map(item=>(
            <DiscoverCards rating={item.vote_average} id={item.id} poster_path={item.poster_path} title={item.name || item.title} mediaType={selectedMediaType}/>
          ))}    
        </div>
        {/* Pagination */}
        {data && 
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={Math.min(data.total_pages,100)}/>
        }        
    </div>
  )
}

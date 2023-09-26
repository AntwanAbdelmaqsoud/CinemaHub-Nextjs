'use client'

import Image from 'next/image';
import nextlogo from '../../public/next.svg';
import {FaSearch, FaMoon, FaSun, FaCompass, FaHome} from 'react-icons/fa';
import {GiPerspectiveDiceSixFacesRandom} from 'react-icons/gi';
import MenuHamburger from '@/components/MenuHamburger/MenuHamburger';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { StandardResponse } from '@/model/Response';

export default function TopNavbar(){
    const {theme, setTheme} = useTheme();
    const [openMenu, setOpenMenu] = useState(false);
    const [randomResultData, setRandomResultData] = useState<StandardResponse|null>(null);
    const [randomMediaType, setRandomMediaType] = useState<'movie'|'tv'>('tv');
    const [updateRandomLink, setUpdateRandomLink] = useState<boolean>(false);
    useEffect(()=>{
        async function fetchDiscoverData(){
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGE1M2VlNzc4OTFjZDEyOTE4NDQ0ZTU5Y2MzMTYzNSIsInN1YiI6IjY1MDNmMzExNjNhYWQyMDBlMTJkMDBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NTn6VJvdhgOv_UyuFDZpt6_DO6sjhQY127HtGPmlBFc'
            }
          };
          const res = await fetch(`https://api.themoviedb.org/3/discover/${randomMediaType}?include_video=false&language=en-US&page=${Math.ceil(Math.random()*100)}&sort_by=popularity.desc`, options)
          const data  = await res.json();
          setRandomResultData(data);
          console.log(data.results);
          
        }
        fetchDiscoverData()
    },[updateRandomLink])


    return(
    <>
    <div className="fixed top-0 z-[99] w-full">
        <div id="navBar" className="bg-gray-200 dark:bg-slate-700 transition-all w-full h-14 top-0 flex items-center px-2 justify-between overflow-hidden">
            <Image alt="light logo" src={nextlogo} width={100} height={50}/>
            <div className="md:flex items-center justify-evenly w-full hidden">
                <span className="hover:text-teal-500 transition-all">
                    <Link href="/" className="flex items-center gap-1 font-semibold">
                        <FaHome size={22}/> Home
                    </Link>
                </span>
                <span className="hover:text-teal-500 transition-all" onClick={()=>{ if(Math.random()<0.5){setRandomMediaType('tv')}else{setRandomMediaType('movie')} setUpdateRandomLink(prev=>!prev) }}>
                    <Link href={randomResultData ? `/${randomMediaType}/${randomResultData.results[Math.ceil(Math.random()*(randomResultData.results.length-1))].id}` : '/'} className="flex items-center gap-1 font-semibold">
                        <GiPerspectiveDiceSixFacesRandom size={25}/> Random
                    </Link>
                </span>
                <span className="hover:text-teal-500 transition-all">
                    <Link href="/search" className="flex items-center gap-1 font-semibold">
                        <FaSearch size={22}/> Search
                    </Link>
                </span>
                <span className="hover:text-teal-500 transition-all">
                    <Link href="/discover" className="flex items-center gap-1 font-semibold">
                        <FaCompass size={22}/> Discover
                    </Link>
                </span>
            </div>


            <div className="flex items-center gap-3"> 
                <button className="w-16 h-8 bg-slate-700 dark:bg-gray-200 duration-300 transition-all rounded-2xl ease-out"
                onClick={()=>{
                    setTheme(theme==='dark'?'light':'dark');
                }}
                >
                    <div className="h-8 w-8 rounded-full dark:bg-black bg-white dark:translate-x-8 transition-all duration-300 ease-out relative">
                        <div className={"dark:opacity-0 opacity-100 text-black absolute top-1 left-1"}>
                            <FaSun size={25}/>
                        </div>
                        <div className={"dark:opacity-100 opacity-0 text-white absolute top-1 left-1"}>
                            <FaMoon size={25}/>
                        </div>
                    </div>
                </button>
                <div className="md:hidden">
                    <MenuHamburger open={openMenu} setOpen={setOpenMenu}/>
                </div>

            </div>
        </div>
        <div className={`bg-gray-300 dark:bg-gray-800 font-semibold w-full flex items-center justify-around transition-all overflow-hidden md:hidden text-sm ${openMenu?'h-9':'h-0'} `}>
            <h1 className="cursor-pointer transition-all duration-200 hover:opacity-70"> 
                <Link href="/" className="flex items-center gap-0.5 font-semibold">
                    <FaHome size={17}/> Home
                </Link></h1>
            <h1 className="cursor-pointer transition-all duration-200 hover:opacity-70" onClick={()=>{ if(Math.random()<0.5){setRandomMediaType('tv')}else{setRandomMediaType('movie')} setUpdateRandomLink(prev=>!prev)}}>                 
                <Link href={randomResultData ? `/${randomMediaType}/${randomResultData.results[Math.ceil(Math.random()*(randomResultData.results.length-1))].id}` : '/'} className="flex items-center gap-0.5 font-semibold">
                    <GiPerspectiveDiceSixFacesRandom size={20}/> Random
                </Link></h1>
            <h1 className="cursor-pointer transition-all duration-200 hover:opacity-70">                   
                <Link href="/search" className="flex items-center gap-0.5 font-semibold">
                    <FaSearch size={17}/> Search
                </Link></h1>
            <h1 className="cursor-pointer transition-all duration-200 hover:opacity-70">  
                <Link href="/discover" className="flex items-center gap-0.5 font-semibold">
                    <FaCompass size={17}/> Discover
                </Link> 
            </h1>
        </div>
    </div>
    <div className="h-14"></div>
    </>
    )
}
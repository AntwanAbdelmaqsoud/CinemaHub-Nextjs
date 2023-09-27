import Image from "next/image"
import { StandardResponse } from "@/model/Response"
import Link from "next/link";


async function getAnimeMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+process.env.TMDB_API_KEY
        }
    };
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_keywords=210024', options)
    const data : StandardResponse = await res.json();
    return data;
}

function Cards({title, poster_path, id}:{id:number, title:string,  poster_path:string}) {
  return (
    <Link href={`/movie/${id}`}>
    <div className="flex flex-col shrink-0 w-40 mx-2 rounded-lg overflow-hidden my-2 hover:opacity-80 transition-all duration-200">
        <div className="w-full h-60 relative">
            {poster_path?<Image alt={title} src={`https://www.themoviedb.org/t/p/w200${poster_path}`} fill={true} className="object-cover"/>:<div className="w-full h-full bg-slate-400"></div>}
        </div>
        <h1 className="font-semibold">{title}</h1>
    </div>
    </Link>
  )
}

export default async function CardsSection(){
    const data = await getAnimeMovies();
    return(
    <div className="dark:bg-slate-800/80 bg-slate-300 p-2 mt-8">
    <div className=" flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Animation</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
    <div className="container mx-auto overflow-auto flex mt-4 ">
        {data.results.slice(0,10).map((item)=>(
            <Cards title={item.title || item.name} poster_path={item.poster_path} id={item.id}/>
        ))}
    </div>
    </div>)
}

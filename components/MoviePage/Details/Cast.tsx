import { MovieCastResponse } from "@/model/Response";
import Image from "next/image";
import blankphoto from '../../../public/blankpp.png'

async function getMovieCast(id:number){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+process.env.TMDB_API_KEY
      },
    };
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
    const data : MovieCastResponse = await res.json();
    return data;
  
  }

export default async function Cast({id}:{id:number}) {
    const data = await getMovieCast(id);
    const MovieCast = data.cast.slice(0,Math.min(20, data.cast.length)).map((item)=>(
        <div className="w-20 md:w-28 lg:w-36 rounded-md overflow-hidden my-2 shrink-0">
            <div className="aspect-[2/3] w-full">
                <Image src={item.profile_path?`https://www.themoviedb.org/t/p/original${item.profile_path}`:blankphoto} alt={item.name} width={200} height={300} className="object-cover"/>
            </div>
            <div className="font-semibold p-2 text-center text-xs md:text-base">{item.name}<h1 className="text-[10px] md:text-sm opacity-80">{item.character}</h1></div>
            
        </div>
    ))


  return (
    <div className="dark:bg-teal-700/90 bg-teal-100 xs:bg-none flex items-center">
      <div className="container mx-auto py-2">
          <h1 className="m-2 font-bold text-lg md:text-3xl ">Top Billed Cast</h1>
          <div className="flex items-baseline gap-4 overflow-x-auto flex-shrink-0">
              {MovieCast.length?MovieCast:"No cast"}
          </div>
      </div>
    </div>
  )
}

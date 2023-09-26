import {StandardResponse } from "@/model/Response";
import Image from "next/image";
import Link from "next/link";
import posterBlank from '@/public/posterBlank.png'


async function getRecommendations(id:number){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+process.env.TMDB_API_KEY
      },
    };
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US`, options)
    const data : StandardResponse = await res.json();
    return data;
  
  }

export default async function Recommendations({id}:{id:number}) {
    const data = await getRecommendations(id);
    const Recommendation = data.results.slice(0,Math.min(10, data.results.length)).map((item)=>(
      <Link href={`/${item.media_type}/${item.id}`}>
        <div className="w-20 md:w-28 lg:w-36 rounded-md overflow-hidden my-2 shrink-0 hover:opacity-80 transition-all duration-200">
            <div className="aspect-[2/3] w-full">
                  <Image src={item.poster_path?`https://www.themoviedb.org/t/p/original${item.poster_path}`:posterBlank} alt={item.name || item.title} width={200} height={300} className="object-cover"/>
            </div>
            <h1 className="font-semibold pt-2 text-center text-xs md:text-base break-words">{item.title || item.name}</h1>
        </div>
      </Link>
    ))


  return (
    <div className="">
      <div className="container mx-auto py-2">
          <h1 className="m-2 font-bold text-lg md:text-3xl ">Recommendations</h1>
          <div className="flex items-baseline gap-4 overflow-x-auto flex-shrink-0">
              {Recommendation.length?Recommendation:<h1 className="p-2 font-semibold opacity-80">No recommendations based on this movie yet.</h1>}
          </div>
      </div>
    </div>
  )
}

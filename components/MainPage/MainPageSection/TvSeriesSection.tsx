import Card from "./Card";
import { StandardResponse } from "@/model/Response";

async function getSeries(urlparam:string){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/tv/${urlparam}?language=en-US&page=1`, options)
  const data : StandardResponse = await res.json();
  return data;
}

export default async function TvSeriesSection({urlparam, title}:{title:string, urlparam:string}) {
  const data = await getSeries(urlparam);
  let Cards;
  if(urlparam == 'on_the_air'){
      Cards = data.results.slice(5,10).map((item)=>(
          <Card key={item.poster_path} id={item.id} type={'tv'}  genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.first_air_date} title={item.name}/>
          ))
    } else if (urlparam == 'airing_today'){
        Cards = data.results.slice(10,15).map((item)=>(
            <Card key={item.poster_path} id={item.id} type={'tv'} genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.first_air_date} title={item.name}/>
        ))
    } else{
        Cards = data.results.slice(0,5).map((item)=>(
            <Card key={item.poster_path} id={item.id} type={'tv'} genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.first_air_date} title={item.name}/>
        ))
    }  

  return (
    <div className="container md:w-1/2 xl:w-1/4 mx-auto mt-3">
      <div className="mx-1">
        <h1 className="text-xl font-extrabold px-2 my-2 text-teal-400">{title}</h1>
        <div className="flex flex-col px-2">
            {Cards}
        </div>
      </div>
    </div>
  )
}

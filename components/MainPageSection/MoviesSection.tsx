import Card from "./Card";
import { StandardResponse } from "@/model/Response";

async function getMovies(urlparam:string){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${urlparam}?language=en-US&page=1`, options)
  const data : StandardResponse = await res.json();
  return data;
}

export default async function MoviesSection({urlparam, title}:{title:string, urlparam:string}) {
  const data = await getMovies(urlparam);
  
  let Cards;
  if(urlparam == 'upcoming'){
      Cards = data.results.slice(5,10).map((item)=>(
        <Card key={item.poster_path} id={item.id} type={'movie'} genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.release_date} title={item.title}/>
        ))
    } else if (urlparam == 'now_playing'){
        Cards = data.results.slice(10,15).map((item)=>(
          <Card key={item.poster_path} id={item.id}  type={'movie'}  genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.release_date} title={item.title}/>
          ))
    } else{
        Cards = data.results.slice(0,5).map((item)=>(
          <Card key={item.poster_path} id={item.id} type={'movie'}  genres={item.genre_ids} poster_path={item.poster_path} rating={item.vote_average} release_date={item.release_date} title={item.title}/>
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

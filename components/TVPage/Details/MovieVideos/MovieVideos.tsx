import { MovieVideoResponse } from "@/model/Response";
import MovieSection from "./MovieSection";

async function getMovieVideos(id:number){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+process.env.TMDB_API_KEY
      },
    };
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
    const data : MovieVideoResponse = await res.json();
    return data;

}
export default async function MovieVideos({id}:{id:number}) {
    const data = await getMovieVideos(id);

  return (
    <div className="container mx-auto my-5">
        <h1 className="m-2 font-bold text-lg md:text-3xl ml-4">Videos</h1>
        <MovieSection data={data}/>
    </div>
  )
}

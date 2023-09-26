import { StandardResponse } from "@/model/Response";
import { redirect } from "next/navigation";
 

async function discoverMovies(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    },
  };
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  const data : StandardResponse = await res.json();
  return data;
}


export default function page() {
  redirect('/search');
}

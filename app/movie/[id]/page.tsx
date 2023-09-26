import { MovieDetailsResponse } from "@/model/Response";
import HeroSlideShow from '@/components/MoviePage/HeroSlideShow/HeroSlideShow'
import MovieDetails from "@/components/MoviePage/Details/MovieDetails";
import Cast from "@/components/MoviePage/Details/Cast";
import MovieVideos from "@/components/MoviePage/Details/MovieVideos/MovieVideos";
import Recommendations from "@/components/MoviePage/Details/Recommendations";
import {Metadata, ResolvingMetadata} from 'next';

async function getMovieDetails(id:number){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  const data : MovieDetailsResponse = await res.json();
  return data;

}

type Props = {
  params: { id: number }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const data = await getMovieDetails(params.id);
 
  return {
    title: data.title,
    description: "Details about the movie "+data.title,
  }
}

export default async function page({params}: {params:{id:number}}) {
  const data = await getMovieDetails(params.id);
  return (
    <>
      <HeroSlideShow data={data}/>
      <MovieDetails data={data}/>
      <MovieVideos id={params.id}/>
      <Cast id={params.id}/>
      <Recommendations id={params.id}/>
    </>
  )
}




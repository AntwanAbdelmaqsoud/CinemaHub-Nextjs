import { TvDetailsResponse } from "@/model/Response";
import HeroSlideShow from '@/components/TVPage/HeroSlideShow/HeroSlideShow'
import MovieDetails from "@/components/TVPage/Details/MovieDetails";
import Cast from "@/components/TVPage/Details/Cast";
import MovieVideos from "@/components/TVPage/Details/MovieVideos/MovieVideos";
import Recommendations from "@/components/TVPage/Details/Recommendations";
import Seasons from "@/components/TVPage/Details/Seasons"
import { Metadata, ResolvingMetadata } from 'next'






async function getTVSeriesDetails(id:number){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
  const data : TvDetailsResponse = await res.json();
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
  const data = await getTVSeriesDetails(params.id);
 
  return {
    title: data.name,
    description: "Details about the TV series "+data.name,
  }
}
 

export default async function page({params}: {params:{id:number}}) {
  const data = await getTVSeriesDetails(params.id);
  return (
    <>
      <HeroSlideShow data={data}/>
      <MovieDetails data={data}/>
      <Seasons data={data}/>
      <MovieVideos id={params.id}/>
      <Cast id={params.id}/>
      <Recommendations id={params.id}/>
    </>
  )
}

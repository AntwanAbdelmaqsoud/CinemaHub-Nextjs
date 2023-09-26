import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import CardsSection from '@/components/MainPageSection/AnimeMovies';
import Movies from '@/components/MainPageSection/Movies';
import TvSeries from '@/components/MainPageSection/TvSeries';

import { StandardResponse } from '@/model/Response';
export const revalidate = 24*3600;
async function getTrending() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.TMDB_API_KEY
    }
  };
  const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  const data : StandardResponse = await res.json();
  return data;

}


export default async function Home() {
  const Hero = await getTrending();
  return (
    <div>
      <HeroCarousel data={Hero}/>
      <Movies/>
      <CardsSection/>
      <TvSeries/>
    </div>
  )
}
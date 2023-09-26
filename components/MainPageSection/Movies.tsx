
import MoviesSection from "./MoviesSection";

export default function Movies() {
  return (
    <div className="container mx-auto mt-5">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Movies</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="flex flex-wrap">
            <MoviesSection urlparam={'top_rated'} title="Top Rated"/>
            <MoviesSection urlparam={'popular'} title="Popular"/>
            <MoviesSection urlparam={'upcoming'} title="Upcoming"/>
            <MoviesSection urlparam={'now_playing'} title="Now Playing"/>
        </div>
    </div>
  )
}

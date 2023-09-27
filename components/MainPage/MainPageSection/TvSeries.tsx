import TvSeriesSection from "./TvSeriesSection"
export default function TvSeries() {
  return (
    <div className="container mx-auto mt-5">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Series</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="flex flex-wrap">
            <TvSeriesSection urlparam={'top_rated'} title="Top Rated"/>
            <TvSeriesSection urlparam={'popular'} title="Popular"/>
            <TvSeriesSection urlparam={'airing_today'} title="Airing Today"/>
            <TvSeriesSection urlparam={'on_the_air'} title="On The Air"/>
        </div>
    </div>
  )
}

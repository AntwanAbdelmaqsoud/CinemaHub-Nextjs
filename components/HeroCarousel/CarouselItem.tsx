import Image from "next/image"
import Link from "next/link";
import RatingCircle from "../RatingCircle"
import returnNameByID from "../utils/Genres";

export default function CarouselItem({src, genres, title, overview, vote_average,id, name, mediaType}:{mediaType:string, name:string, id:number, src:string, genres:number[], title:string, overview:string, vote_average:number}) {
  return (
    <div className="w-full h-full relative shrink-0 bg-[#121212]">
        <div className="z-10 absolute w-full h-full flex flex-col gap-2 p-2 md:p-4">
            <h1 className="font-extrabold text-2xl md:text-3xl text-white hover:opacity-75 transition-opacity"><Link href={`/${mediaType}/${id}`}>{title?title.length>20?title.slice(0,20)+'...':title:name.length>20?name.slice(0,20)+'...':name}</Link></h1>
            <p className="opacity-90 text-white w-[85%] md:w-1/2 font-semibold text-[3vmin] md:text-base lg:text-lg overflow-hidden">{overview.length>150? overview.slice(0,150)+'...':overview}</p>
            <h1 className="font-light text-sm md:text-base text-teal-200">{genres.map((item,index)=>{
          if(index == genres.length-1) return returnNameByID(item)+'.';
          return returnNameByID(item)+', ';
          })}</h1>
          <div className="md:scale-150 md:absolute md:left-6 md:bottom-4">
            <RatingCircle rating = {Math.round(vote_average*10)/10}/>
          </div>
        </div>
        <div className="aspect-video bg-black max-h-[300px] lg:max-h-[400px] z-0 absolute w-full md:max-w-[70%] right-0 h-auto">
            <Image loading="eager" alt={title} src={`https://www.themoviedb.org/t/p/w1280${src}`} width={533} height={300} className="w-full h-full object-cover object-center "/>
            <div className="absolute top-0 -left-0.5 bg-gradient-to-r from-[#121212] to-transparent w-full h-full">
            </div>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#121212] to-transparent w-1/2 h-full">
            </div>
            <div className="absolute top-0 bg-gradient-to-b from-[#121212] to-transparent w-full h-1/2">
            </div>
            <div className="absolute bottom-0 bg-gradient-to-t from-[#121212] to-transparent w-full h-1/2">
            </div>
        </div>
    </div>
  )
}

import Image from "next/image"
import RatingCircle from "../RatingCircle"
import Link from "next/link";
import returnNameByID from "../utils/Genres";
import posterBlank from "@/public/posterBlank.png"

function formatDate(dateString:string) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' } as const;
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Extract the day from the formatted date
  const day = parseInt(formattedDate.replace(/\D/g, ''), 10);

  // Determine the suffix for the day
  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  // Format the final date string
  const finalDateString = formattedDate.replace(/\d+/g, '') + ' ' + day + daySuffix + ' ' + date.getFullYear();
  return finalDateString;
}


export default function Card({poster_path,title,  genres, release_date, rating, id, type}: {type:string, id:number, rating:number, poster_path: string, title: string, genres:number[], release_date:string}) {
  return (
    <>
    <div className="w-full my-1 p-1 flex gap-2">
      
      <div className="w-[4rem] h-[6rem] rounded-md  md:w-[6.7rem] md:h-[10rem]  bg-black md:rounded-xl shrink-0 relative ">
        <Link href={`/${type}/${id}` }><Image loading="lazy" alt={title} src={poster_path?`https://www.themoviedb.org/t/p/w200${poster_path}`:posterBlank} width={200} height={300} className="w-full h-full object-cover object-right rounded-md md:rounded-xl"/></Link>
        <div className="absolute -left-2 -bottom-2">
          <RatingCircle rating={Math.round(rating*10)/10}/>
        </div>
      </div>
      <div>
        <Link href={`/${type}/${id}` }><h1 className="font-semibold text-[17px] text-teal-800 dark:text-teal-200 hover:opacity-75 transition-opacity">{title}</h1></Link>
        <h1 className="dark:text-teal-500 text-teal-600">{formatDate(release_date)}</h1>
        <h1 className="font-light text-sm dark:text-teal-500 text-teal-700">{genres.map((item,index)=>{
          if(index == genres.length-1) return returnNameByID(item)+'.';
          return returnNameByID(item)+', ';
          })}</h1>
      </div>
    </div>
    <span className="w-full h-[2px] dark:bg-slate-800 bg-slate-200 my-2"></span>
    </>
  )
}

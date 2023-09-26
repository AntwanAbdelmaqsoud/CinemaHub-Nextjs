import styles from './HeroSlideShow.module.css'
import Image from 'next/image';
import {TvDetailsResponse } from '@/model/Response';
import posterBlank from '@/public/posterBlank.png'

function runtimeFormat(minutes:number){
  if(minutes>=60){
    return Math.floor(minutes/60)+'h ' + (minutes-Math.floor(minutes/60)*60) + 'm';
  }
  else{
    return minutes+'m'
  }
}

export default function HeroSlideShow({data}:{data:TvDetailsResponse}) {
    let genreNames;
    if (data.genres.length) {
     genreNames = data.genres.slice(0,Math.min(data.genres.length, 3)).map((item,index)=>{
        if (index == Math.min(data.genres.length, 3)-1) {
          return item.name;
        }
        else{
          return item.name+' - '
        }
      });
    }
  return (
    <div className="container mx-auto mt-3 mb-3 lg:mb-5 md:mb-9">
    <div className="w-full aspect-[2/1] xs:aspect-[10/3] ml-auto relative">
      <div className="w-full h-full overflow-hidden relative rounded-md md:rounded-lg">
        { data.backdrop_path?
          <>
          <div className={styles.bgImage}>
            <Image alt={data.name||"Unknown"} src={`https://www.themoviedb.org/t/p/original${data.backdrop_path}`} width={1500} height={1000} className="w-full h-full object-cover object-center"/>
          </div>
          </>
          :
          <div className={styles.bgNotFound}></div>
        }
        <div className={styles.MovingLines}></div>
      </div>

      <div className="z-10 hidden xs:block aspect-[2/3] w-[15%] rounded-md md:rounded-xl  overflow-hidden dark:bg-[#121212] bg-white  absolute left-[10%] -bottom-[40%] dark:shadow-[0_0_0_1vw_#121212] shadow-[0_0_0_1vw_white] ">
        <Image loading="lazy" alt={data.name||"Unknown"} src={data.poster_path?`https://www.themoviedb.org/t/p/w200${data.poster_path}`: posterBlank} width={200} height={300} className="w-full h-full object-cover object-right"/>
      </div>
    </div>
    <div className="xs:ml-[30%] mt-4 mx-2 xs:mt-0.5 md:my-2">
      <div className="flex flex-col md:flex-row md:justify-between mr-1 items-baseline gap-2">
        <div className="flex gap-2 items-center">
            <div className="w-[100px] h-[150px] aspect-[2/3] xs:hidden shrink-0">
                <Image loading="lazy" alt={data.name || "Unknown"} src={data.poster_path?`https://www.themoviedb.org/t/p/w200${data.poster_path}`: posterBlank} width={200} height={300} className="w-full h-full object-cover object-right rounded-lg"/>
            </div>  
            <div>
                <h1 className="text-xl md:text-3xl font-bold my-2">{data.name || "Unknown"}</h1>
                <h2 className="text-base md:text-lg opacity-75">{data.tagline?data.tagline:<span className="md:p-3"></span>}</h2>
                <h1 className="text-sm md:text-base xs:hidden dark:text-teal-200 text-teal-700 rounded-l-xl rounded-r-xl my-1"><span className="mr-1">{data.episode_run_time[0] && runtimeFormat(data.episode_run_time[0])} ■ </span>{genreNames}</h1>
            </div>
        </div>
        <h1 className="text-sm md:text-base xs:flex dark:text-teal-200 text-teal-700 rounded-l-xl rounded-r-xl hidden items-center justify-center">{data.episode_run_time[0] && runtimeFormat(data.episode_run_time[0])} ■ {genreNames}</h1>
      </div>
    </div>
</div>
)
}

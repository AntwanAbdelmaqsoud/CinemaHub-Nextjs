import RatingCircleHQ from "@/components/RatingCircleHQ";
import { MovieDetailsResponse } from "@/model/Response";
import { Montserrat } from "next/font/google";
import Image from 'next/image'

const montserrat = Montserrat({ weight:'400', subsets:['latin'] })
const montserratBold = Montserrat({ weight:'700', subsets:['latin'] })

function numbertodollars(number:number){
    if (number) {
        let stringnumber = number.toString();
        return '$'+stringnumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else{
        return 'NA'
    }
}

export default function MovieDetails({data}:{data:MovieDetailsResponse}) {
  return (
    <>
        <div className="dark:bg-teal-700/90 bg-teal-100 xs:bg-none">
            <div className="container mx-auto  min-h-[11rem] relative my-4">
                <div className="flex flex-col w-full items-center p-2 xs:hidden gap-2 text-center">
                    <h1 className={montserratBold.className+" font-bold text-xl"}>Description</h1>
                    <p className={montserrat.className+" text-sm opacity-[80%]"}>
                        {data.overview}
                    </p>
                </div>
                <h1 className="hidden xs:block absolute right-[75%] bottom-1/2 xl:bottom-1/3 xl:right-[76%]  2xl:bottom-6 2xl:right-[77%] font-bold text-sm xs:text-base md:text-3xl">Description</h1>
                <div className="hidden ml-[30%] py-3 pr-2 xs:flex items-center min-h-[10rem]">
                    <p className={montserrat.className+" text-sm md:text-lg"}>
                        {data.overview}
                    </p>
                </div>
            </div>
        </div>
        <div className="container mx-auto flex p-2 gap-3 items-center justify-around my-8">
            <RatingCircleHQ rating={Math.round(data.vote_average*10)/10}/>
            <div className="flex flex-col gap-2 xs:text-lg font-bold">
                <h1>Budget: {numbertodollars(data.budget)}</h1>
                <h1>Revenue: {numbertodollars(data.revenue)}</h1>
            </div>
        </div>
        

    </>
  )
}

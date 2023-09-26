import { Dispatch, SetStateAction } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

function makePaginationNumbers(pageNumber:number, numberOfPages:number, setPageNumber:Dispatch<SetStateAction<number>>){
    let result=[];

    if (numberOfPages<6) {
        for (let index = 1; index <= numberOfPages; index++) {
            result.push(<div onClick={()=>setPageNumber(index)} className={(pageNumber==index? "dark:bg-teal-600 bg-teal-400" :" ") + " w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>{index}</div>)
        }
        return result;
    }
    else{
        result.push(<div onClick={()=>setPageNumber(1)} className={(pageNumber==1? "dark:bg-teal-600 bg-teal-400" :" ") + " w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>1</div>)
        if(pageNumber <= 2){
            result.push(<div onClick={()=>setPageNumber(2)} className={(pageNumber == 2 ? "dark:bg-teal-600 bg-teal-400" :" ") + " w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>2</div>);
            result.push(<div onClick={()=>setPageNumber(3)} className={" w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>3</div>);
            result.push(<h1>...</h1>);
        }
        else if (pageNumber>=numberOfPages-1) {
            result.push(<h1>...</h1>);
            result.push(<div onClick={()=>setPageNumber(numberOfPages-2)} className={" w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>{numberOfPages-2}</div>);
            result.push(<div onClick={()=>setPageNumber(numberOfPages-1)} className={(pageNumber == numberOfPages-1 ? "dark:bg-teal-600 bg-teal-400" :" ") + " w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>{numberOfPages-1}</div>);
        }
        else{
            result.push(<h1>...</h1>);
            result.push(<div className={"dark:bg-teal-600 bg-teal-400 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>{pageNumber}</div>);
            result.push(<h1>...</h1>);
        }
        result.push(<div onClick={()=>setPageNumber(numberOfPages)} className={(pageNumber==numberOfPages? "dark:bg-teal-600 bg-teal-400" :" ") + " w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110"}>{numberOfPages}</div>)   
        return result;
    }



}

export default function Pagination({pageNumber, setPageNumber, numberOfPages}: {numberOfPages:number, pageNumber:number, setPageNumber:Dispatch<SetStateAction<number>>}) {
  return (
    <div className="my-5 flex items-center w-full justify-center">
    <div className="hover:opacity-90 cursor-pointer hover:scale-125 transition-all" onClick={()=>setPageNumber(prev=>prev==1?prev:prev-1)}>
      <PiCaretLeft size={25}/>
    </div>
    <div className="flex items-center gap-1 font-semibold [&>div]:border dark:[&>div]:border-slate-600">
        {makePaginationNumbers(pageNumber, numberOfPages, setPageNumber)}
    </div>
    <div className="hover:opacity-90 cursor-pointer hover:scale-125 transition-all" onClick={()=>setPageNumber(prev=>prev==numberOfPages?prev:prev+1)}>
      <PiCaretRight size={25}/>
    </div>
</div>
  )
}

export default function loading() {
    return (
      <div className="container mx-auto">
        <div className="w-full aspect-[3/2] max-h-[300px] dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg my-5"></div>
        <div className="flex gap-2 items-center justify-around w-full aspect-[3/1]">
            <div className="aspect-[2/3] w-1/4 dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg"> </div>
            <div className="w-full flex-col flex justify-around h-full ">
              <div className="h-1/5 w-full dark:bg-slate-800 bg-slate-400 animate-pulse rounded"></div>
              <div className="h-1/5 w-full dark:bg-slate-800 bg-slate-400 animate-pulse rounded"></div>
              <div className="h-1/5 w-full dark:bg-slate-800 bg-slate-400 animate-pulse rounded"></div>
            </div>
        </div>
        <div className="w-full aspect-square dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg my-5"></div>
        <div className="w-full aspect-[2/1] dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg my-5"></div>
  
      </div>
    )
  }
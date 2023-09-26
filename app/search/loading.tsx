export default function loading() {
  return (
    <div className="container mx-auto py-5">
        <div className="flex items-center w-full">
          <span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span><h1 className="text-4xl font-bold font-mono mx-3">SEARCH</h1><span className="w-1/2 h-0.5 bg-slate-400 rounded my-8"></span>
        </div>
        <div className="w-full p-2 h-10 dark:bg-slate-800 bg-slate-400 animate-pulse rounded"> </div>
        <div className="w-full p-2 h-10 dark:bg-slate-800 bg-slate-400 animate-pulse rounded my-2"> </div>
        <div className="w-full flex gap-2 flex-wrap justify-around">
          {Array.from({length:20}).map(()=>(
            <div className="flex flex-col shrink-0 w-32 md:w-40 lg:w-60 xl:w-[19rem] 2xl:w-64 my-2 ">
              <div className="w-full aspect-[2/3] dark:bg-slate-800 bg-slate-400 animate-pulse rounded">
              </div>
              <div className="h-5 w-full dark:bg-slate-800 bg-slate-400 animate-pulse my-2">
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
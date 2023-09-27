export default function loading() {
  return (
    <div className="container mx-auto py-5">
        <div className="flex items-center w-full">
          <span className="my-8 w-1/2 h-0.5 bg-slate-400 rounded"></span><h1 className="text-4xl font-bold font-mono mx-3">DISCOVER</h1><span className="my-8 w-1/2 h-0.5 bg-slate-400 rounded"></span>
        </div>
        <div className="w-full h-10 p-2 dark:bg-slate-800 bg-slate-400 animate-pulse rounded"> </div>
        <div className=" my-2 w-full h-10 p-2 dark:bg-slate-800 bg-slate-400 animate-pulse rounded "> </div>
        <div className="flex flex-wrap justify-around gap-2 w-full">
          {Array.from({length:20}).map(()=>(
            <div className="flex flex-col shrink-0 my-2 w-32 md:w-40 lg:w-60 xl:w-[19rem] 2xl:w-64">
              <div className="w-full aspect-[2/3] dark:bg-slate-800 bg-slate-400 animate-pulse rounded">
              </div>
              <div className="h-5 w-full my-2 dark:bg-slate-800 bg-slate-400 animate-pulse">
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
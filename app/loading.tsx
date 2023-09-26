export default function loading() {
  return (
    <>
    <div className="container mx-auto">
      <div className="w-full aspect-[3/2] max-h-[300px] dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg my-5"> </div>
      <div className="w-full dark:bg-slate-800/80 bg-slate-300 p-2 mt-8">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Trending</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="w-full overflow-x-auto flex items-center">
          {Array.from({length:10}).map(()=>(
            <div className="w-40 shrink-0 aspect-[2/3] m-2 dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg">
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-5">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Movies</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="flex flex-wrap">
            {Array.from({length:4}).map(()=>(
                <div className="container md:w-1/2 xl:w-1/4 mx-auto mt-3">
                  <div className="mx-1">
                  <div className="flex flex-col px-2">
                        {Array.from({length:5}).map(()=>(
                              <>
                              <div className="w-full my-1 p-1 flex gap-2">
                                <div className="w-[4rem] h-[6rem] rounded-md  md:w-[6.7rem] md:h-[10rem]  dark:bg-slate-800 bg-slate-400 animate-pulse md:rounded-xl shrink-0 relative ">
                                  <div className="w-full h-full object-cover object-right rounded-md md:rounded-xl"> </div>
                                </div>
                                <div className="w-full flex flex-col justify-evenly">
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                </div>
                              </div>
                              <span className="w-full h-[2px] dark:bg-slate-800 bg-slate-200 my-2"></span>
                              </>
                        ))}
                    </div>
                  </div>
                </div>
            ))}
      </div>
    </div>
    <div className="container mx-auto">
    <div className="w-full dark:bg-slate-800/80 bg-slate-300 p-2 mt-8">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Animation</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="w-full overflow-x-auto flex items-center">
          {Array.from({length:10}).map(()=>(
            <div className="w-40 shrink-0 aspect-[2/3] m-2 dark:bg-slate-800 bg-slate-400 animate-pulse rounded-lg">
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-5">
        <div className="flex items-center"><span className="w-1/5 h-[2px] bg-slate-500"/><h1 className="text-2xl font-semibold mx-2">Series</h1><span className="h-[2px] bg-slate-500 w-full"/></div>
        <div className="flex flex-wrap">
            {Array.from({length:4}).map(()=>(
                <div className="container md:w-1/2 xl:w-1/4 mx-auto mt-3">
                  <div className="mx-1">
                  <div className="flex flex-col px-2">
                        {Array.from({length:5}).map(()=>(
                              <>
                              <div className="w-full my-1 p-1 flex gap-2">
                                <div className="w-[4rem] h-[6rem] rounded-md  md:w-[6.7rem] md:h-[10rem]  dark:bg-slate-800 bg-slate-400 animate-pulse md:rounded-xl shrink-0 relative ">
                                  <div className="w-full h-full object-cover object-right rounded-md md:rounded-xl"> </div>
                                </div>
                                <div className="w-full flex flex-col justify-evenly">
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                  <div className="h-4 w-full dark:bg-slate-800 bg-slate-400 animate-pulse"></div>
                                </div>
                              </div>
                              <span className="w-full h-[2px] dark:bg-slate-800 bg-slate-200 my-2"></span>
                              </>
                        ))}
                    </div>
                  </div>
                </div>
            ))}
      </div>
    </div>
    </>
  )
}

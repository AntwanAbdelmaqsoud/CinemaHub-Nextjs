export interface StandardResponse {
    page:number,
    results: results[],
    total_pages: number,
    total_results: number,
}

interface results { 
    name:string,
    first_air_date:string,
    adult: boolean,
    backdrop_path: string,
    id: number,
    title: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity?: number,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count?: number
}

interface genre {
    id: number,
    name: string
}

interface productionCompanies{
    id:number, 
    logo_path:string, 
    name: string, 
}

export interface MovieDetailsResponse{
    adult: boolean, 
    backdrop_path: string, 
    belongs_to_collection: null | string, 
    budget: number,
    genres: genre[],
    homepage: string, 
    id: number,
    imdb_id: string,
    original_title:string,
    overview: string, 
    poster_path:string, 
    production_companies: productionCompanies[],
    release_date: string,
    revenue: number,
    runtime: number,
    title:string, 
    tagline: string,
    vote_average:number,
    vote_count:number
    name: string, 


}

interface cast {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

interface crew {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string, 
    job: string
}


export interface MovieCastResponse{
    id: number, 
    cast: cast[],
    crew: crew[]
}

interface VideoResults{
    name: string,
    key: string,
    site: string,
    official: boolean
}

export interface MovieVideoResponse{
    id:number,
    results: VideoResults[]
}

interface season{
    air_date: string, 
    episode_count:number,
    name: string, 
    overview: string,
    poster_path: string,
    vote_average: number,
}

export interface TvDetailsResponse{
    adult: boolean,
    backdrop_path: string,
    episode_run_time: number[],
    first_air_date: string,
    genres: genre[],
    id: number,
    in_production: boolean,
    name: string, 
    number_of_episodes: number,
    number_of_seasons: number,
    overview: string,
    poster_path: string,
    status: string,
    tagline: string,
    vote_average: number,
    seasons: season[],

}
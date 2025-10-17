import axios from 'axios'
import { SearchMoviesParams, searchMoviesTMDBResponse } from '../schemas/movies'
import { PaginatedResult } from '../types/PaginatedResponse'
import { Movie } from '../types/Movie'

const searchByTitle = async (
  params: SearchMoviesParams
): Promise<PaginatedResult<Movie>> => {
  const response = await axios.get(process.env.TMDB_SEARCH_MOVIES_URL!, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
    params: {
      page: params.page,
      query: params.query,
    },
  })

  const parsedResults = await searchMoviesTMDBResponse.parseAsync(response.data)

  return {
    page: params.page,
    totalItems: parsedResults.total_results,
    totalPages: parsedResults.total_pages,
    data: parsedResults.results.map((result) => ({
      title: result.original_title,
      posterImageUrl: result.poster_path
        ? `${process.env.TMDB_IMAGE_URL}${result.poster_path}`
        : null,
    })),
  }
}

export const MoviesRepository = {
  searchByTitle,
}

import { MoviesRepository } from '../../repository/movies'
import { SearchMoviesParams } from '../../schemas/movies'
import { Movie } from '../../types/Movie'
import { PaginatedResult as PaginatedResult } from '../../types/PaginatedResponse'

export const search = async (
  params: SearchMoviesParams
): Promise<PaginatedResult<Movie>> => {
  return await MoviesRepository.searchByTitle(params)
}

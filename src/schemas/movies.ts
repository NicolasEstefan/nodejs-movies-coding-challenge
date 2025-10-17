import z from 'zod'

export const searchMoviesValidationSchema = {
  query: z.object({
    query: z.string().nonempty(),
    page: z.coerce.number().default(1),
  }),
}

export type SearchMoviesParams = z.infer<
  typeof searchMoviesValidationSchema.query
>

export const searchMoviesTMDBResponse = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      original_title: z.string(),
      poster_path: z.string().nullable(),
    })
  ),
  total_results: z.number(),
  total_pages: z.number(),
})

export type SearchMoviesTMDBResponse = z.infer<typeof searchMoviesTMDBResponse>

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {IoStarSharp} from 'react-icons/io5'
import CastItem from '../CastItem'
import './index.css'

class SingleMovieDetails extends Component {
  state = {movieObj: {}, loading: true, castList: []}

  componentDidMount() {
    this.getMovieDetails()
  }

  MovieObjCaseConvert = item => ({
    id: item.id,
    runtime: item.runtime,
    posterPath: item.poster_path,
    OriginalTitle: item.original_title,
    overview: item.overview,
    voteAverage: item.vote_average,
    releasedDate: item.released_date,
    genre: item.genres,
  })

  CastObjCaseConvert = arr =>
    arr.map(item => ({
      id: item.id,

      orignialName: item.original_name,
      character: item.character,
      profilePath: item.profile_path,
    }))

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getMovieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=98ccf2ec8c8db509095bed7dceca517d&language=en-US`
    const getCastApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=98ccf2ec8c8db509095bed7dceca517d&language=en-US`
    const MovieResponseObj = await fetch(getMovieApi)
    const castResponseObj = await fetch(getCastApi)
    if (MovieResponseObj.ok && castResponseObj.ok) {
      const MoviedataObj = await MovieResponseObj.json()
      const castDataList = await castResponseObj.json()
      console.log(MoviedataObj)
      //   console.log(castDataList);
      const updatedMovieObj = this.MovieObjCaseConvert(MoviedataObj)
      const updatedCastList = this.CastObjCaseConvert(castDataList.cast)
      this.setState(prevState => ({
        movieObj: updatedMovieObj,
        castList: updatedCastList,
        loading: !prevState.loading,
      }))
    }
  }

  render() {
    const {movieObj, castList, loading} = this.state
    console.log(castList)
    const {
      posterPath,
      OriginalTitle,
      voteAverage,
      overview,
      runtime,
      genre,
    } = movieObj
    const rating = Math.round(voteAverage)
    return (
      <>
        {loading ? (
          <section className="loader-container">
            <Loader type="Oval" color="green" className="loader-style" />
          </section>
        ) : (
          <section className="section-container-movie-details">
            <div className="container-movie-details">
              <div className="movie-details-container">
                <img
                  src={`http://image.tmdb.org/t/p/original/${posterPath}`}
                  alt={OriginalTitle}
                  className="movie-poster-in-details"
                />

                <div className="text-container">
                  <p className="movie-name">{OriginalTitle}</p>
                  <p>{overview}</p>
                  <p>
                    rating:{rating}
                    <IoStarSharp color="yellow" />
                  </p>
                  <p>{runtime} min</p>
                  <p>Genres</p>
                  <ul className="genres">
                    {genre.map(item => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="cast-details-container">
                <p>Cast</p>
                <ul className="cast-details">
                  {castList.map(item => (
                    <CastItem key={item.id} details={item} />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </>
    )
  }
}

export default SingleMovieDetails

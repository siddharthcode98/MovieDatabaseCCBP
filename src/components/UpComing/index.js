import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {BsArrowRightSquareFill} from 'react-icons/bs'

import MovieCard from '../MovieCard'

import './index.css'

class Upcoming extends Component {
  state = {loading: true, MovieList: [], currentPage: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  caseConvert = arr =>
    arr.map(item => ({
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
      voteAverage: item.vote_average,
    }))

  getPopularMovies = async () => {
    const {currentPage} = this.state
    const PopularApi = `https://api.themoviedb.org/3/movie/upcoming?api_key=98ccf2ec8c8db509095bed7dceca517d&language=en-US&page=${currentPage}`
    const response = await fetch(PopularApi)
    if (response.ok === true) {
      const dataObj = await response.json()
      const modifiedMovieList = this.caseConvert(dataObj.results)
      this.setState(prevState => ({
        MovieList: modifiedMovieList,
        loading: !prevState.loading,
      }))
    }
  }

  turnPage = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
        loading: !prevState.loading,
      }),
      this.getPopularMovies,
    )
  }

  render() {
    const {MovieList, loading, currentPage} = this.state
    // console.log(MovieList);
    return (
      <>
        {loading ? (
          <section className="loader-container">
            <Loader type="Oval" color="green" className="loader-style" />
          </section>
        ) : (
          <section className="section-container">
            <div className="popular-container ">
              <p className="route-heading">UpComing Movies</p>
              <p className="page-numbers">
                {currentPage}
                <button onClick={this.turnPage} className="next-page">
                  <BsArrowRightSquareFill />
                </button>
              </p>
              <ul className="movie-list-container">
                {MovieList.map(item => (
                  <MovieCard key={item.id} details={item} />
                ))}
              </ul>
            </div>
          </section>
        )}
      </>
    )
  }
}
export default Upcoming

import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {BsArrowRightSquareFill} from 'react-icons/bs'
import MovieCard from '../MovieCard'

import Context from '../../context/Context'

import './index.css'

class SearchMoviesDetails extends Component {
  render() {
    // console.log(MovieList);
    return (
      <Context.Consumer>
        {value => {
          const {searchList, loading, currentPage, turnPage} = value
          return (
            <>
              {loading ? (
                <section className="loader-container">
                  <Loader type="Oval" color="green" className="loader-style" />
                </section>
              ) : (
                <section className="section-container">
                  <div className="popular-container ">
                    <p className="route-heading">Your "Search" Movies</p>
                    <p className="page-numbers">
                      {currentPage}
                      <button
                        onClick={turnPage}
                        className="next-page"
                        type="button"
                      >
                        <BsArrowRightSquareFill />
                      </button>
                    </p>
                    <ul className="movie-list-container">
                      {searchList.map(item => (
                        <MovieCard key={item.id} details={item} />
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default SearchMoviesDetails

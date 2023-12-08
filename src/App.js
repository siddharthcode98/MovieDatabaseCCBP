import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/UpComing'
import Footer from './components/Footer'
import Context from './context/Context'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchMoviesDetails from './components/SearchMoviesDetails'

// write your code here
class App extends Component {
  state = {search: '', currentPage: 1, searchList: [], loading: true}

  componentDidMount() {
    this.getSearchMovies()
  }

  caseConvert = arr =>
    arr.map(item => ({
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
      voteAverage: item.vote_average,
    }))

  getSearchMovies = async () => {
    const {currentPage, search} = this.state
    const PopularApi = `https://api.themoviedb.org/3/search/movie?api_key=98ccf2ec8c8db509095bed7dceca517d&language=en-US&query=${search}&page=${currentPage}`
    const response = await fetch(PopularApi)
    if (response.ok === true) {
      const dataObj = await response.json()
      const modifiedMovieList = this.caseConvert(dataObj.results)
      this.setState(prevState => ({
        searchList: modifiedMovieList,
        search: '',
        loading: !prevState.loading,
      }))
    }
  }

  searchFn = query => {
    this.setState(
      prevState => ({search: query, loading: !prevState.loading}),
      this.getSearchMovies,
    )
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
    const {search, searchList, loading, currentPage} = this.state
    // console.log(search);
    // console.log(searchList);
    return (
      <Context.Provider
        value={{
          search,
          loading,
          currentPage,
          searchList,
          searchFn: this.searchFn,
          turnPage: this.turnPage,
        }}
      >
        <main className="main-container">
          <Header />
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/movie/:id" component={SingleMovieDetails} />
            <Route exact path="/search" component={SearchMoviesDetails} />
          </Switch>
          <Footer />
        </main>
      </Context.Provider>
    )
  }
}

export default App

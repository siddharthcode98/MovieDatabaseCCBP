import {Component} from 'react'

import {Link} from 'react-router-dom'

import {MdOutlineSearch} from 'react-icons/md'

import Context from '../../context/Context'

import './index.css'

class Header extends Component {
  state = {query: ''}

  onUserInput = event => {
    this.setState({query: event.target.value})
  }

  render() {
    // console.log(searchList);
    const {query} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {searchFn} = value

          const onClickUserInput = () => {
            this.setState({query: ''})
            searchFn(query)
          }
          return (
            <header className="header">
              <div className="nav-bar-container">
                <nav className="nav-bar">
                  <h1 className="title">movieDB</h1>
                  <div className="search-bar-links-container">
                    <div className="search-bar-container" id="searchBar">
                      <Link to="/search">
                        <button
                          className="search-icon"
                          type="button"
                          onClick={onClickUserInput}
                        >
                          <MdOutlineSearch />
                        </button>
                      </Link>
                      <input
                        type="search"
                        className="search-bar"
                        placeholder="search movies"
                        value={query}
                        onChange={this.onUserInput}
                      />
                    </div>
                    <Link to="/">
                      <button className="nav-button" type="button">
                        Popular
                      </button>
                    </Link>
                    <Link to="/top-rated">
                      <button className="nav-button" type="button">
                        Top-Rated
                      </button>
                    </Link>
                    <Link to="/upcoming">
                      <button className="nav-button" type="button">
                        Upcoming
                      </button>
                    </Link>
                  </div>
                </nav>
              </div>
            </header>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Header

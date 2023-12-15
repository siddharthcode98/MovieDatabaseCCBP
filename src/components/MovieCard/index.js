import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {details} = props
  const {id, posterPath, title, voteAverage} = details
  const rating = Math.round(voteAverage)
  return (
    <li className="movie">
      <img
        src={`http://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        className="poster-size"
      />
      <p>{title}</p>
      <p>rating: {rating}</p>
      <Link to={`/movie/${id}`}>
        <button className="view-details" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard

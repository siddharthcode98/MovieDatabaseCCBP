import './index.css'

const CastItem = props => {
  const {details} = props
  const {orignialName, character, profilePath} = details
  console.log(profilePath)
  return (
    <li className="actor-details-container">
      <>
        {profilePath !== null ? (
          <img
            src={`http://image.tmdb.org/t/p/original/${profilePath}`}
            alt={orignialName}
            className="profile-style"
          />
        ) : (
          <p>{orignialName}</p>
        )}
      </>

      <p>
        {orignialName} <br />
        <span className="character">
          As <br />
          {character}
        </span>
      </p>
    </li>
  )
}

export default CastItem

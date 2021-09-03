// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {imageUrl, name, starsCount, forksCount, issuesCount} = repoDetails

  return (
    <li className="repo-card">
      <img src={imageUrl} alt="avatar" className="image" />
      <h1 className="repo-heading"> {name}</h1>
      <div className="pic-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p className="desc"> {starsCount} stars</p>
      </div>
      <div className="pic-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p className="desc"> {forksCount} forks</p>
      </div>
      <div className="pic-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open-issues"
          className="logo"
        />
        <p className="desc"> {issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

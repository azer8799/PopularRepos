import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const statusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const url = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    apiStatus: statusConstants.initial,
    repoData: [],
    activeFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    const {activeFilter} = this.state
    this.setState({apiStatus: statusConstants.loading})

    const response = await fetch(`${url}${activeFilter}`)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))

      this.setState({repoData: updatedData, apiStatus: statusConstants.success})
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  loadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.pn"
        alt="failure view"
        className="fail-image"
      />
      <h1 className="heading"> Something Went Wrong </h1>
    </div>
  )

  successView = () => {
    const {repoData} = this.state

    return (
      <ul className="all-repo">
        {repoData.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderRespectiveViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.success:
        return this.successView()

      case statusConstants.failure:
        return this.failureView()

      case statusConstants.loading:
        return this.loadingView()

      default:
        return null
    }
  }

  clickFilter = newId => {
    this.setState({activeFilter: newId}, this.getRepository)
  }

  render() {
    const {activeFilter} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading"> Popular </h1>
        <div className="header-list">
          <nav>
            <ul className="list-container">
              {languageFiltersData.map(eachItem => (
                <LanguageFilterItem
                  key={eachItem.id}
                  filterData={eachItem}
                  clickFilter={this.clickFilter}
                  isActive={eachItem.id === activeFilter}
                />
              ))}
            </ul>
          </nav>
        </div>
        <div className="all-repos">{this.renderRespectiveViews()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos

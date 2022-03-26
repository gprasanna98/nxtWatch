import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gameVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGameVideos()
  }

  getGameVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(product => ({
        title: product.title,
        thumbnailUrl: product.thumbnail_url,
        id: product.id,
        viewCount: product.view_count,
      }))
      this.setState({
        gameVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideosSuccessView = () => {
    const {gameVideos} = this.state
    console.log(gameVideos)
    if (gameVideos.length !== 0) {
      return (
        <>
          <ul className="gaming-videos-container">
            {gameVideos.map(eachItem => (
              <Link to={`/videos/${eachItem.id}`} className="anchor-link">
                <li key={eachItem.id} gameDetails={eachItem}>
                  <div className="video-container">
                    <img
                      className="gaming-image"
                      src={eachItem.thumbnailUrl}
                      alt="video thumbnail"
                    />

                    <p className="gaming-title">{eachItem.title}</p>
                    <p className="gaming-viewcount">{eachItem.viewCount}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </>
      )
    }
    return (
      <div className="videosDiv1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="img10"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button type="button" className="button6" onClick={this.clickingRetry}>
          Retry
        </button>
      </div>
    )
  }

  clickingRetry = () => this.getGameVideos

  renderVideosFailureView = () => (
    <div className="videosDiv1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="img10"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" className="button6" onClick={this.clickingRetry()}>
        Retry
      </button>
    </div>
  )

  renderGameVideos = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosSuccessView()
      case apiStatusConstants.failure:
        return this.renderVideosFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="sidebar-gaming-container">
          <Sidebar />
          <div className="gaming-container">
            <div className="gaming-banner-image">
              <div className="icon-gaming">
                <SiYoutubegaming />
                <h1>Gaming</h1>
              </div>
            </div>
            {this.renderGameVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming

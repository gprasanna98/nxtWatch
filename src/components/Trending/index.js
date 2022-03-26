import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        trendingVideos: updatedData,
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
    const {trendingVideos} = this.state
    console.log(trendingVideos)
    return (
      <>
        <ul className="trending-videos-container">
          {trendingVideos.map(eachItem => (
            <Link to={`/videos/${eachItem.id}`} className="anchor-link">
              <li key={eachItem.id} trendingDetails={eachItem}>
                <div className="trending-video-container">
                  <div>
                    <img
                      className="trending-image"
                      src={eachItem.thumbnailUrl}
                      alt="video thumbnail"
                    />
                  </div>
                  <div className="image-description-container">
                    <img
                      src={eachItem.profileImageUrl}
                      className="img9"
                      alt="channel logo"
                    />
                    <h1 className="trending-title">{eachItem.title}</h1>
                    <p className="trending"> {eachItem.name}</p>
                    <div className="trending-viewcount-container">
                      <p className="trending">{eachItem.viewCount}</p>
                      <p className="trending">{eachItem.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  clickingRetry = () => this.getTrendingVideos

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

  renderTrendingVideos = () => {
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
        <div className="sidebar-trending-container">
          <Sidebar />
          <div className="trending-container">
            <div className="trending-banner-image">
              <h1>Trending</h1>
            </div>
            {this.renderTrendingVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default Trending

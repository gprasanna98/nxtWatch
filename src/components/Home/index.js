import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import VideoCard from '../VideoCard'
import Sidebar from '../Sidebar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isbanner: true,
    searchInput: '',
    videos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoPlayerList()
  }

  getVideoPlayerList = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log(searchInput)
    const jwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(product => ({
        title: product.title,
        publishedAt: product.published_at,
        thumbnailUrl: product.thumbnail_url,
        id: product.id,
        name: product.channel.name,
        profileImageUrl: product.channel.profile_image_url,
        viewCount: product.view_count,
      }))
      this.setState({
        videos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderSuccessView = () => {
    const {videos} = this.state
    console.log(videos)
    if (videos.length !== 0) {
      return (
        <ul className="video-menu-container">
          {videos.map(eachVideo => (
            <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
          ))}
        </ul>
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

  clickingRetry = () => this.getVideoPlayerList()

  renderFailureView = () => (
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

  renderLoaderView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  clickSearchInput = () => {
    this.getVideoPlayerList()
  }

  onClickBanner = () => this.setState({isbanner: false})

  render() {
    const {isbanner} = this.state
    return (
      <>
        <Header />
        <div className="middle-container">
          <Sidebar />
          <div className="main-list-container">
            {isbanner ? (
              <div className="card-container" data-testid="banner">
                <button
                  type="button"
                  className="close-icon"
                  data-testid="close"
                >
                  <AiOutlineClose onClick={this.onClickBanner} />
                </button>
                <div className="premium-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="image"
                  />
                  <p className="description">
                    Buy Nxt Watch Premium Prepaid Plans With UPI
                  </p>
                  <button type="button" className="get-it-now">
                    GET IT NOW
                  </button>
                </div>
              </div>
            ) : null}
            <div className="search-list-container">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search"
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon"
                  onClick={this.clickSearchInput}
                >
                  <AiOutlineSearch />
                </button>
              </div>
              <div className="players-list-container">
                {this.renderVideosList()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Home

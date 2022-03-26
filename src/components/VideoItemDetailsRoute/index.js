import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiSave} from 'react-icons/bi'
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class VideoItemDetailsRoute extends Component {
  state = {
    isactive: false,
    isDisLikeActive: false,
    isSaveActive: false,
    apiStatus: apiStatusConstants.initial,
    videoData: {},
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const update = {
        videoDetails: fetchedData.video_details,
      }
      const updatedData = {
        id: update.videoDetails.id,
        title: update.videoDetails.title,
        videoUrl: update.videoDetails.video_url,
        thumbnailUrl: update.videoDetails.thumbnail_url,
        name: update.videoDetails.channel.name,
        profileImageUrl: update.videoDetails.channel.profile_image_url,
        subscriberCount: update.videoDetails.channel.subscriber_count,
        viewCount: update.videoDetails.view_count,
        publishedAt: update.videoDetails.published_at,
        description: update.videoDetails.description,
      }
      console.log(updatedData)
      this.setState({
        videoData: updatedData,
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

  renderFailure = () => (
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

  renderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {videoData, isactive, isDisLikeActive, isSaveActive} = this.state
        const {
          title,
          videoUrl,

          publishedAt,
          viewCount,
          description,
          name,
          profileImageUrl,
          subscriberCount,
        } = videoData

        const clickIconButton = () => {
          this.setState(prevState => ({isactive: !prevState.isactive}))
        }

        const clickDisLikeIconButton = () => {
          this.setState(prevState => ({
            isDisLikeActive: !prevState.isDisLikeActive,
          }))
        }

        const savingItemText = isSaveActive ? 'Saved' : 'Save'
        const {addSaveItems} = value
        const clickSaveIconButton = () => {
          addSaveItems(videoData)
          if (isSaveActive) {
            this.setState({isSaveActive: false})
          } else {
            this.setState({isSaveActive: true})
          }
        }

        return (
          <>
            <div className="video-item-container">
              <div className="video">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  className="video-container1"
                />
              </div>
              <div>
                <p className="video-title">{title}</p>
                <div className="video-name-container">
                  <div className="count-container">
                    <p className="viewcount">{viewCount}</p>
                    <p className="viewcount">. {publishedAt}</p>
                  </div>
                  <div className="button-container">
                    <div className="specific-button">
                      <button
                        type="button"
                        className={isactive ? 'active-button ' : 'button'}
                        onClick={clickIconButton}
                      >
                        <BiLike />
                        Like
                      </button>
                    </div>
                    <div className="specific-button">
                      <button
                        type="button"
                        className={
                          isDisLikeActive ? 'active-button ' : 'button'
                        }
                        onClick={clickDisLikeIconButton}
                      >
                        <BiDislike />
                        Dislike
                      </button>
                    </div>
                    <button
                      type="button"
                      className={isSaveActive ? 'active-button ' : 'button'}
                      onClick={clickSaveIconButton}
                    >
                      <BiSave />
                      {savingItemText}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="name-profile-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="name-profile-image"
                />
                <div className="name-container">
                  <p>{name}</p>
                  <p>{subscriberCount}</p>
                  <p className="video-details">{description}</p>
                </div>
              </div>
              <p className="video-description">{description}</p>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderVideoItemDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="video-details-container">
          <Sidebar />
          <div className="video-Items">{this.renderVideoItemDetails()}</div>
        </div>
      </>
    )
  }
}

export default VideoItemDetailsRoute

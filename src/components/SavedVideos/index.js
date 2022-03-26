import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Trending from '../Trending'
import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'

class SavedVideos extends Component {
  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedItems} = value
        if (savedItems.length !== 0) {
          return (
            <ul className="videosDiv">
              {savedItems.map(each => (
                <Trending each={each} key={each.id} />
              ))}
            </ul>
          )
        }
        return (
          <div className="videosDiv1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="img10"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
            <button
              type="button"
              className="button6"
              onClick={this.clickingRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="sidebar-trending-container">
          <Sidebar />
          <div className="trending-container">
            <div className="trending-banner-image">
              <AiFillFire />
              <h1>Saved Videos</h1>
            </div>
            {this.renderSavedVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos

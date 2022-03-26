import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {BiSun} from 'react-icons/bi'
import {BsMoon} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {HeaderMainDiv} from './styledComponents'
import LogoutPopup from '../LogoutPopup'

import NxtWatchContext from '../../Context/NxtWatchContext'

import './index.css'

const Header = props => {
  const logoutPage = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const cancelLogout = () => {
    const {history} = props
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isTheme, themeIsClicked} = value
        const themeClicked = () => {
          themeIsClicked()
        }
        const websiteLogo = isTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const bgColor = isTheme ? '#212121' : '#ffffff'
        return (
          <HeaderMainDiv bgColor={bgColor}>
            <Link to="/">
              <img
                src={websiteLogo}
                alt="website logo"
                className="logo-image"
              />
            </Link>
            <div className="header-logout-container">
              <button
                type="button"
                className="light-darkmode-button"
                onClick={themeClicked}
                data-testid="theme"
              >
                {isTheme ? (
                  <BiSun className="quantity-controller-icon1" />
                ) : (
                  <BsMoon className="quantity-controller-icon" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-image"
              />
              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-button">
                      Logout
                    </button>
                  }
                >
                  <LogoutPopup
                    logoutPage={logoutPage}
                    cancelLogout={cancelLogout}
                  />
                </Popup>
              </div>
            </div>
          </HeaderMainDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default withRouter(Header)

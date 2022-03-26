import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire, AiOutlineSave} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'

import './index.css'

const Sidebar = () => (
  <>
    <div className="sidebar-container">
      <div>
        <Link to="/" className="anchor-link">
          <div className="menu-container">
            <AiFillHome className="menu-icon" />
            <p className="text-menu">Home</p>
          </div>
        </Link>
        <Link to="/trending" className="anchor-link">
          <div className="menu-container">
            <AiFillFire className="menu-icon" />
            <p className="text-menu">Trending</p>
          </div>
        </Link>
        <Link to="/gaming" className="anchor-link">
          <div className="menu-container">
            <SiYoutubegaming className="menu-icon" />
            <p className="text-menu">Gaming</p>
          </div>
        </Link>
        <Link to="/saved-videos" className="anchor-link">
          <div className="menu-container">
            <AiOutlineSave className="menu-icon" />
            <p className="text-menu">Saved videos</p>
          </div>
        </Link>
      </div>
      <div className="contact-info-container">
        <p className="contact-us-heading">CONTACT US</p>
        <div className="social-media-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-media-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-media-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-media-logo"
          />
        </div>
        <p className="contact-description">
          Enjoy! Now to see your
          <br /> channels and
          <br /> recommandations!
        </p>
      </div>
    </div>
  </>
)

export default Sidebar

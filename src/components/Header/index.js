import './index.css'

import {IoMdCloseCircleOutline} from 'react-icons/io'
import {Link} from 'react-router-dom'
import ContextData from '../../Context/contextData'

const Header = () => (
  <>
    <ContextData.Consumer>
      {value => {
        const {isNavMenuBtn, toggleNavMenuBtn} = value
        return (
          <>
            <nav className="mobile-view-header-container">
              <ul className="mobile-view-header-list-container">
                <li>
                  <img
                    src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741063329/COVID19INDIA_1_tpuunl.png"
                    alt="website-logo"
                    className="mobile-view-logo-img"
                  />
                </li>
                <li>
                  <button
                    onClick={() => toggleNavMenuBtn()}
                    className="mobile-view-header-menu-btn"
                    type="button"
                  >
                    <img
                      src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741066888/add-to-queue_1_ftaofc.png"
                      alt="menu-option-button"
                    />
                  </button>
                </li>
              </ul>
            </nav>
            {isNavMenuBtn && (
              <div className="mobile-view-menu-option-container">
                <div className="mobile-view-menu-option-list">
                  <Link to="/" className="link-item">
                    <p className="mobile-view-option-title">Home</p>
                  </Link>
                  <Link to="/about" className="link-item">
                    <p className="mobile-view-option-title">About</p>
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNavMenuBtn()}
                  className="mobile-view-menu-option-btn"
                >
                  <IoMdCloseCircleOutline className="mobile-view-menu-option-cancel-btn" />
                </button>
              </div>
            )}
          </>
        )
      }}
    </ContextData.Consumer>

    <nav className="desktop-header-container">
      <ul className="desktop-header-list-container">
        <li>
          <img
            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741063329/COVID19INDIA_1_tpuunl.png"
            alt="website-logo"
            className="desktop-header-img"
          />
        </li>
        <li>
          <div className="desktop-header-menu-option-container">
            <Link className="link-item" to="/">
              <p className="desktop-header-menu-title">Home</p>
            </Link>
            <Link className="link-item" to="/about">
              <p className="desktop-header-menu-title">About</p>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  </>
)

export default Header

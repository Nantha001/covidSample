import './index.css'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

const Footer = () => (
  <>
    <div className="footer-container">
      <img
        src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741419118/COVID19INDIA_2_lxxcbw.png"
        alt="website-logo"
        className="footer-web-logo"
      />
      <p className="footer-content">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-logo-container">
        <VscGithubAlt className="footer-web-icon" />
        <FiInstagram className="footer-web-icon" />
        <FaTwitter className="footer-web-icon" />
      </div>
    </div>
  </>
)

export default Footer

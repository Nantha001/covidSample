import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusOption = {
  loadingView: 'loading',
  successView: 'success',
  failureView: 'failure',
}

class About extends Component {
  state = {apiStatus: apiStatusOption.loadingView, aboutDataList: []}

  componentDidMount() {
    this.aboutApiCall()
  }

  aboutApiCall = async () => {
    this.setState({apiStatus: apiStatusOption.loadingView})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        aboutDataList: data,
        apiStatus: apiStatusOption.successView,
      })
    } else {
      this.setState({apiStatus: apiStatusOption.failureView})
    }
  }

  successView = () => <div className="about-main-container" />

  loadingView = () => (
    <div className="loading-view-container">
      <Loader type="TailSpin" color="yellow" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <>
      <div className="failure-view-container">
        <h1 style={{color: 'red'}}>
          <span style={{color: 'white'}}>Data fetch</span> Error!
        </h1>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <div className="bg-about-container">
          <Header />

          {apiStatus === apiStatusOption.loadingView && this.loadingView()}
          {apiStatus === apiStatusOption.successView && this.successView()}
          {apiStatus === apiStatusOption.failureView && this.failureView()}
        </div>
      </>
    )
  }
}

export default About

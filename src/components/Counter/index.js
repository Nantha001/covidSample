import './index.css'

const Counter = props => {
  const {totalConfirmed, totalActive, totalDeceased, totalRecovered} = props
  return (
    <>
      <div className="covid-content-counter-container">
        <div className="covid-content-counter-card">
          <p className="confirmed-text">Confirmed</p>
          <img
            className="confirmed-icon"
            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741110286/check-mark_1_tjusdn.png"
            alt=""
          />
          <h1 className="confirmed-count">{totalConfirmed}</h1>
        </div>
        <div className="covid-content-counter-card">
          <p className="active-text">Active</p>
          <img
            className="active-icon"
            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741110343/protection_2_ucfhcn.png"
            alt=""
          />
          <h1 className="active-count">{totalActive}</h1>
        </div>
        <div className="covid-content-counter-card">
          <p className="recovered-text">Recovered</p>

          <img
            className="recovered-icon"
            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741110286/recovered_1_o2oow5.png"
            alt=""
          />
          <h1 className="recovered-count">{totalRecovered}</h1>
        </div>
        <div className="covid-content-counter-card">
          <p className="deceased-text">Deceased</p>
          <img
            className="deceased-icon"
            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1741110286/breathing_1_telvyr.png"
            alt=""
          />
          <h1 className="deceased-count">{totalDeceased}</h1>
        </div>
      </div>
    </>
  )
}

export default Counter

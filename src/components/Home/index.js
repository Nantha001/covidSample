import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  FcGenericSortingAsc,
  FcGenericSortingDesc,
  FcSearch,
} from 'react-icons/fc'
import {BsArrowRightSquareFill} from 'react-icons/bs'

import Header from '../Header'
import Counter from '../Counter'
import Footer from '../Footer'
import './index.css'

const apiStatusOption = {
  loadingView: true,
  successView: 'success',
  failureView: 'failure',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    covidDataObject: {},
    apiStatus: apiStatusOption.loadingView,
    isOrder: true,
    searchInput: '',
  }

  componentDidMount() {
    this.covidApiCall()
  }

  onClickAscBtn = () => {
    this.setState({isOrder: true})
  }

  onClickDescBtn = () => {
    this.setState({isOrder: false})
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  covidApiCall = async () => {
    this.setState({apiStatus: apiStatusOption.loadingView})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const method = {method: 'GET'}
    const response = await fetch(url, method)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        covidDataObject: data,
        apiStatus: apiStatusOption.successView,
      })
    } else {
      this.setState({apiStatus: apiStatusOption.failureView})
    }
  }

  objectDataConvertToArray = () => {
    const {covidDataObject} = this.state
    if (!covidDataObject) {
      return []
    }

    const resultData = []
    const keyNames = Object.keys(covidDataObject)
    keyNames.forEach(eachKeyName => {
      if (covidDataObject[eachKeyName]) {
        const {total} = covidDataObject[eachKeyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const population = covidDataObject[eachKeyName].meta.population
          ? covidDataObject[eachKeyName].meta.population
          : 0

        resultData.push({
          stateCode: eachKeyName,
          name:
            statesList.find(state => state.state_code === eachKeyName)
              ?.state_name || 'Unknown',

          confirmed,
          deceased,
          recovered,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultData
  }

  successView = () => {
    const {covidDataObject, isOrder, searchInput} = this.state
    const stateDataTableList = this.objectDataConvertToArray().sort((a, b) =>
      isOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    )

    const searchFilter = statesList.filter(each => {
      const searchLowerCase = searchInput.toLocaleLowerCase()
      return each.state_code.toLowerCase().includes(searchLowerCase)
    })

    const searchData = searchInput === '' ? [] : searchFilter

    console.log(searchData)

    let totalConfirmed = 0
    let totalRecovered = 0
    let totalDeceased = 0
    Object.keys(covidDataObject).forEach(eachStateCode => {
      if (eachStateCode) {
        totalConfirmed += covidDataObject[eachStateCode].total.confirmed || 0
        totalRecovered += covidDataObject[eachStateCode].total.recovered || 0
        totalDeceased += covidDataObject[eachStateCode].total.deceased || 0
      }
    })

    const totalActive = totalConfirmed - (totalRecovered + totalDeceased)

    return (
      <>
        <div className="covid-content-main-container">
          <div className="search-container">
            <FcSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Enter the State"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
          <ul className="search-list-container">
            {searchData.map(each => (
              <>
                <li className="search-list-item">
                  <p className="search-name">{each.state_name}</p>
                  <div className="state-code-container">
                    <p className="search-code">{each.state_code}</p>
                    <BsArrowRightSquareFill className="search-arrow-icon" />
                  </div>
                </li>
              </>
            ))}
          </ul>
          <Counter
            totalConfirmed={totalConfirmed}
            totalRecovered={totalRecovered}
            totalDeceased={totalDeceased}
            totalActive={totalActive}
          />

          <ul className="state-info-table-container">
            <li className="table-header-row-list-container border">
              <div className="table-header-row-btn-container ">
                <p>States/UT</p>
                <button
                  onClick={this.onClickAscBtn}
                  className="asc-icon-btn"
                  type="button"
                >
                  <FcGenericSortingAsc className="icon" />
                </button>
                <button
                  onClick={this.onClickDescBtn}
                  className="desc-icon-btn"
                  type="button"
                >
                  <FcGenericSortingDesc className="icon" />
                </button>
              </div>
              <p className="table-header-row-text">Confirmed</p>
              <p className="table-header-row-text">Active</p>
              <p className="table-header-row-text">Recovered</p>
              <p className="table-header-row-text">Deceased</p>
              <p className="table-header-row-text">Population</p>
            </li>
            {stateDataTableList.map(each => (
              <li
                className="table-body-row-list-container"
                key={each.stateCode}
              >
                <p className="table-body-row-text">{each.name}</p>
                <p className="table-body-row-text confirmed">
                  {each.confirmed}
                </p>
                <p className="table-body-row-text active">{each.active}</p>
                <p className="table-body-row-text recovered">
                  {each.recovered}
                </p>
                <p className="table-body-row-text deceased">{each.deceased}</p>
                <p className="table-body-row-text population">
                  {each.population}
                </p>
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }

  loadingView = () => (
    <div className="loading-view-container">
      <Loader type="TailSpin" color="yellow" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <h1 style={{color: 'red'}}>
        <span style={{color: 'white'}}>Data fetch</span> Error!
      </h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <div className="bg-home-container">
          <Header />
          {apiStatus === apiStatusOption.loadingView && this.loadingView()}
          {apiStatus === apiStatusOption.successView && this.successView()}
          {apiStatus === apiStatusOption.failureView && this.failureView()}
        </div>
      </>
    )
  }
}

export default Home

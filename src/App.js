import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import ContextData from './Context/contextData'

class App extends Component {
  state = {isNavMenuBtn: false}

  toggleNavMenuBtn = () => {
    this.setState(prevState => ({isNavMenuBtn: !prevState.isNavMenuBtn}))
  }

  render() {
    const {isNavMenuBtn} = this.state

    return (
      <>
        <ContextData.Provider
          value={{isNavMenuBtn, toggleNavMenuBtn: this.toggleNavMenuBtn}}
        >
          <div className="main-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </ContextData.Provider>
      </>
    )
  }
}

export default App

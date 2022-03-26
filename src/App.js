import Component from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import NxtWatchContext from './Context/NxtWatchContext'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import NotFound from './components/NotFound'
// eslint-disable-next-line import/extensions

class App extends Component {
  state = {isTheme: false, savedItems: []}

  addSaveItems = item => {
    const {savedItems} = this.state
    const productObject = savedItems.find(
      eachCartItem => eachCartItem.id === item.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        savedItems: prevState.savedItems.filter(each => each.id !== item.id),
      }))
    } else {
      const updatedCartList = [...savedItems, item]
      this.setState({savedItems: updatedCartList})
    }
  }

  themeIsClicked = () => {
    const {isTheme} = this.state
    if (isTheme) {
      this.setState({isTheme: false})
    } else {
      this.setState({isTheme: true})
    }
  }

  render() {
    const {isTheme, savedItems} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          savedItems,
          addSaveItems: this.addSaveItems,
          isTheme,
          ThemeIsClicked: this.themeIsClicked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute component={NotFound} />
          <Redirect component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App

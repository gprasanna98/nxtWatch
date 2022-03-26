import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isActive: false,
    errorMsg: '',
    isShowPassword: false,
  }

  loginSuccess = dataJwtToken => {
    console.log(dataJwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', dataJwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({
      isActive: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    console.log('submit')
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, option)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    const {username} = this.state
    this.setState({
      username: event.target.value,
    })
    console.log(username)
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderPassword = () => {
    const {password, isShowPassword} = this.state
    const showPasswordInput = isShowPassword ? 'text' : 'password'
    return (
      <div className="password-container">
        <label htmlFor="password" className="username-password-field">
          PASSWORD
        </label>
        <br />
        <input
          type={showPasswordInput}
          value={password}
          id="password"
          className="username-password"
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="username-password-field">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          className="username-password"
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  showPassword = () => {
    const {isShowPassword} = this.state
    console.log(isShowPassword)
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  render() {
    const {isActive, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt=""
            className="logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            {this.renderUsername()}
            {this.renderPassword()}
            <div className="checkbox-container">
              <input
                id="checkbox"
                type="checkbox"
                className="checkbox"
                onChange={this.showPassword}
              />
              <label htmlFor="checkbox" className="show-password">
                Show Password
              </label>
            </div>
            <button type="submit" className="button">
              Login
            </button>
            {isActive && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

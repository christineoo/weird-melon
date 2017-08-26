import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loginUser, logoutUser } from '../../actions/auth';
import Toolbar from './Toolbar';
import Popover from '../Modal/Popover';
import '../Modal/Popover.scss';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class Header extends Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    const { dispatch } = this.props;
    dispatch(loginUser());
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  renderNavUser() {
    const { auth } = this.props;
    if (auth.user) {
      return (
          <Popover className="nav-user">
              <div className="nav-user-link">
                  <img className="nav-authed-image" src={auth.user.photoURL} />
                  <i className="fa fa-chevron-down" aria-hidden="true" />
                  <i className="fa fa-chevron-up" aria-hidden="true" />
              </div>
              <div className="nav-user-popover popover-content">
                  <ul className="nav-user-popover-list">
                      <Link className="button-new" to={'/new_post'}>New Post</Link>
                      <li className="nav-user-popover-item">
                          <p>{auth.user.displayName}</p>
                          <a href="#" onClick={this.logout}>Log Out</a>
                      </li>
                  </ul>
              </div>
          </Popover>
            );
    }

    return (
        <Popover className="nav-user">
            <div className="nav-user-link">
                <i className="fa fa-user" aria-hidden="true" />
                <i className="fa fa-chevron-down" aria-hidden="true" />
                <i className="fa fa-chevron-up" aria-hidden="true" />
            </div>
            <div className="nav-nav-item">
                <div className="nav-user-popover popover-content">
                    <ul className="nav-user-popover-list">
                        <li className="nav-user-popover-item">
                            <a href="#" className="signin-button" onClick={this.login}>
                                    Sign in using Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Popover>
        );
  }
  render() {
    return (
        <div className="navigation-header">
            <div className="grid">
                <div className="title">
                    <Link to={'/posts'}>Weird Melon</Link>
                    <div className="user">
                        {this.renderNavUser()}
                    </div>
                </div>
            </div>
            <Toolbar />
        </div>
        );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

Header.propTypes = propTypes;
export default Header;

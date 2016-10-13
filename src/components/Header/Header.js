import React, { Component, PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';
// import Link from '../Link';
import { loginUser, logoutUser } from '../../actions/auth';
import Toolbar from './Toolbar';
import Popover from '../Modal/Popover';
import '../Modal/Popover.scss';
import styles from './Header.scss';
import classNames from 'classnames';
import { Link } from 'react-router'

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class Header extends Component {
    constructor(props){
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
        const { dispatch } = this.props;
        if (auth.user) {
            return (
                <Popover className="nav-user">
                    <div className="nav-user-link">
                        <img className="nav-authed-image" src={auth.user.photoURL} />
                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        <i className="fa fa-chevron-up" aria-hidden="true"></i>
                    </div>
                    <div className="nav-user-popover popover-content">
                        <ul className="nav-user-popover-list">
                                <Link className='edit-button' to={'/new_post'}>New Post</Link>
                            <li className="nav-user-popover-item">
                                <p>{auth.user.displayName}</p>
                                <a href="#" onClick={this.logout}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            )
        }

        return (
            <Popover className="nav-user">
                <div className="nav-user-link">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    <i className="fa fa-chevron-up" aria-hidden="true"></i>
                </div>
                <div className="nav-nav-item">
                    <div className="nav-user-popover popover-content">
                        <ul className="nav-user-popover-list">
                            <li className="nav-user-popover-item">
                                <a href="#" className="button orange block" onClick={this.login}>
                                    Sign into Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Popover>
        )
    }
    render() {

        return (
            <div className="navigation-header">
                <div className="grid">
                    <div className="title">
                        Weird Melons
                        <div className="user">
                            {this.renderNavUser()}
                        </div>
                    </div>
                </div>
                <Toolbar />
            </div>
        )
    }
}

Header.propTypes = propTypes
export default Header

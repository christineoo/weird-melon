import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class HeaderContainer extends Component {
  render() {
    console.log('HeaderContainer: ', this.props);

    return <Header {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth
  };
}


export default connect(mapStateToProps)(HeaderContainer);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const propTypes = {
  isMobile: PropTypes.bool
};

class HeaderContainer extends Component {
  render() {
    console.log('HeaderContainer: ', this.props);

    return <Header {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { auth, entities, environment, navigator } = state;

  return {
    auth
  };
}

HeaderContainer.propTypes = propTypes;

export default connect(mapStateToProps)(HeaderContainer);

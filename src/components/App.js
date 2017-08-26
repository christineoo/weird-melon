import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initNavigator } from '../actions/navigator';
import { initAuth } from '../actions/auth';
import HeaderContainer from '../containers/HeaderContainer';

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth());
    dispatch(initNavigator());
  }

  render() {
        // let renderContent = this.props.children ? this.props.children : <Post />;
    const renderContent = this.props.children;

    return (
        <section>
            <HeaderContainer />
            {renderContent}
        </section>
        );
  }
}

function mapStateToProps(state) {
  const { navigator } = state;
  const { path } = navigator.route;

  return {
    path
  };
}

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

App.propTypes = propTypes;

export default connect(mapStateToProps)(App);

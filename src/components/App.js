import React from 'react';
import { initNavigator } from '../actions/navigator';
import { initAuth } from '../actions/auth';
import { connect } from 'react-redux';
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


export default connect(mapStateToProps)(App);

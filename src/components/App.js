import React from 'react';
import { Link } from 'react-router'
// import { initNavigator } from '../actions/navigator';
import { initAuth } from '../actions/auth';
import { connect } from 'react-redux';
import HeaderContainer from '../containers/HeaderContainer';
import Post from '../components/Post/Post';


class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initAuth());
    }
    render() {
        let renderContent = this.props.children ? this.props.children : <Post />;
        return (
            <section>
                <HeaderContainer />
                {renderContent}
            </section>
        );
    }
}

export default App;

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { path } = navigator.route;

  return {
    path,
  };
}


export default connect(mapStateToProps)(App);

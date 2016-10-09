import React from 'react';
import { initNavigator } from '../actions/navigator';
import { initAuth } from '../actions/auth';
import { connect } from 'react-redux';
import HeaderContainer from '../containers/HeaderContainer';
import Post from '../components/Post/Post';
import View from '../components/Post/View';
import Edit from '../components/Post/Edit';
import New from '../components/Post/New';


class App extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initAuth());
        dispatch(initNavigator());
    }

    renderContent() {
        const { path } = this.props;
        switch (path[0]) {
            case 'posts':
                return <Post />;

            case 'view':
                return <View />;

            case 'edit':
                return <Edit />;

            case 'new_post':
                return <New />;

            default:
                return null;
        }
    }

    render() {
        // let renderContent = this.props.children ? this.props.children : <Post />;
        let renderContent = this.props.children;

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

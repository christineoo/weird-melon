import React from 'react';
import HeaderContainer from './containers/HeaderContainer';

class AppContainer extends React.Component {

    render() {
        return (
            <section>
                <HeaderContainer />
                {this.props.children}
            </section>
        );
    }
}

export default AppContainer;

import React, { PropTypes } from 'react';
import HeaderContainer from './containers/HeaderContainer';

const AppContainer = ({ children }) => (
    <section>
        <HeaderContainer />
        {children}
    </section>
);

const propTypes = {
  children: PropTypes.object.isRequired
};

AppContainer.propTypes = propTypes;

export default AppContainer;

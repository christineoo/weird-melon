import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Link from '../Link';
import { CATEGORY } from '../../constants/CategoryConstants';

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  renderCategory() {
    const { dispatch } = this.props;
    return CATEGORY.map((c) => {
      const route = {
        path: ['posts'],
        query: {
          q: c
        }
      };
      return (
          <Link className={classNames('toolbar-item', 'toolbar-genre')}
            dispatch={dispatch}
            key={c}
            route={route}
          >
              {c}
          </Link>
            );
    });
  }

  render() {
    return (
        <div className="toolbar">
            <div className="grid">
                <div className="toolbar-items">
                    {/*{this.renderCategory()}*/}
                </div>
            </div>
        </div>
    ); }
}

function mapStateToProps(state) {
  const { navigator } = state;
  const { path } = navigator.route;

  return {
    path
  };
}

Toolbar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Toolbar);

import React, { Component } from 'react';
import { CATEGORY } from '../../constants/CategoryConstants';
import styles from './Toolbar.scss';
import classNames from 'classnames';
import Link from '../Link';
import { connect } from 'react-redux';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    renderCategory() {
        const { dispatch } = this.props;
        return CATEGORY.map(c => {
            const route = {
                path: ['posts'],
                query: {
                    q: c,
                },
            }
            return (
                <Link className={classNames("toolbar-item", "toolbar-genre")}
                    dispatch={dispatch}
                    key={c}
                    route={route}
                >
                    {c}
                </Link>
            )
        })
    }

    render() {
        return (
            <div className="toolbar">
                <div className="grid">
                    <div className="toolbar-items">
                        {this.renderCategory()}
                    </div>
                </div>
            </div>
    )}
}

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { path } = navigator.route;

  return {
    path,
  };
}


export default connect(mapStateToProps)(Toolbar);

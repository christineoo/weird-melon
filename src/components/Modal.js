import React, { Component, PropTypes } from 'react';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    modal: PropTypes.string.isRequired
};

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        const { dispatch } = this.props;
        dispatch(changeModal(null));
    }

    render() {
        return (
            <div className="modal" onClick={this.closeModal}>

            </div>
        )
    }
}

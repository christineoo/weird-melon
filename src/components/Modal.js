import React, { Component, PropTypes } from 'react';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class Modal extends Component {
  closeModal = () => {
    const { dispatch } = this.props;
    dispatch(changeModal(null));
  }

  render() {
    return (
        <div className="modal" onClick={this.closeModal} />
        );
  }
}

Modal.propTypes = propTypes;

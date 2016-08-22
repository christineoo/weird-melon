import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './Popover.scss';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

class Popover extends Component {
    constructor(props) {
        super(props);

        if (props.children.length !== 2) {
            throw new Error('Popover component requires exactly 2 children');
        }
        this.state = { isOpen: false };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick);
    }

    onOutsideClick = (e) => {
        if (!this.state.isOpen) {
            return;
        }

        e.stopPropagation();
        const popover = ReactDOM.findDOMNode(this.refs.popover);

        if(!popover.contains(e.target)){
            this.setState({
                isOpen: false
            });
        }
    }

    toggleIsOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isOpen } = this.state;
        const { className, children } = this.props;

        return (
            <div
                className={`${className} popover ${(isOpen ? ' open' : '')}`}
                onClick={this.toggleIsOpen}
                ref='popover'
            >
                {children[0]}
                {isOpen ? children[1] : null}
            </div>
        );
    }
}

Popover.propTypes = propTypes;

export default Popover;

import React from 'react';
import PropTypes from 'prop-types';

export default class KeyListener extends React.Component {
  static propTypes = {
    onKeyDownArrow: PropTypes.func,
    onKeyUpArrow: PropTypes.func,
    onKeyEnter: PropTypes.func,
  };

  static defaultProps = {
    onKeyDownArrow: () => null,
    onKeyUpArrow: () => null,
    onKeyEnter: () => null,
  };

  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowDown': 
        return this.props.onKeyDownArrow();
      case 'ArrowUp': 
        return this.props.onKeyUpArrow();
      case 'Enter': 
        return this.props.onKeyEnter();
    }
  };

  render() {
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown}>
        {this.props.children}
      </div>
    );
  }
}


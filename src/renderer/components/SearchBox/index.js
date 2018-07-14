import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Suggestion from '../Suggestion';
import KeyListener from '../KeyListener';

import styles from './styles.scss';

class SearchBox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onEscape: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    query: PropTypes.string,
  };

  static defaultProps = {
    query: '',
  };

  state = {
    highlightedIndex: -1,
  };

  handleChange = event => this.props.onChange(event.target.value);

  handleKeyEnter = () => {
    this.props.onSelect(this.props.suggestions[this.state.highlightedIndex]);
  }

  handleKeyDownArrow = () => {
    const highlightedIndex = this.state.highlightedIndex === (this.props.suggestions.length - 1)
      ? 0
      : this.state.highlightedIndex + 1;

    this.setState(() => ({
      highlightedIndex,
    }));
  }

  handleKeyUpArrow = () => {
    const highlightedIndex = this.state.highlightedIndex < 1
      ? this.props.suggestions.length - 1
      : this.state.highlightedIndex - 1;

    this.setState(() => ({
      highlightedIndex,
    }));
  }

  render() {
    return (
      <KeyListener
        tabIndex="0"
        onKeyDownArrow={this.handleKeyDownArrow}
        onKeyEnter={this.handleKeyEnter}
        onKeyEscape={this.props.onEscape}
        onKeyUpArrow={this.handleKeyUpArrow}
      >
        <TextField
          autoFocus
          InputProps={{
            classes: {
              input: styles.TextField
            },
          }}
          fullWidth
          onChange={this.handleChange}
          placeholder="What do you want to know?"
          value={this.props.query}
        />
        <Paper open={!!this.props.suggestions.length}>
          {this.props.suggestions
            .map((suggestion, index) => ({
              highlighted: this.state.highlightedIndex === index,
              suggestion,
            }))
            .map(({ highlighted, suggestion }) =>
              <Suggestion
                key={suggestion.title}
                description={suggestion.description}
                highlighted={highlighted}
                title={suggestion.title}
                image={suggestion.image}
              />
            )}
        </Paper>
      </KeyListener>
    );
  }
}

export default SearchBox;

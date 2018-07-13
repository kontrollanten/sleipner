import { connect } from 'react-redux';
import SearchBox from '../../components/SearchBox';
import {
  fetchSuggestions,
  selectSuggestion,
  updateSearchValue,
} from './actions';

const mapStateToProps = state => ({
  suggestions: state.searchBox.suggestions,
  query: state.searchBox.query,
});

const mapDispatchToProps = dispatch => ({
  onChange: query => {
    dispatch(updateSearchValue(query));
    dispatch(fetchSuggestions(query));
  },
  onSelect: suggestion => dispatch(selectSuggestion(suggestion)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);

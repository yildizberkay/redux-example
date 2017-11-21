import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../actions/SearchActions';
import SearchInput from '../components/SearchInput';
import PhotoList from '../components/PhotoList';

const propTypes = {
  status: PropTypes.string.isRequired,
  photos: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  status: '',
  photos: [],
};

class SearchApp extends PureComponent {
  render() {
    const actions = bindActionCreators(action, this.props.dispatch);
    return (
      <div>
        <div id="header" className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 search-bar-content">
                <h1>Search on 500px</h1>
                <SearchInput actions={actions} status={this.props.status} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <PhotoList actions={actions} photos={this.props.photos} status={this.props.status} />
        </div>
      </div>
    );
  }
}

SearchApp.propTypes = propTypes;
SearchApp.defaultProps = defaultProps;

const mapStateToProps = state => ({
  photos: state.searchPhotos.photos,
  status: state.searchPhotos.status,
});

export default connect(
  mapStateToProps,
)(SearchApp);
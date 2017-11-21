/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  actions: PropTypes.object,
  status: PropTypes.string,
};

const defaultProps = {
  actions: {},
  status: '',
};

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.searchPhoto = this.searchPhoto.bind(this);
  }

  searchPhoto(event) {
    if (event.which === 13) {
      this.props.actions.searchPhotoAction(this.keyword.value);
      document.getElementById('header').style.animationPlayState = 'running';
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input
            onKeyDown={this.searchPhoto}
            type="text"
            ref={(ref) => { this.keyword = ref; }}
            className="form-control input-lg"
            placeholder="Nature, Sky, Aurora... + Enter"
          />
        </div>
        {
          (() => {
            if (this.props.status === 'PENDING' || this.props.status === 'PENDING_FOR_NEXT') {
              return (<div className="loadingWrapper"><div className="loading" /></div>);
            }
            return (<div />);
          })()
        }
      </div>
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

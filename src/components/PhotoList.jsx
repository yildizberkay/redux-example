import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  actions: PropTypes.object,
  photos: PropTypes.array,
  status: PropTypes.string,
};

const defaultProps = {
  actions: {},
  photos: [],
  status: '',
};

export default class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
  }

  nextPage() {
    this.props.actions.searchNextPageAction();
  }

  render() {
    return (
      <div>
        <div className="row">
          {
            this.props.photos.map(item => (
              <div className="col-md-3 image-item" key={`PhotoItem_${item.id}`}>
                <a href={`https://500px.com${item.url}`} target="_blank"><img alt="ImageAlt" src={item.image_url} /></a>
              </div>
            ))
          }
          <div className="clearfix" />
        </div>

        {
          (() => {
            if (this.props.status === 'DONE') {
              return (
                <div style={{ marginBottom: '20px' }} className="row">
                  <div className="col-md-6 col-md-offset-3">
                    <button
                      onClick={this.nextPage}
                      type="button"
                      className="btn btn-default btn-lg btn-block"
                    >Load More</button>
                  </div>
                </div>
              );
            }
            return (<div />);
          })()
        }
      </div>
    );
  }
}

PhotoList.propTypes = propTypes;
PhotoList.defaultProps = defaultProps;

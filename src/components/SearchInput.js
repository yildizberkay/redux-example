import React, {Component} from 'react';
import ReactDom from 'react-dom';
import PhotoSearch from '../api/PhotoSearch';

export default class SearchInput extends Component {
  searchPhoto(e){
    if(e.which == 13){
      const val = ReactDom.findDOMNode(this.refs.keyword).value;
      this.props.actions.searchPhotoAction(val);

      document.getElementById("header").style.animationPlayState = "running";
    }
  }
  render(){
    return(
      <div>
        <div className="form-group">
          <input onKeyDown={this.searchPhoto.bind(this)} type="text" ref="keyword" className="form-control input-lg" placeholder="Nature, Sky, Aurora... + Enter" />
        </div>
        {()=>{
          if(this.props.status == 'PENDING'){
            return (<div className="loading" />);
          }
        }()}
      </div>
    )
  }
}

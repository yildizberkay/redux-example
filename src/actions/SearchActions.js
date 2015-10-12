import * as types from '../constants/SearchActionTypes';
import PhotoSearch from '../api/PhotoSearch';

function searchWithPhotoAPI(keyword, page, dispatch){
  if(page >= 2){
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT
    });
  }else{
    dispatch({
      type: types.SEARCH_PENDING
    });
  }

  PhotoSearch(keyword, page, (d) => {
    dispatch({
      type: types.SEARCH_DONE,
      photos: d.photos,
      page,
      keyword
    });
  });
}

export function searchNextPageAction(){
  return (dispatch, getState) => {
    const page = getState().photos.page + 1;
    const keyword = getState().photos.keyword;
    searchWithPhotoAPI(keyword, page, dispatch);
  }
}

export function searchPhotoAction(keyword, page = 1){
  return (dispatch, getState) => {
    searchWithPhotoAPI(keyword, page, dispatch);
  }
}

import * as types from '../constants/SearchActionTypes';
import photoSearch from '../api/PhotoSearch';

function searchWithPhotoAPI(keyword, page, dispatch) {
  if (page >= 2) {
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT,
    });
  } else {
    dispatch({
      type: types.SEARCH_PENDING,
    });
  }
  photoSearch(keyword, page, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      photos: data.photos,
      page,
      keyword,
    });
  });
}

export function searchNextPageAction() {
  return (dispatch, getState) => {
    const page = getState().searchPhotos.page + 1;
    const keyword = getState().searchPhotos.keyword;
    searchWithPhotoAPI(keyword, page, dispatch);
  };
}

export function searchPhotoAction(keyword, page = 1) {
  return (dispatch) => {
    searchWithPhotoAPI(keyword, page, dispatch);
  };
}

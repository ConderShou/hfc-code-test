import { changeContentStatus, getContentByUser } from "../../services/content.service";
import { ContentActions } from "../action-types/content-action-types";

export const onSelectContent = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ContentActions.SET_LOADING_CONTENT, payload: true });
    const response = await getContentByUser(userId);
    dispatch({ type: ContentActions.SET_CONTENT_BY_USER, payload: response.data });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: ContentActions.SET_LOADING_CONTENT, payload: false });
  }
};

export const onChangeContentStatus = (userId, contentId, status) => async (dispatch) => {
  try {
    dispatch({ type: ContentActions.SET_LOADING_CHANGE_CONTENT_STATUS, payload: true });
    const response = await changeContentStatus(userId, contentId, status);
    dispatch({ type: ContentActions.CHANGE_CONTENT_STATUS, payload: response.data });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: ContentActions.SET_LOADING_CHANGE_CONTENT_STATUS, payload: false });
  }
};

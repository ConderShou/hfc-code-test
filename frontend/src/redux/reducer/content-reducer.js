import { ContentActions } from "../action-types/content-action-types";

const initialState = {
  allContent: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ContentActions.SET_CONTENT_BY_USER: {
      const { userId, allUserContent } = action.payload;
      return {
          ...state,
          allContent: {
              ...state.allContent,
              [userId]: allUserContent
          }
      }
    }
    case ContentActions.CHANGE_CONTENT_STATUS: {
      const { userId, content } = action.payload;
      const updatedContent = state.allContent[userId].map(currContent => {
        if (currContent.id === content.id) {
            return content;
        }
        return currContent;
      });

      return {
          ...state,
          allContent: {
              ...state.allContent,
              [userId]: updatedContent,
          }
      }
    }
    default:
      return state;
  }
};

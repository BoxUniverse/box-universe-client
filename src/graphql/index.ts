// @index('./**/*.graphql', f => `import ${f.name} from '${f.path}.graphql'`)
import ACCEPT_REQUEST from './mutations/ACCEPT_REQUEST.graphql';
import ADD_MEMBER_CONVERSATION from './mutations/ADD_MEMBER_CONVERSATION.graphql';
import CHANGE_NAME_CONVERSATION from './mutations/CHANGE_NAME_CONVERSATION.graphql';
import COMMENT_POST from './mutations/COMMENT_POST.graphql';
import CREATE_POST from './mutations/CREATE_POST.graphql';
import CREATE_USER from './mutations/CREATE_USER.graphql';
import LIKE_POST from './mutations/LIKE_POST.graphql';
import LOGIN from './mutations/LOGIN.graphql';
import OAUTH from './mutations/OAUTH.graphql';
import REGISTER from './mutations/REGISTER.graphql';
import REJECT_REQUEST from './mutations/REJECT_REQUEST.graphql';
import SEND_FILES from './mutations/SEND_FILES.graphql';
import SEND_MESSAGE from './mutations/SEND_MESSAGE.graphql';
import UNFRIEND from './mutations/UNFRIEND.graphql';
import UNLIKE_POST from './mutations/UNLIKE_POST.graphql';
import UPLOAD_AVATAR from './mutations/UPLOAD_AVATAR.graphql';
import GET_COMMENTS from './queries/GET_COMMENTS.graphql';
import GET_CONVERSATION_BY_FRIEND from './queries/GET_CONVERSATION_BY_FRIEND.graphql';
import GET_CONVERSATION_BY_ID from './queries/GET_CONVERSATION_BY_ID.graphql';
import GET_CONVERSATION_BY_PROFILE_ID from './queries/GET_CONVERSATION_BY_PROFILE_ID.graphql';
import GET_ENTIRE_PROFILE from './queries/GET_ENTIRE_PROFILE.graphql';
import GET_LIST_FRIEND_NOT_IN_CONVERSATION from './queries/GET_LIST_FRIEND_NOT_IN_CONVERSATION.graphql';
import GET_MESSAGES_BY_CONVERSATION_ID from './queries/GET_MESSAGES_BY_CONVERSATION_ID.graphql';
import GET_POSTS from './queries/GET_POSTS.graphql';
import GET_PROFILE from './queries/GET_PROFILE.graphql';
import GET_REQUESTS from './queries/GET_REQUESTS.graphql';
import LIST_USERS from './queries/LIST_USERS.graphql';
import ME from './queries/ME.graphql';
import SEARCH_USER from './queries/SEARCH_USER.graphql';
import USER from './queries/USER.graphql';
import COMMENT_ADDED from './subscriptions/COMMENT_ADDED.graphql';
import MEMBER_ADDED from './subscriptions/MEMBER_ADDED.graphql';
import NEW_LIKE from './subscriptions/NEW_LIKE.graphql';
import POST_ADDED from './subscriptions/POST_ADDED.graphql';
export {
  GET_CONVERSATION_BY_FRIEND,
  GET_COMMENTS,
  UPLOAD_AVATAR,
  UNLIKE_POST,
  SEND_MESSAGE,
  SEND_FILES,
  REJECT_REQUEST,
  REGISTER,
  OAUTH,
  LOGIN,
  LIKE_POST,
  ADD_MEMBER_CONVERSATION,
  CHANGE_NAME_CONVERSATION,
  CREATE_POST,
  COMMENT_POST,
  CREATE_USER,
  UNFRIEND,
  GET_CONVERSATION_BY_ID,
  GET_CONVERSATION_BY_PROFILE_ID,
  ACCEPT_REQUEST,
  USER,
  SEARCH_USER,
  ME,
  GET_LIST_FRIEND_NOT_IN_CONVERSATION,
  GET_ENTIRE_PROFILE,
  LIST_USERS,
  GET_REQUESTS,
  GET_PROFILE,
  GET_POSTS,
  COMMENT_ADDED,
  GET_MESSAGES_BY_CONVERSATION_ID,
  MEMBER_ADDED,
  NEW_LIKE,
  POST_ADDED,
};
// @endindex

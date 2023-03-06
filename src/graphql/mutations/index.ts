// @index('./**/*.graphql', f => `import ${f.name} from '${f.path}.graphql'`)
import ACCEPT_REQUEST from './ACCEPT_REQUEST.graphql';
import ADD_MEMBER_CONVERSATION from './ADD_MEMBER_CONVERSATION.graphql';
import CHANGE_NAME_CONVERSATION from './CHANGE_NAME_CONVERSATION.graphql';
import COMMENT_POST from './COMMENT_POST.graphql';
import CREATE_POST from './CREATE_POST.graphql';
import CREATE_USER from './CREATE_USER.graphql';
import LIKE_POST from './LIKE_POST.graphql';
import LOGIN from './LOGIN.graphql';
import OAUTH from './OAUTH.graphql';
import REGISTER from './REGISTER.graphql';
import REJECT_REQUEST from './REJECT_REQUEST.graphql';
import SEND_FILES from './SEND_FILES.graphql';
import SEND_MESSAGE from './SEND_MESSAGE.graphql';
import UNFRIEND from './UNFRIEND.graphql';
import UNLIKE_POST from './UNLIKE_POST.graphql';
import UPLOAD_AVATAR from './UPLOAD_AVATAR.graphql';
export {
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
  ACCEPT_REQUEST,
};

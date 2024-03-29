// @index('./**/*.graphql', f => `import ${f.name} from '${f.path}.graphql'`)
import GET_COMMENTS from './GET_COMMENTS.graphql'
import GET_CONVERSATION_BY_FRIEND from './GET_CONVERSATION_BY_FRIEND.graphql'
import GET_CONVERSATION_BY_ID from './GET_CONVERSATION_BY_ID.graphql'
import GET_CONVERSATION_BY_PROFILE_ID from './GET_CONVERSATION_BY_PROFILE_ID.graphql'
import GET_ENTIRE_PROFILE from './GET_ENTIRE_PROFILE.graphql'
import GET_LIST_FRIEND_NOT_IN_CONVERSATION from './GET_LIST_FRIEND_NOT_IN_CONVERSATION.graphql'
import GET_MESSAGES_BY_CONVERSATION_ID from './GET_MESSAGES_BY_CONVERSATION_ID.graphql'
import GET_POSTS from './GET_POSTS.graphql'
import GET_PROFILE from './GET_PROFILE.graphql'
import GET_REQUESTS from './GET_REQUESTS.graphql'
import LIST_USERS from './LIST_USERS.graphql'
import ME from './ME.graphql'
import SEARCH_USER from './SEARCH_USER.graphql'
import USER from './USER.graphql'
export {
  GET_CONVERSATION_BY_FRIEND,
  GET_COMMENTS,
  GET_CONVERSATION_BY_ID,
  GET_CONVERSATION_BY_PROFILE_ID,
  USER,
  SEARCH_USER,
  ME,
  GET_LIST_FRIEND_NOT_IN_CONVERSATION,
  GET_ENTIRE_PROFILE,
  LIST_USERS,
  GET_REQUESTS,
  GET_PROFILE,
  GET_POSTS,
  GET_MESSAGES_BY_CONVERSATION_ID,

}
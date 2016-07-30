
import {connect} from 'react-redux'
import {RouteToView} from '../../components/appRouter/RouterAction'
import Login from './Home'

export default connect(
  state => ({

  }),
  dispatch => ({
    backToLoginView(type) {
      dispatch(RouteToView(type));
    }
}))(Login)


import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavigationView from '../../components/navigation/NavigationView'
import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list, RouteToView} from '../../components/appRouter/RouterAction'
import RouterReducer from '../../components/appRouter/RouterAction'

export default connect(
  state => ({

  }),
  dispatch => ({
    routeToView(type) {
      dispatch({
        type:'push',
        key:type
      });
    }
  })
)(NavigationView);

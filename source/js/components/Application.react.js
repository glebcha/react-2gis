/**
 * Application
 */

import React  from 'react';
import { Router, Route, Link } from 'react-router';
import AppStore from '../stores/AppStore';

class Application extends React.Component {
	
	constructor(props) {
    super(props);
  }

    render() {
        return (
            <div className="drawer">
            	{this.props.children || <Items/>}
            </div>
        )
    }
}

export default Application;
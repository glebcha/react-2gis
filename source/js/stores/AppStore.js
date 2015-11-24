/**
 * Application store
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import AppConstants from '../constants/AppConstants';
import PageActions from '../actions/PageActions';
import request from 'superagent';

var _items = [];

function loadData(data) {
	_items = data;
}

class AppStore extends EventEmitter {

	init() {

		request.get('/data/data.json')
		.end((err, res) => {
			if(res.ok) PageActions.receiveItems(res.body);
		});

	}

	getItems() {
		return _items;
	}

	getItem(itemId){
		let item = {};
		
		_items.forEach((obj) => {
			if(obj.id == itemId) item = obj;
		})

		return item;
	}

	emitChange() {
		this.emit('change');
	}

	addChangeListener(callback) {
		this.on('change', callback);
	}

	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}

}

let AppStoreInstance = new AppStore();

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case AppConstants.DATA_LOADED:
			loadData(action.data);
			break;

		default:
			return true;
	}

	AppStoreInstance.emitChange();

	return true;

});

export default AppStoreInstance;
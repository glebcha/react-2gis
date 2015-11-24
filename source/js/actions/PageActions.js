import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {

  receiveItems(data) {
	AppDispatcher.handleAction({
	  actionType: AppConstants.DATA_LOADED,
	  data: data
	});
  }

};

export default AppActions;

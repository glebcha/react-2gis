/**
 * Items page
 */

import React  from 'react';
import { Router, Route, Link } from 'react-router';
import AppStore from '../stores/AppStore';
import history from '../util/history';

class Items extends React.Component {

  constructor(props) {
    super(props);
    AppStore.init();
    this._onChange = this._onChange.bind(this);
    this.state = {items: AppStore.getItems()};
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({items: AppStore.getItems()});
  }

  openItem(id) {
    history.pushState(null, 'item/' + id);
  }

  correctStatus(status, text){
    return text.match(/закрыто/i) !== null || text.match(/откроется/i) !== null ? 'close' : status;
  } 

  render() {  
    return (
      <div>
        {this.state.items && this.state.items.length ?
          this.state.items.map((function (item) {
            return (
              <section key={item.id} data-id={item.id} className="card-item" onClick={this.openItem.bind(null, item.id)}>
                <header>
                  <h3>{item.title}</h3>
                  <div className="rating">
                    <div className="rating_inner" style={{'width':  (item.rating / 5) * 100 + '%'}}></div>
                  </div>
                </header>
                <ul>
                  {item.extension ? (<li>{item.extension}</li>) : null}
                  {item.rubrics.map(function (rubric, index) {
                    return <li key={index}>{rubric}</li>;
                  })}
                  <li>{item.address}</li>
                  <li 
                    data-distance={item.distance_info.distance + item.distance_info.unit} 
                    className={this.correctStatus(item.schedule.status,item.schedule.text)}
                  >
                    {item.schedule.text}
                  </li>
                </ul>
              </section>
            )
          }).bind(this))
          : null
        }
      </div>
    )
  }
};

export default Items;

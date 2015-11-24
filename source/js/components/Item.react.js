/**
 * Item page
 */

import React  from 'react';
import { Router, Route, Link } from 'react-router';
import AppStore from '../stores/AppStore';

class Item extends React.Component {
  
  constructor(props) {
	super(props);
	AppStore.init();
	this._onChange = this._onChange.bind(this);
	let itemId = this.props.params.itemId;
	this.state = {item: AppStore.getItem(itemId)};
  }

  componentDidMount() {
	AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
	AppStore.removeChangeListener(this._onChange);
  }

  _onChange(){
	this.setState({item: AppStore.getItem(this.props.params.itemId)});
  }

  correctStatus(status, text){
	return text.match(/закрыто/i) !== null || text.match(/откроется/i) !== null ? 'close' : status;
  } 


  render() {

	if(this.state.item.id) {
	  let item = this.state.item;
	  let distance = item.distance_info,
		schedule = item.schedule,
		attributes = item.attributes,
		contacts = item.contacts,
		rating = item.rating;
	  let id = item.id,
		title = item.title,
		extension = item.extension,
		rubrics = item.rubrics,
		address = item.address,
		range = distance.distance,
		rangeUnit = distance.unit,
		scheduleStatus = schedule.status,
		scheduleText = schedule.text;

		return (
		  <article id={id}>
			<section className="card-item">
			  <header>
				<h3>{title}</h3>
				<div className="rating">
				  <div className="rating_inner" style={{'width': (rating / 5) * 100 + '%'}}></div>
				</div>
			  </header>
			  <ul>
				{extension ? (<li>{extension}</li>) : null}
				{rubrics.map(function (rubric, index) {
				  return <li key={index}>{rubric}</li>;
				})}
				<li>{address}</li>
				<li 
					data-distance={item.distance_info.distance + item.distance_info.unit} 
					className={this.correctStatus(scheduleStatus,scheduleText)}
				>
					{scheduleText}
				</li>
			  </ul>
			</section>

			{attributes ? (
			<div className="card_payment">
			  <dl>
				{attributes.map(function (attribute, index) {
				  return <dt key={index}>{attribute}</dt>;
				})}
			  </dl>
			</div>
			) : null}

			<div className="card_contacts">
			  <ul>
				{contacts.map(function (contact, index) {
				  return  <li key={index} className={contact.type}>
							<a href={contact.type === "phone" ? "tel:" + contact.value : contact.value}>
							  {contact.text}
							</a>
						  </li>;
				})}
			  </ul>
			</div>

			<div className="rubrics">
			  <Link to='/'>Театры</Link>
			</div>
		  </article>
		)
	} else {
	  return null
	}

  }
};

export default Item;

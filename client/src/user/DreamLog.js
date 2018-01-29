import React, { Component } from 'react';

class DreamLog extends Component {
  render(){
		// CHECK TO SEE IF USER IS LOGGED IN
		// if(this.props.user && this.props.user.name){
      return (
				<div>
          <h1>See what dreams are made of</h1>
					<div className="dream-log__list">
						<ul>
							<li>Dream 1</li>
							<li>Dream 2</li>
							<li>Dream 3</li>
							<li>Dream 4</li>
							<li>Dream 5</li>
							<li>Dream 6</li>
							<li>Dream 7</li>
							<li>Dream 8</li>
						</ul>
					</div>
        </div>);
		// }
		// MESSAGE IF USER IS LOGGED OUT
    // else {
      // return ( <p>This is a dreamy list page. You need to be logged in to view it.</p> );
    // }
  }
}

export default DreamLog;

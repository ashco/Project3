import React, { Component } from 'react';

class Footer extends Component {
  render(){
    return(
        <div className="footer">
            <span className="footer-text">Created by The Dream Team &copy; {new Date().getFullYear()}</span>
            <span className="footer-text"><a href="https://github.com/ashco" target="_blank">Ashton Christie</a>, <a href="https://github.com/antonia-villa" target="_blank">Antonia Villa</a>, and <a href="https://github.com/jacquelynmarcella" target="_blank">Jacquelyn Marcella</a></span>
        </div>
      );
  }
}

export default Footer;

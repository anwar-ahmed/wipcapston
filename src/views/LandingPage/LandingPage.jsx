import React from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";


import { createBrowserHistory } from 'history';

import ProductSection from "./Sections/ProductSection.jsx";
import ActionItemsPage from "views/ActionItemsPage/ActionItemsPage";

//import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

var _notificationUrl = 'http://localhost:3000/notification'

const history = createBrowserHistory({forceRefresh:true});

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList:[],
      usertype:'',
    };
  }
  componentDidMount() {
    if(!sessionStorage.getItem('username')){
      history.push('/')
    } else if (sessionStorage.getItem('username') == 'securitycontrol@esim.com'){
      this.setState({
        usertype: 'controluser'
      })
    } else {
      this.setState({
        usertype: 'enduser'
      })
    }

    axios.get(_notificationUrl)
    .then( response => {
        this.setState({
                notificationList:response.data.data      
        })

    }
    )
    .catch(error => { throw error});  


  }
  render() {
    const { classes, ...rest } = this.props;

    
  const alertCount =  this.state.notificationList.filter(value => value.type === 'alert').length;
  const updateCount = this.state.notificationList.filter(value => value.emailId === sessionStorage.getItem('username')).length;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={
            this.state.usertype == 'enduser' ? 
            <HeaderLinks endusermenu="true" alertCount={alertCount} updateCount={updateCount} sessionName={sessionStorage.getItem('username')} /> : 
            <HeaderLinks controlusermenu="true" sessionName={sessionStorage.getItem('username')} />
          }
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            // backgroundImage: "url(" + image + ")",
            // backgroundSize: "cover",
            // backgroundPosition: "top center"
          }}
        >
          <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection /> 
          </div>
        </div>
          <Footer whiteFont/>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);

import React from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import ProductSection from "./Sections/ProductSection.jsx";

//import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

var _notificationUrl = 'http://localhost:3000/notification'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      notificationList:[]
    };
  }
  componentDidMount() {

    axios.get(_notificationUrl)
    .then( response => {
        this.setState({
                notificationList:response.data.data      
        })

        console.log(this.state.Users);
    }
    )
    .catch(error => { throw error});
     

    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;

    
  const alertCount =  this.state.notificationList.filter(value => value.type === 'alert').length;
  const updateCount = this.state.notificationList.filter(value => value.type === 'update').length;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={<HeaderLinks endusermenu="true" alertCount={alertCount} updateCount={updateCount} />}
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

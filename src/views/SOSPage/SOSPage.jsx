import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import envVar from "../../config.js"
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';

// @material-ui/icons
import Security from "@material-ui/icons/Security";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";

import image1 from "assets/img/security.jpg";
import image2 from "assets/img/fire.jpg";
import image3 from "assets/img/ambulance.jpg";
import image4 from "assets/img/police.jpg";

import sospageStyle from "assets/jss/material-kit-react/views/sospageStyle.jsx";
var _notificationUrl = envVar.API_URL + '/notification'
class SOSPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }
  render() {
    const { classes, ...rest } = this.props;

    const alertCount =  this.state.notificationList.filter(value => value.type === 'alert').length;
    const updateCount = this.state.notificationList.filter(value => value.emailId === sessionStorage.getItem('username')).length;
    
const tileData = [
  {
    "_id" : "SOS01",
    "title" : "Security",
    "description" : "SOS Security Service",
    "img" : image1,
    "email" : "/emergency@security.com",
    "number" : "9898989",
    "twitter" : "@security"
},
{
    "_id" : "SOS02",
    "title" : "Fire Service",
    "description" : "SOS Fire Service",
    img : image2,
    "email" : "emergency@fire.com",
    "number" : "9898989",
    "twitter" : "@fire"
},
{
    "_id" : "SOS03",
    "title" : "Ambulance",
    "description" : "SOS Ambulance Service",
    img : image3,
    "email" : "emergency@hospital.com",
    "number" : "9898989",
    "twitter" : "@hospital"
},
{
    "_id" : "SOS04",
    "title" : "Police",
    "description" : "SOS Police Service",
    img : image4,
    "email" : "emergency@police.com",
    "number" : "9898989",
    "twitter" : "@police"
}
]
    
    return (
      <div>

      <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={<HeaderLinks endusermenu="true" alertCount={alertCount} updateCount={updateCount} sessionName={sessionStorage.getItem('username')}/>}
          {...rest}
        />
                <div
          className={classes.pageHeader}
        >
        <div className={classes.container}>
      <div className={classes.section}>
        <div>
          <GridContainer justify="center">
                 <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div" className={classes.title}>SOS Services</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile._id}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.description}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  SOS
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>

          </GridContainer>
            
        </div>
   
      </div>
      </div>
      <Footer whiteFont/>
      </div>
      </div>
    );
  }
}

export default withStyles(sospageStyle)(SOSPage);

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

class ListIncidents extends React.Component {


  styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });


  render() {

    const { classes, ...rest } = this.props;

    let id = 0;
  function createData(RaisedBy , Opened, Type, Description, Priority , Status) {
  id += 1;
  return { id, RaisedBy , Opened, Type, Description, Priority , Status};
  }
  
  const rows = [
  createData('Anwar Ahmed', "somedate", "fire", "there is small fire", "low","open"),
  createData('Anwar Ahmed', "somedate", "fire", "there is small fire", "low","open"),
  createData('Anwar Ahmed', "somedate", "fire", "there is small fire", "low","open"),
  createData('Anwar Ahmed', "somedate", "fire", "there is small fire", "low","open"),
  createData('Anwar Ahmed', "somedate", "fire", "there is small fire", "low","open")
  ];
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Search field"
                    id="standard-search"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "search",
                      margin:"normal"
                    }}
                  />
            </GridItem>
            </GridContainer>
                <GridContainer justify="center">

                        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell >Requested By</TableCell>
            <TableCell >Opened</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Priority</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell numeric>{row.RaisedBy}</TableCell>
                <TableCell numeric>{row.Opened}</TableCell>
                <TableCell numeric>{row.Type}</TableCell>
                <TableCell numeric>{row.Description}</TableCell>
                <TableCell numeric>{row.Priority}</TableCell>
                <TableCell numeric>{row.Status}</TableCell>
                <TableCell numeric><Button>Delete</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

              </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(ListIncidents);

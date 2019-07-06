import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import QRCode from 'qrcode.react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = {
  card: {
    width: '20%',
    height: '25%',
    margin: '2.5%',
  },
  floatRight: {
    marginLeft: 'auto',
  },
  status: {
    fontSize: 14,
  },
  statusDropdown: {
    
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
};

class TrunkCard extends Component {

    constructor(props) {
      super(props)
      this.state = {
        expanded: false
      }
      this.handleExpandClick = this.handleExpandClick.bind(this)
    }
  
    updateTrunkStatus = (event) => {  
        var postData = this.props.trunk;
        postData.status = event.target.value;
        
        var updates = {};
        updates['trunks/' + postData.key] = postData;

        global.firebaseApp.database().ref().update(updates, 
            function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Success")
                }
            }
        );
    }

    removeTrunk = (event) => {  
        var postData = this.props.trunk;
        var updates = {};
        updates['trunks/' + postData.key] = null;

        global.firebaseApp.database().ref().update(updates, 
            function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Success")
                }
            }
        );
    }

    getColorFromStatus(status) {
        switch(status) {
          case 0:
            //red
            return {backgroundColor: '#cf0628'}
          case 1:
            //orange
            return {backgroundColor: '#FF7F32'}
          case 2:
            //green
            return {backgroundColor: '#78BE20'}
          default:
            return null;
        }
      }

      
  


      handleExpandClick() {
        this.setState({expanded: !this.state.expanded})
      }

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const {trunk, key} = this.props;

    var {expanded} = this.state.expanded;



    return (
        <Card className={classes.card} key={key}>
            <CardHeader
                avatar={
                    <Avatar aria-label="statusIcon" style={this.getColorFromStatus(trunk.status)}></Avatar>
                }
                action={
                    <IconButton aria-label="Remove" onClick={this.removeTrunk}>
                        <CloseIcon />
                    </IconButton>
                }
                title={
                <FormControl>
                        <Select
                            value={trunk.status}
                            onChange={this.updateTrunkStatus}
                            displayEmpty
                            name="status"
                            className={classes.statusDropdown}
                            >
                            <MenuItem value={0}>Not Loaded</MenuItem>
                            <MenuItem value={1}>Loading</MenuItem>
                            <MenuItem value={2}>Loaded</MenuItem>
                        </Select >
                </FormControl>
            }
            // subheader="September 14, 2016"
            />
            <CardContent>
                    <Typography variant="h5" component="h2">
                    {trunk.name}
                    </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className={classes.floatRight}>Edit Items</Button>
                {/* <Button
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                  >
                  <ExpandMoreIcon />
                </Button> */}
            </CardActions>
            {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <QRCode value={trunk.name} renderAs='svg'/>
              </CardContent>
            </Collapse> */}
        </Card>
    );
  }
}

TrunkCard.propTypes = {
  classes: PropTypes.object.isRequired,
  trunk: PropTypes.object,
  key: PropTypes.string,
  alertOpen: PropTypes.bool,
  handleOpenAlert: PropTypes.func,
  handleCloseAlert: PropTypes.func,
  handleRemoveTrunk: PropTypes.func,
};

export default withStyles(styles)(TrunkCard);
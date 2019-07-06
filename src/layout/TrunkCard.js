import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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



const styles = {
  card: {
    width: '20%',
    height: '25%',
    margin: '2.5%'
  },
  floatRight: {
    marginLeft: 'auto',
  },
  status: {
    fontSize: 14,
  },
};

class TrunkCard extends Component {

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
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { trunk, key} = this.props;

    return (
        <Card className={classes.card} key={key}>
        <CardHeader
          action={
            <IconButton aria-label="Remove" onClick={console.log('clicked')}>
              <CloseIcon />
            </IconButton>
          }
          // title={name}
          // subheader="September 14, 2016"
        />
        <CardContent>
                <FormControl className={classes.formControl}>
                    <Select
                        value={trunk.status}
                        onChange={this.updateTrunkStatus}
                        displayEmpty
                        name="status"
                        className={classes.selectEmpty}
                        >
                      <MenuItem value={0}>Not Loaded</MenuItem>
                      <MenuItem value={1}>Loading</MenuItem>
                      <MenuItem value={2}>Loaded</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="h5" component="h2">
                  {trunk.name}
                </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" className={classes.floatRight}>Edit Items</Button>
            <Button size="small" className={classes.floatRight}>Edit Items</Button>
        </CardActions>
        </Card>
    );
  }
}

TrunkCard.propTypes = {
  classes: PropTypes.object.isRequired,
  trunk: PropTypes.object,
  key: PropTypes.string,
};

export default withStyles(styles)(TrunkCard);
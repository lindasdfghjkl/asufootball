import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';


import EmptyState from '../../layout/EmptyState/EmptyState';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});



class HomeContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addTrunkDialog: {
        open: false,
        name: '',
      }
    };
  }

  openAddTrunkDialog = () => {
    this.setState({
      addTrunkDialog: {
        open: true
      }
    });
  };

  cancelAddingTrunk = () => {
    this.setState({
      addTrunkDialog: {
        open: false
      }
    });
  };

 

  onChangeText = event => {
    this.setState({ addTrunkDialog: {open: true, name: event.target.value }} );
  };

  addTrunk = event => {
    global.firebaseRef.push({
      name: this.state.addTrunkDialog.name,
    });

    this.setState({ addTrunkDialog: {
      open: false,
      name: '',
    } });

    event.preventDefault();
  };


  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title } = this.props;

    

    if (isSignedIn) {
      return (
        <EmptyState
          // icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
          // title="Home"
          description="You have no equipment added. Create a trunk to get started."
          button={
            <Fab className={classes.button} color="secondary" component={Button}  onClick={this.openAddTrunkDialog} variant="extended">
              + New Trunk
            </Fab>
          }
          dialog={
              this.state.addTrunkDialog.open == true ? (
                <form onSubmit={this.addTrunk}>
                  <Dialog open={true} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Trunk</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={this.onChangeText}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.cancelAddingTrunk} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.addTrunk} color="primary">
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                </form>
            ) : null 
          }
        />
      );

      
    }

    return (
      <EmptyState
        // icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
        title={title}
        description="Sign up or sign in to begin"
      />
    );
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired,

  isSignedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(HomeContent);
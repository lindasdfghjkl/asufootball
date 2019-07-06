import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import EmptyState from '../../layout/EmptyState/EmptyState';
import Button from '@material-ui/core/Button';
 
import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';
import TrunksView from '../../layout/TrunksView';
import TrunkCard from '../../layout/TrunkCard';






const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  },

  buttonTop: {
    marginTop: 0
  },
});



class HomeContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addTrunkDialog: {
        open: false,
        name: '',
      },
      trunks: []
    };

    this.trunksRef = this.getRef().child('trunks').orderByChild('name');
  }

  getRef() {
    return global.firebaseApp.database().ref();
  }


  openAddTrunkDialog = () => {
    console.log("add")
    this.setState({
      addTrunkDialog: {
        open: true,
        name: ''
      }
    });
  };

  closeAddTrunkDialog = () => {
    this.setState({
      addTrunkDialog: {
        open: false
      }
    });
  };

  onTrunkAdded = () => {  
    this.setState({ addTrunkDialog: {name: '', open: false}});
  }

  
  listentoDB(db) {
    db.on('value', (snap) => {
      var list = [];

      snap.forEach((child) => {
          list.push({
              key: child.key,
              name: child.val().name,
              status: child.val().status,
          });
      });

      if (list.length < 1) {
        this.setState({
          trunks: []
        });
      } else {
        this.setState({
          trunks: list
        });
      }
    });
  }



  componentDidMount() {
    this.listentoDB(this.trunksRef);
  }


  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title} = this.props;
    

    if (isSignedIn) {
            if (this.state.trunks.length < 1) {
                return (
                      <EmptyState
                        description="You have no equipment added. Create a trunk to get started."
                        button={
                          <Fab className={classes.button} color="secondary" component={Button}  onClick={this.openAddTrunkDialog} variant="extended">
                            + New Trunk
                          </Fab>
                        }
                        dialog= {
                          <AddTrunkDialog open={this.state.addTrunkDialog.open} onClose={this.closeAddTrunkDialog} onTrunkAdded={this.onTrunkAdded}/>
                        }
                      />
                  )
            } else {
                  return ( 
                    <TrunksView 
                      addButton={
                        <Fab className={classes.buttonTop} color="secondary" component={Button}  onClick={this.openAddTrunkDialog} variant="extended">
                          + New Trunk
                        </Fab>
                      }
                      dialog={
                        <AddTrunkDialog open={this.state.addTrunkDialog.open} onClose={this.closeAddTrunkDialog} onTrunkAdded={this.onTrunkAdded}/>
                      }
                      cards={
                        this.state.trunks.map((trunk, key) => 
                          <TrunkCard trunk={trunk} key={key}/>
                        )
                      }
                    />
                 )
            }
    } else {
          return (
            <EmptyState
              title={title}
              description="Sign up or sign in to begin"
            />
          );
    }
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired,

  isSignedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(HomeContent);
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import EmptyState from '../../layout/EmptyState/EmptyState';
import Button from '@material-ui/core/Button';
 
import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



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

  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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

    this.trunksRef = this.getRef().child('trunks');
  }

  getRef() {
    return global.firebaseApp.database().ref();
  }


  openAddTrunkDialog = () => {
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
              name: child.val().name,
              status: child.val().status,
              _key: child.key.toString()
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
    const { isSignedIn, title, numberOfTrunks, trunks } = this.props;
    

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
                  console.log(this.state.trunks)
                  return this.state.trunks.map( (trunk, key) => 
                    <Card className={classes.card} key={key}>
                        <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  {trunk.status == 0 ? "Not loaded" : "Status"}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                  {trunk.name}
                                </Typography>
                        </CardContent>
                        <CardActions >
                            <Button size="small">Edit Items</Button>
                        </CardActions>
                    </Card>
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
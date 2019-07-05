import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';

import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

import EmptyState from '../../layout/EmptyState/EmptyState';

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
      addTrunkModalVisibility: false
    };
  }

  addTrunk() {
    this.setState({ addTrunkModalVisibility: true });
    console.log("clicked add")
  }




  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title } = this.props;

    

    if (isSignedIn) {
      return (
        // <EmptyState
        //   icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
        //   title="Home"
        //   description="You have no equipment added. Click below to get started."
        //   button={
        //     <Fab className={classes.button} color="secondary" component={Link}  onPress={this.addTrunk} variant="extended">
        //       Add Trunk
        //     </Fab>
        //   }
        // />
        <button onClick={this.addTrunk}>
          Add Trunk
        </button>
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
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// import Fab from '@material-ui/core/Fab';

import EmptyState from '../layout/EmptyState/EmptyState';
// import Button from '@material-ui/core/Button';
 
// import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';
// import TrunksView from '../../layout/TrunksView';
// import TrunkCard from '../../layout/TrunkCard';


import ReactDataGrid from 'react-data-grid';


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



class TrunkContent extends Component {
  constructor(props) {
    super(props);

    this.state = { rows: [] };

  }

  componentDidMount() {
    var rows = this.props.trunk.items.map(function (item) {
      return {id: item.name, item: item.name, quantity: item.quantity}
    });
    this.setState({rows: rows});
    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this)

  }


  addItem = (event) => {  
    var postData = this.props.trunk;
    if (postData.items === undefined) {
      postData.items = []
    }
    postData.items.push({name: "item name", quantity: 10});
    
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

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }

      var updatedItems = rows.map(function (row) {
        return {name: row.item, quantity: row.quantity}
      });
      var postData = this.props.trunk;
      postData.items =  updatedItems;
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


      return { rows };
    });

 
  };


  render() {
    // Styling
    // const { classes } = this.props;

    // Properties
    const { isSignedIn, title} = this.props;
    
    
    const columns = [
    // { key: 'id', name: 'ID' },
    { key: 'item', name: 'Item', editable: true},
    { key: 'quantity', name: 'Quantity', editable: true}, 
    ];
    

    if (isSignedIn) {
          // return (<Button onClick={this.addItem}>add</Button>);
        return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i]}
            rowsCount={3}
            minHeight={150} 
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
          />
        );
    } else {
        return (
        <EmptyState
            title={title}
            description="Sign up or sign in to edit this trunk"
        />
        );
    }
  }
}

TrunkContent.propTypes = {
  classes: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  title: PropTypes.string,
  trunk: PropTypes.object.isRequired
};

export default withStyles(styles)(TrunkContent);
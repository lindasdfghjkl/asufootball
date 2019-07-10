import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


// import Fab from '@material-ui/core/Fab';

import EmptyState from '../layout/EmptyState/EmptyState';
// import Button from '@material-ui/core/Button';
 
// import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';
// import TrunksView from '../../layout/TrunksView';
// import TrunkCard from '../../layout/TrunkCard';


import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';

import QR from 'qrcode.react';




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

    this.state = {
      data: [],
    }

    this.fb = global.firebaseApp
    this.renderEditable = this.renderEditable.bind(this);
    this.addRow = this.addRow.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.getID = this.getID.bind(this);
    this.showActions = this.showActions.bind(this);
  }

  
  componentWillMount() {
    this.updateTableData();

    setInterval(() => {   
        this.updateTableData();
     }, 10000);
  }

  updateTableData(){
      var data = [];
      if (this.props.trunk.items !== undefined) {
        data = this.props.trunk.items.map(function (item) {
            return {
                    id: item.id, 
                    name: item.name, 
                    quantity: item.quantity, 
                    status: item.status, 
                    user: item.user,
                    date: item.date
                  }
        });
      } 
      this.setState({data: data});
  }

  updateDatabase(newData) {
    var postData = this.props.trunk;
    postData.items = newData;
    var updates = {};
    updates['trunks/' + postData.key] = postData;
    this.fb.database().ref().update(updates, 
        function(error) {
            if (error) {
                console.log(error)
            } else {
                console.log("Success")
            }
        }
    );
  } 

  renderEditable(cellInfo) {
    return (
      <div
        style={{ 'padding': '5px'}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index].date = Date.now();
          data[cellInfo.index].user = this.getUsername(this.props.user);
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          this.props.trunk.items = data;
          this.updateDatabase(data);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  renderStatus(cellInfo) {
    return (
        <select 
          value={this.state.data[cellInfo.index].status} 
          onChange={(e) => {
            var data = this.state.data;
            data[cellInfo.index].date = Date.now();
            data[cellInfo.index].user = this.getUsername(this.props.user);
            data[cellInfo.index].status = e.target.value;
            this.setState({data});
            this.props.trunk.items = data;
            this.updateDatabase(data);

          }}>
            <option value="0">Not loaded</option>
            <option value="1">Loaded</option>
          </select>
    );
  }

  getUsername(user) {
    return user.displayName || user.email
  }

  addRow() { 
    var d = this.state.data;
    var id = this.getID(d);
    var user = this.getUsername(this.props.user);
    d.push({id: id, name: '', quantity: '', status: '', user: user, date: Date.now()});
    this.setState({data: d});
  }


  getID(items) {
    var ids = [];
    items.forEach(item => {
      ids.push(item.id);
    });
    if (ids.length === 0) {
      return 0;
    } else {
      var id =  Math.max(...ids) + 1;
      return id;
    }
  }

  showActions(cellInfo) {
    return (
      <div>
        <Button onClick={ (e) => {
            var url = "34.214.162.117:3000/" + this.props.trunk.key; 
            url += "?id=" + this.state.data[cellInfo.index].id;
            return ( <QR value={url} /> )
        }}>print qr</Button> 

        <Button onClick={ (e) => {
              let data = this.state.data;
              data.splice(cellInfo.index, 1);
              this.setState({data});
              this.updateDatabase(data);
            }}>
              delete
            </Button> 
      </div>
    )
  }


  formatDate(datenow){
    var date = new Date(datenow);
    var options = {
            year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
        };
    var result = date.toLocaleDateString('en', options);
    return result;
}


  render() {
    // Styling
    // const { classes } = this.props;

    // Properties
    const { isSignedIn, title, trunk} = this.props;
    

    if (isSignedIn) {
        return (
        <div style={{width: '90%', marginLeft: '5%'}}>
          <h1>{trunk.name}</h1>
          <Button onClick={this.addRow}>+ ADD ITEM</Button>
          <ReactTable
            className='-highlight'
            style={{textAlign: 'center'}}
            data={this.state.data}
            columns={[
              {
                Header: "ID",
                accessor: "id",
                Cell: (row) => (<div>{this.state.data[row.index].id}</div>),
                maxWidth: 100,
                // getProps: (column) => {
                //   return {
                //       style: {
                //           background: 'rgb(230, 230, 235)',
                //       },
                //   };
                // },
              },
              {
                Header: "Item",
                accessor: "name",
                Cell: this.renderEditable
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable
              },
              {
                Header: "Status",
                Cell: this.renderStatus
              },
              {
                Header: "Actions",
                Cell: this.showActions,
                maxWidth: 300
              },
              {
                Header: "Last Modified",
                accessor: 'date',
                Cell: (row) => (<div>{this.formatDate(this.state.data[row.index].date)}<br/>{this.state.data[row.index].user}</div>),
                maxWidth: 300,
                getProps: (column) => {
                  return {
                      style: {
                          fontSize: '9pt'
                      },
                  };
                },
              }
            ]}
            minRows={this.state.data.length}
            showPageSizeOptions={false}
            sortable={true}
          />
      </div>
      )
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
  user: PropTypes.object.isRequired,
  title: PropTypes.string,
  trunk: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrunkContent);
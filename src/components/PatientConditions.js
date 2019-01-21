import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import orderBy from 'lodash/orderBy';

const styles = theme => ({
  root: {
    width: '50%',
    margin: 'auto',
    marginTop: '3%',
    marginBottom: '3%',
    overflowX: 'auto',
  }
});

const invertDirection = {
  asc: 'desc',
  desc: 'asc'
};

const rows = [
  { columnName: 'conditionName', label: 'Condition' },
  { columnName: 'dateRecorded', label: 'Date First Recorded' }
];

class PatientConditions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnToSort: '',
      sortDirection: 'desc'
    };
  };

  handleSort = (columnName) => {
    const { columnToSort, sortDirection } = this.state

    this.setState({
      columnToSort: columnName,
      sortDirection:
        columnToSort === columnName
          ? invertDirection[sortDirection]
          : 'asc'
    });
  };

  render() {
    const { conditions, classes } = this.props
    const { columnToSort, sortDirection } = this.state

    return (
      <div>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {rows.map(
                  row => (
                    <TableCell
                      key={row.columnName}
                    >
                      <Tooltip
                        title="Sort"
                        placement='bottom-start'
                        enterDelay={100}
                      >
                        <TableSortLabel
                          active={columnToSort === row.columnName}
                          direction={sortDirection}
                          onClick={() => this.handleSort(row.columnName)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {orderBy(conditions, columnToSort, sortDirection).map(condition => (
                <TableRow key={condition.id}>
                  <TableCell><a href={`https://www.ncbi.nlm.nih.gov/pubmed/?term=${condition.conditionName}`} rel='noopener noreferrer' target='_blank'>{condition.conditionName}</a></TableCell>
                  <TableCell>{condition.dateRecorded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  };
};

export default withStyles(styles)(PatientConditions);

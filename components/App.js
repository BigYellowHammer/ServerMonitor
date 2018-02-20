import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import IisTable from './Iis/IisTable';
import ServicesList from './servicesList';
import Hardware from './Hardware';
import DataTable from './Iis/DataTable';

const isDeployingColumn =
  {
    title: 'Deploying',
    key: 'IsDeploying',
    render: x => (<Checkbox defaultChecked={x.IsDeploying} disabled />)

  };

class App extends Component {
  componentDidMount() {
    this.props.getTasks();
    this.props.getSessions();
    this.props.getUsage();
    this.props.getOracle();
  }

  render() {
    return (
      <div>
        <DataTable data={this.props.sessions.data} columns={this.props.sessions.columns} message="No sessions found." rowKey="User" />
        <DataTable data={this.props.tasks.data} columns={this.props.tasks.columns} message="No tasks found." rowKey="Name" />
        <DataTable data={this.props.disk.data} columns={this.props.disk.columns} message="No directories found." />
        <DataTable data={this.props.oracle.data} columns={this.props.oracle.columns} message="No instancies found." extraColumns={[isDeployingColumn]} rowKey="CurrentBuildName" />
        <Hardware />
        <IisTable />
        <ServicesList />
      </div>
    );
  }
}

App.propTypes = {
  getSessions: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  getUsage: PropTypes.func.isRequired,
  getOracle: PropTypes.func.isRequired,
  sessions: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
  })).isRequired,
  tasks: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
  })).isRequired,
  disk: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
  })).isRequired,
  oracle: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
  })).isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  sessions: state.sessions,
  disk: state.disk,
  oracle: state.oracle
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(actions.getTasksAction()),
  getSessions: () => dispatch(actions.getSessionsAction()),
  getUsage: () => dispatch(actions.getDiskUsageAction()),
  getOracle: () => dispatch(actions.getOracleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

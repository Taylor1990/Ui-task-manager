/*Компонент таблицы задач*/

import React from 'react'
import {connect} from 'react-redux'
import ReactDataGrid, {Toolbar, Editors} from 'react-data-grid/addons'
import moment from 'moment'
import {Label, DropdownButton, MenuItem} from 'react-bootstrap'
import update from 'react-addons-update'
import './../node_modules/react-data-grid/themes/react-data-grid.css'

import * as actions from './../actions'
import PopupTask from './PopupTask.jsx'

const statusType = ['Planned', 'Processing', 'Completed'],
      DropDownEditor = Editors.DropDownEditor

class Tasks extends React.Component {
    constructor(props) {
        super(props)

        var tasks = this.props.tasks.sort((a, b) => a.id > b.id ? 1 : -1)

        tasks = tasks.map((task, i) => {
            task.priority = ['min', 'middle', 'max'][task.priority]
            task.status = statusType[task.status]
            return task
        })

        this.state = {
            originalTasks: tasks.slice(0),
            tasks: tasks.slice(0),
            filters: {},
            popupModel: {}
        }

    }

    componentWillReceiveProps(new_props) {
        var tasks = new_props.tasks.map((task) => {
            task.status = statusType[task.status]
            return task
        })

        this.setState({tasks: tasks})
    }

    handleGridSort(sortColumn, sortDirection) {
      var comparer = (a, b) => {
          if(sortDirection === 'ASC'){
              return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          }else if(sortDirection === 'DESC'){
              return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
      }

      var tasks

      if(sortDirection === 'NONE') {
          var originalTasks = this.state.originalTasks
          tasks = this.filterRows(originalTasks, this.state.filter)
      } else {
          tasks = this.state.tasks.sort(comparer)
      }

      this.setState({tasks : tasks})
    }

    filterRows(originalRows, filters) {
      var rows = originalRows.filter(function(r){
        var include = true
        for (let columnKey in filters) {
          if(filters.hasOwnProperty(columnKey)) {
            var rowValue = r[columnKey].toString().toLowerCase()
            if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
              include = false
            }
          }
        }
        return include
      })
      return rows
    }

    handleFilterChange(filter){
      this.setState((currentState) => {
        if (filter.filterTerm) {
          currentState.filters[filter.columnKey] = filter.filterTerm
        } else {
          delete currentState.filters[filter.columnKey]
        }
        currentState.tasks = this.filterRows(currentState.originalTasks, currentState.filters)
        return currentState;
      });
    }

    handleGridRowsUpdated(updatedRowData) {
      var rows = this.state.tasks.slice(0);

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
        var rowToUpdate = rows[i];
        var updatedRow = update(rowToUpdate, {$merge: updatedRowData.updated});
        rows[i] = updatedRow;
      }

      this.props.dispatch(actions.changeStatusTask(rows))

      this.setState({tasks: rows});
    }

    showPopup(ev, arg) {
        var task = this.state.tasks.find((task, i) => arg.rowIdx == i )
        this.setState({popupModel: task})
    }

    clearModal() {
        this.setState({popupModel: {}})
    }

    render() {
        return <div>
                <div className="TableTasks">
                  <ReactDataGrid
                    columns= {[
                      {key: 'id', name: 'Id', resizable: true, sortable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'name', name: 'Name', resizable: true, sortable: true, filterable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'date', name: 'Date', resizable: true, sortable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'priority', name: 'Priority', resizable: true, sortable: true, filterable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'target_time', name: 'Target time', resizable: true, sortable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'spend_time', name: 'Spend time', resizable: true, sortable: true, events: {onClick: this.showPopup.bind(this)}},
                      {key: 'status',
                        name: 'Status',
                        resizable: true,
                        sortable: true,
                        filterable: true,
                        editor: <DropDownEditor options = {statusType} />}
                    ]}
                    onGridSort = {this.handleGridSort.bind(this)}
                    rowGetter= {(i) => this.state.tasks[i]}
                    rowsCount= {this.props.tasks.length}
                    onRowUpdated= {this.handleRowUpdated}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated.bind(this)}
                    toolbar={<Toolbar enableFilter={true}/>}
                    onAddFilter={this.handleFilterChange.bind(this)} />
                </div>
                <PopupTask task = {this.state.popupModel} clearModal = {this.clearModal.bind(this)}/>
              </div>

    }
}

function selector(state) {
    return {tasks: state.app.tasks}
}

export default connect(selector)(Tasks)

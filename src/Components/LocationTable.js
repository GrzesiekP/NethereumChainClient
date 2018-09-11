import React, { Component } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import api from '../api';

export default class LocationTable extends Component {
  constructor(props) {
    super(props);
    const initialFilter = {
      logic: "and",
      filters: [{ field: "locationName", operator: "contains", value: "" }]
    };
    this.state = {
      allData: [],
      data: [],
      filter: initialFilter
    };
    this.filterChange = this.filterChange.bind(this);
  }
  
  componentDidMount() {
    fetch(api.locationUrl)
    .then(resp => {
      if (resp.status === 200 || resp.ok){
        return resp.json();
      }
    })
    .then(parsedResponse => {
      if(parsedResponse){
        this.setData(parsedResponse);
      }
    });
  }
  
  filterChange(event) {
    this.setState({
      data: this.getProducts(event.filter, this.state.allData),
      filter: event.filter
    });
  }
  
  getProducts(filter, data) {
    const slicedData = data.slice();
    var filtered = filterBy(slicedData, filter)
    return filtered;
  }
  
  setData(newData){
    this.setState({
      allData: newData,
      data: newData
    });
  }
  
  render() {
    return (
      <div>
        <div className="LocationTable">
          <Grid 
          style={{ height: '400px', width: 'auto' }} 
          data={this.state.data} 
          filterable={true} 
          filter={this.state.filter} 
          onFilterChange={this.filterChange} 
          resizable={true} >
            <Column field="locationId" title="ID" width="200px" filter="numeric" />
            <Column field="locationName" title="Location Name" width="auto" filter="text" />
            <Column field="previousLocationId" title="Previous Location ID" width="auto" />
            <Column field="previousLocationName" title="Previous Location Name" width="auto" />
            <Column field="timestamp" title="Timestamp Created" width="auto" />
          </Grid>
        </div>
      </div>
    );
  }
}
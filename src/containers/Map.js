import React, { Component } from "react";
import "./Map.css";
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGhvd21hIiwiYSI6ImNqZzJreno3YjFnYmYyeG83OGhwYnN5bXcifQ.1vQnq8Wx5FGnG7OJHnsJNw"
});

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.onStyleLoad = this.onStyleLoad.bind(this);
  }

  onStyleLoad(map){
    console.log("onStyleLoad");
    var stateAbbr = "MA";
    var districtCode = null;

    if (!map) {
      console.log("map=null");
      return;
    }
    for (var i=1; i<=5; i++){
      var existingFilter = map.getFilter('districts_'+i);
      if (existingFilter[0] === 'all') {
        existingFilter = existingFilter[existingFilter.length -1];
      }
      var filter = ['all'];

      if (stateAbbr) filter.push(["==", 'state', stateAbbr]);
      if (districtCode) filter.push(["==", 'number', districtCode]);

      var layerFilter = filter.concat([existingFilter]);

      map.setFilter('districts_' + i, layerFilter);
      map.setFilter('districts_' + i + '_boundary', layerFilter);
      map.setFilter('districts_' + i + '_label', layerFilter);
    }
    var boundaryFilter = ['all'];
    if (stateAbbr) boundaryFilter.push(['==', 'state', stateAbbr]);
    if (districtCode) boundaryFilter.push(['==', 'number', districtCode]);

    map.setFilter('districts_boundary_line', boundaryFilter);
  }

  render() {
    return ([

      <div style={{width: '100w', height: '50vh' }}>
        <Map
          onStyleLoad={this.onStyleLoad}
          style="mapbox://styles/phowma/cjg3n4s451i4z2so5l1lltx4u"
          fitBounds = {[[-71.585168, 42.156782],[-70.917892, 42.530001]]}
          containerStyle={{
            width: "100%",
            height: "100%"
          }}>
        </Map>
      </div>

    ]);
  }
}

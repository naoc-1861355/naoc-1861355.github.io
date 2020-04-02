/*
 * Copyright ©2019 Dan Grossman.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Autumn Quarter 2019 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import React, {Component} from 'react';
import EdgeList from "./EdgeList";
import Grid from "./Grid";
import GridSizePicker from "./GridSizePicker";

// Allows us to write CSS styles inside App.css, any any styles will apply to all components inside <App />
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gridSize: 4,  // The number of points in the grid
            edges: "",
            parsedEdge : []
        };
    }

    updateGridSize = (event) => {
        // Every event handler with JS can optionally take a single parameter that
        // is an "event" object - contains information about an event. For mouse clicks,
        // it'll tell you thinks like what x/y coordinates the click was at. For text
        // box updates, it'll tell you the new contents of the text box, like we're using
        // below:
        let size = parseInt(event.target.value);
        if(event.target.value === "" || size<=250) {
            this.setState({
                gridSize: size ,
                parsedEdge : []
            });
        }else{
            console.log("Illegal size: " + size);
            alert("Illegal size: " + size + "! Change size to smaller than 250");
        }
    };
    updateEdgeList = (event) => {
        if(event.target.value ===""){
            this.setState(
                {edges: ""}
            );
        }else {
            this.setState(
                {edges: event.target.value}
            );
        }
    };

    drawEdge = ()=>{
        let lines = [];
        let valid = true;
        console.log(this.state.edges);
        if(this.state.edges === ""){
            valid = false;
        }else {
            lines = this.state.edges.split("\n");
            let i;
            for (i = 0; i < lines.length; i++) {
                if (lines[i] === "") {
                    lines.splice(i, 1);
                    i--;
                }
            }
            let line;
            for (i = 0; i < lines.length; i++) {
                line = lines[i].split(" ");
                if (line.length === 3) {
                    line[0] = line[0].split(",");
                    line[1] = line[1].split(",");
                    // line[0] is first point, line[1] is second point
                    let first = line[0];
                    let second = line[1];
                    first[0] = parseInt(first[0]);
                    first[1] = parseInt(first[1]);
                    second[0] = parseInt(second[0]);
                    second[1] = parseInt(second[1]);
                    if (!Number.isInteger(first[0])||!Number.isInteger(first[1])||
                        !Number.isInteger(second[0])||!Number.isInteger(second[1])){
                        valid = false;
                    }
                    if (first.length !== 2 || second.length !== 2) {
                        valid = false;
                    } else {
                        if (first[0] >= this.state.gridSize || first[1] >= this.state.gridSize ||
                            second[0] >= this.state.gridSize || second[1] >= this.state.gridSize ||
                            first[0] < 0 || first[1] < 0 || second[0] < 0 || second[1] < 0) {
                            valid = false;
                        }
                    }
                    lines[i] = line;
                } else {
                    valid = false;
                }
            }
        }
        if(valid === true){
            this.setState({
                parsedEdge: lines
            });
        }else{
            console.log("Invalid edge provided");
            alert("Invalid edge provided");
        }

    };

    clearEdge = ()=>{
        this.setState({
            parsedEdge: []
        });
    };

    clearText = ()=>{
        this.setState({
            edges:""
        });
    };
    render() {
        const canvas_size = 500;
        return (
            <div>
                <p id="app-title">Connect the Dots!</p>
                <GridSizePicker value={this.state.gridSize} onChange={this.updateGridSize}/>
                <Grid edge = {this.state.parsedEdge} size={this.state.gridSize} width={canvas_size} height={canvas_size}/>
                <EdgeList value={this.state.edges} onChange={this.updateEdgeList} draw ={this.drawEdge} clear = {this.clearEdge}
                    clearBox = {this.clearText}/>
            </div>

        );
    }

}

export default App;

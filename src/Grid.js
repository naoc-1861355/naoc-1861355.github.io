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

/* A simple grid with a variable size */
/* Most of the assignment involves changes to this class */

import React, {Component} from 'react';

/**
 * Props:
 *
 * width - the desired width of the grid area
 * height - the desired height of the grid area
 * size - the number of points along a single axis in the grid
 */
class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: null  // An image object to render into the canvas.
        };
        this.canvasReference = React.createRef();
    }

    componentDidMount() {
        // Since we're saving the image in the state and re-using it any time we
        // redraw the canvas, we only need to load it once, when our component first mounts.
        this.fetchAndSaveImage();
        this.redraw();
    }

    componentDidUpdate() {
        this.redraw();
        this.drawLine();
    }

    fetchAndSaveImage() {
        // Creates an Image object, and sets a callback function
        // for when the image is done loading (it might take a while).
        let background = new Image();
        background.onload = () => {
            let newState = {
                backgroundImage: background
            };
            this.setState(newState);
        };
        // Once our callback is set up, we tell the image what file it should
        // load from. This also triggers the loading process.
        background.src = "./image.jpg";
    }

    redraw = () => {
        let ctx = this.canvasReference.current.getContext('2d');
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        // Once the image is done loading, it'll be saved inside our state.
        // Otherwise, we can't draw the image, so skip it.
        if (this.state.backgroundImage !== null) {
            ctx.drawImage(this.state.backgroundImage, 0, 0);
        }
        // Draw all the dots.
        let coordinates = this.getCoordinates();
        for(let coordinate of coordinates) {
            this.drawCircle(ctx, coordinate);

        }
    };

    drawLine  = ()=>{
        let ctx = this.canvasReference.current.getContext('2d');
        let coordinates = this.getCoordinates();
        for (let line of this.props.edge){
            let firstPoint = line[0];
            let secondPoint = line[1];
            let color = line[2];
            let firstCor = firstPoint[0] + firstPoint[1]*this.props.size ;
            let secondCor = secondPoint[0]+ secondPoint[1]*this.props.size;
            firstCor = coordinates[firstCor];
            secondCor = coordinates[secondCor];

            ctx.beginPath();
            ctx.moveTo(firstCor[0],firstCor[1]);
            ctx.strokeStyle = color;
            ctx.lineTo(secondCor[0],secondCor[1]);
            ctx.stroke();
        }
    };

    getCoordinates = () => {
        let coordinates = [];
        let i,j,offset;
        offset = 500/(this.props.size-1);
        for( i=0; i< this.props.size; i++){
            for (j=0; j<this.props.size; j++){
                coordinates.push([j*offset, i*offset]);
            }
        }
        let co;
        //check whether coordinates are on margin. If they were, let them 1 unit away from margin for clearness.
        for (i=0;i< coordinates.length;i++){
            co = coordinates[i];
            if(co[0]===0) co[0]=1;
            if (co[1]===0) co[1]=1;
            if(co[0]=== this.props.height) co[0] = this.props.height-1;
            if(co[0]===this.props.width) co[0] = this.props.width -1;
            if(co[1]=== this.props.height) co[1] = this.props.height-1;
            if(co[1]===this.props.width) co[1] = this.props.width -1;
        }

        if(this.props.size ===1) coordinates =[[250,250]];
        return coordinates;
    };

    drawCircle = (ctx, coordinate) => {
        ctx.fillStyle = "white";
        // Generally use a radius of 4, but when there are lots of dots on the grid (> 50)
        // we slowly scale the radius down so they'll all fit next to each other.
        let radius = Math.min(4, 100 / this.props.size);
        ctx.beginPath();
        ctx.arc(coordinate[0], coordinate[1], radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    render() {
        return (
            <div id="grid">
                <canvas ref={this.canvasReference} width={this.props.width} height={this.props.height}/>
                <p>Current Grid Size: {this.props.size}</p>
            </div>
        );
    }
}

export default Grid;

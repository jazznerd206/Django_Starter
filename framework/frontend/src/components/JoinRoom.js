import React, { Component } from 'react';
import { Button, Grid, Typography, TextField, FormHeperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class JoinRoom extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid 
                container 
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                    align="center"
                >
                    <Typography
                        component='h4'
                        variant='h4'
                    > Join A Room
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

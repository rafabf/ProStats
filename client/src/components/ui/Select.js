import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {



    const classes = useStyles();
    const membersteam = React.useState('');
    const handleChange = event => {
        membersteam(event.target.value);
    };
    console.log(props.teams && props.teams)

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Seleciona un equipo</InputLabel>
                <Select labelId="simple-select-label" id="simple-select" value="teams" onChange={handleChange}>
                    {props.teams.length && props.teams.map(team => <MenuItem value={team.name}>{team.name}</MenuItem>)}
                </Select>
            </FormControl>

        </div >)

}


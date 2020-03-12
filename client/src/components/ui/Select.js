import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './select.css'


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
    const [membersteam, setMembersteam] = React.useState([])

    // console.log(membersteam)

    const handleChange = event => {
        console.log(event.target.name, "name selector")
        setMembersteam(event.target.value);
        props.setMembers(event.target.value, event.target.name)
        // membersteam = () => {
        //     this.services.membersteam()
        //         .then(membersTeam => this.setState({ membersteam: membersTeam }))
        //         .catch(err => console.log(err))

        // }

    };

    console.log(props.teams && props.teams)

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel style={{ Width: '400px' }} className="select-style" id="demo-simple-select-label">Seleciona un equipo</InputLabel>
                <Select style={{ maxWidth: '400px' }} labelId="simple-select-label" id="simple-select" value={membersteam} onChange={handleChange} name={props.name}>
                    {props.teams.length && props.teams.map(team => <MenuItem value={team.name}>{team.name}</MenuItem>)}
                </Select>
            </FormControl>

        </div >)

}


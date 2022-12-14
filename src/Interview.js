import * as React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Marquee from "react-fast-marquee";

import './index.css'

export default function SelectVariants({ datas }) {

    const [Movies, setMovie] = React.useState('');
    const [crawl, setCrawl] = useState('');
    const [newcharacters, setCharactersNames] = useState([]);
    const [spinner, setSpinner] = useState(false);

    const movieDatas = datas;

    const handleChange = (event) => {
        setMovie(event.target.value);

        if (event.target.value === '') {
            document.getElementById("character-table").innerHTML = ''
            document.getElementById('movie').innerHTML = ''
            document.getElementById("char").innerHTML = ""
        } else {
            document.getElementById("character-table").innerHTML = `
                <th>Name</th>
                <th>Gender</th>
                <th>Height</th>
            `
            document.getElementById('movie').innerHTML = `
            <h6>Movie: <span>${event.target.value}</span></h6>
            `
            document.getElementById("char").innerHTML = `
            <h6>Characters: </h6>
            `
        }

        //get characters from movie name
        let q = movieDatas.find(x => x.title === event.target.value);

        setCrawl(q.opening_crawl)
        setCharactersNames(q.characters)
        //console.log(q)

        const characterArray = []

        q.characters.forEach(character => {
            //console.log(character)

            async function getCharacters() {
                setSpinner(true);

                let myCharacter = await fetch(character)
                    .then(myCharacter => myCharacter.json())
                characterArray.push(myCharacter)

                setSpinner(false);
                return characterArray
            }


            getCharacters()
                .then(myCharacter =>
                    setCharactersNames([...characterArray])
                )
        })

    };

    return (
        <div>
            <FormControl variant="standard" className='input-field' sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-standard-label">Movies</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={Movies}
                    onChange={(event) => { handleChange(event) }}
                    label="Movies"
                >
                    {
                        datas.map((data, i) =>
                            <MenuItem key={i} className='select-items' value={data.title} name={data.opening_crawl}>
                                {data.title}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <div>
                <div id='movie'>

                </div>

                <Marquee className='crawl' behavior='scroll' direction='left' speed={20} delay={3} gradient={false}>{crawl}</Marquee>

            </div>
            <div>
                <div id='char'>
                    
                </div>
                <table>
                    <tr id='character-table'>

                    </tr>

                    {newcharacters && newcharacters.map((char, i) =>
                        <tr key={i}>
                            <td>{char.name}</td>
                            <td>{char.gender}</td>
                            <td>{char.height}cm</td>
                        </tr>
                    )}
                    {spinner && (
                        <div class="loader"></div>
                    )}

                </table>
            </div>
        </div>
    );
}


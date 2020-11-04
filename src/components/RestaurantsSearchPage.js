import React, { useState, useEffect } from 'react';
import fetchRestaurantData from '../api/fetchRestaurantData'
import Select from './Select';

const RestaurantsSearchPage = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [possibleStates, setPossibleStates] = useState([]);
    const [possibleGenres, setPossibleGenres] = useState([]);
    const [possibleAttires, setPossibleAttires] = useState([]);

    const [stateValue, setStateValue] = useState("All")
    const [genreValue, setGenreValue] = useState("All")
    const [attireValue, setAttireValue] = useState("All")

    const getUniques = (array, property) => {
        if (property){
            return [...new Set(array.map(x=>x[property]))];
        } else {
            return [...new Set(array)]
        }
    }

    useEffect(() => {
        //Get all unique values and sort alphabetically.
        setPossibleStates(getUniques(allRestaurants, "state").sort());
        //Get all of each values constituent string values, flatten the array and get unique values.
        setPossibleGenres(getUniques(allRestaurants.map(x=>x.genre.split(",")).flat(), null).sort());
        setPossibleAttires(getUniques(allRestaurants, "attire").sort());
    }, [allRestaurants])

    useEffect(() => {
        fetchRestaurantData().then(res => {
            setAllRestaurants(res);
        })
    }, [])

    const setOptions = (arr) => {
        //return all options for that array preceded by "ALL" option.
        return [<option key="all" value="All">All</option>, ...arr.map((x,i)=> <option key={i} value={x}>{x}</option>)]
    }

    return ( 
        <div>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <h2> Restaurants </h2>
                <div>
                    <p>Search</p>
                    <input/>
                </div>
                <Select 
                    title="State"
                    value={stateValue} 
                    changeHandler={(e)=>setStateValue(e.target.value)} 
                    options={setOptions(possibleStates)} 
                />
                <Select 
                    title="Genre"
                    value={genreValue} 
                    changeHandler={(e)=>setGenreValue(e.target.value)} 
                    options={setOptions(possibleGenres)} 
                />
                <Select 
                    title="Attire"
                    value={attireValue} 
                    changeHandler={(e)=>setAttireValue(e.target.value)} 
                    options={setOptions(possibleAttires)} 
                />
            </div>
            <hr/>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Genres</th>
                        <th>Attire</th>
                    </tr>
                    {allRestaurants.map((item, i) => {
                        return (
                            <tr key={i} >
                                <td>{item.name}</td>
                                <td>{item.genre}</td>
                                <td>{item.attire}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        
    );
}
 
export default RestaurantsSearchPage;
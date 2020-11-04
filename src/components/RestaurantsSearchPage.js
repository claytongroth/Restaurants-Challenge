import React, { useState, useEffect } from 'react';
import fetchRestaurantData from '../api/fetchRestaurantData'
import Select from './Select';
import Table from './Table';

const RestaurantsSearchPage = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);

    //filtered result for dipslaying in table
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [possibleStates, setPossibleStates] = useState([]);
    const [possibleGenres, setPossibleGenres] = useState([]);
    const [possibleAttires, setPossibleAttires] = useState([]);

    //hold the search value 
    const [search, setSearch] = useState('');
    //search filter for results set from search value
    const [searchFilter, setSearchFilter] = useState('');

    const [stateValue, setStateValue] = useState("All");
    const [genreValue, setGenreValue] = useState("All");
    const [attireValue, setAttireValue] = useState("All");

    const getUniques = (array, property) => {
        if (property){
            return [...new Set(array.map(x=>x[property]))];
        } else {
            return [...new Set(array)];
        }
    }

    useEffect(() => {
        fetchRestaurantData().then(res => {
            setAllRestaurants(res);
        })
    }, []);

    //When any of the select values change, filter for rest results.
    useEffect(() => {
        let newRestaurants = [...allRestaurants];
        if (stateValue !== "All"){
            newRestaurants = newRestaurants.filter(rest =>  rest.state === stateValue );
        }
        if (genreValue !== "All"){
            newRestaurants = newRestaurants.filter(rest => rest.genre.includes(genreValue));
        }
        if (attireValue !== "All"){
            newRestaurants = newRestaurants.filter(rest => rest.attire === attireValue);
        }
        if (searchFilter){
            const searchTerm = searchFilter.toLowerCase();
            newRestaurants = newRestaurants.filter(rest => { 
               return rest.name.toLowerCase().includes(searchTerm) || 
                rest.city.toLowerCase().includes(searchTerm) || 
                rest.genre.toLowerCase().includes(searchTerm)
            })
        }
         //set filtered and sort them alphabetically
        newRestaurants = newRestaurants.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
        setFilteredRestaurants(newRestaurants);
    }, [allRestaurants, stateValue, genreValue, attireValue, searchFilter])

    //if search goes empty or gets below 4 charaters, clear filter
    useEffect(() => {
        if (!search || search.length < 4) {
            setSearchFilter('');
        }
    }, [search])

    useEffect(() => {
        //Get all unique values and sort alphabetically.
        setPossibleStates(getUniques(allRestaurants, "state").sort());
        //Get all of each values constituent string values, flatten the array and get unique values.
        setPossibleGenres(getUniques(allRestaurants.map(x=>x.genre.split(",")).flat(), null).sort());
        setPossibleAttires(getUniques(allRestaurants, "attire").sort());
    }, [allRestaurants])


    const setOptions = (arr) => {
        //return all options for that array preceded by "ALL" option.
        return [<option key="all" value="All">All</option>, ...arr.map((x,i)=> <option key={i} value={x}>{x}</option>)]
    }

    const handleKeyPress = (e) => {
        if (e.which === 13){
            setSearchFilter(search);
        }
    }
    return ( 
        <div>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <h2> Restaurants </h2>
                <div>
                    <p>Search</p>
                    
                    <input onKeyPress={(e)=> {handleKeyPress(e)}} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <button onClick={()=>setSearchFilter(search)}>Search</button>
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
            {
                filteredRestaurants.length > 0 ?
                <Table array={filteredRestaurants} />
            : 
                <h3>No search results. Please try broadening your search!</h3>
            }
        </div>
        
    );
}
 
export default RestaurantsSearchPage;
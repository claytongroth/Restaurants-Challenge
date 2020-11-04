import React, { useState, useEffect } from 'react';
import fetchRestaurantData from '../api/fetchRestaurantData'

const RestaurantsSearchPage = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);


    useEffect(() => {
        fetchRestaurantData().then(res => {
            setAllRestaurants(res);
        })
    }, [])

    return ( 
        <div>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <h2> Restaurants </h2>
                <div>
                    <p>Search</p>
                    <input/>
                </div>
                <div>
                    <p>State</p>
                    <select>
                        <option value="Test">Test</option>
                    </select> 
                </div> 
                <div>
                    <p>Genre</p>
                    <select>
                        <option value="Test">Test</option>
                    </select> 
                </div> 
                <div>
                    <p>Attire</p>
                    <select>
                        <option value="Test">Test</option>
                    </select> 
                </div> 
            </div>
            <hr/>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
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
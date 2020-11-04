import React, { useState, useEffect } from 'react';
import fetchRestaurantData from '../api/fetchRestaurantData'

const RestaurantsSearchPage = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurantData().then(res => {
            console.log(res)
            setAllRestaurants(res);
        })
    }, [])

    return ( 
        <h5> Restaurants </h5>
    );
}
 
export default RestaurantsSearchPage;
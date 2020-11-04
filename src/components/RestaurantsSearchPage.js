import React, { useState, useEffect } from 'react';
import fetchRestaurantData from '../api/fetchRestaurantData'

const RestaurantsSearchPage = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);

    const fetchData = async () => {
        fetchRestaurantData();
    }

    useEffect(() => {
        fetchData().then(res => 
            setAllRestaurants(res)
        )
    }, [])

    return ( 
        <h5> Restaurants </h5>
    );
}
 
export default RestaurantsSearchPage;
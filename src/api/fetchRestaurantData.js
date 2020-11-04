const fetchRestaurantData = async () => {
    const response = await fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
        headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
        },
    });
    const parsedResponse = await response.json();
    return parsedResponse;
}

export default fetchRestaurantData;
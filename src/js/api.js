const API_KEY = 'T3RRXDF-KC3MA6P-KMCTJ22-3JNN7TV';

const api = (apiURL = 'https://beerflix-api.herokuapp.com/api/v1/') => {
    const searchAPIEndpoint = `${apiURL}beers?search=`;
    const showsAPIEndpoint = `${apiURL}beers`;
    return {
        getBeers: async text => {
            try {
                const URL = text ? `${searchAPIEndpoint}${text}` : showsAPIEndpoint;
                const response = await fetch(URL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error fetching beers');
                }
                const data = await response.json();
                return data.beers;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getBeersData: async (text, startData, endData) => {
            try {
                const URL = text ? `${searchAPIEndpoint}${text}` : `${showsAPIEndpoint}`;
                const response = await fetch(URL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error fetching beers');
                }

                const data = await response.json();
                const filterBeers = data.beers.filter(function (beer) {
                    const inputDate = beer.firstBrewed.split('/');
                    if (parseInt(inputDate[1]) > startData.split("-")[0] && parseInt(inputDate[1]) < endData.split("-")[0]) {
                        return beer;
                    } else if (parseInt(inputDate[1]) == startData.split("-")[0]) {
                        if (parseInt(inputDate[0]) > startData.split("-")[1]) {
                            return beer;
                        }
                    } else if (parseInt(inputDate[1]) == endData.split("-")[0]) {
                        if (parseInt(inputDate[0]) < endData.split("-")[1]) {
                            return beer;
                        }
                    }
                });

                if (filterBeers.length > 10) {
                    return filterBeers.slice(0, 10);
                } else {
                    return filterBeers;
                }
            }
            catch (err) {
                console.error(err.message);
                throw err;
            }
        },
        getBeersDetail: async id => {
            try {
                const URL = `${showsAPIEndpoint}/${id}`;
                const response = await fetch(URL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error getting a show');
                }

                const data = await response.json();
                return data.beer;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getQuotes: async id => {
            try {
                const response = await fetch(`${apiURL}/quote/${id}`);
                if (!response.ok) {
                    throw new Error('Error getQuotes');
                }
                const quotes = await response.json();
                return quotes;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        createQuote: async (id, text) => {
            try {
                const response = await fetch(`https://beerflix-api.herokuapp.com/api/v1/beers/${id}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({ comment: text }),
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error creating Quote');
                }

                const responseBody = await response.json();
                return responseBody;
            } catch (err) {
                console.error(err);
                throw err;
            }

        },

    };
};
export default api;
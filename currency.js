const axios = require("axios");
const getExchangeRate = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=b040b9ce95e98a3c5b58164124c54d51').then((response) => {
        return response.data.rates[to];
    });
}

const getContries = (currencyCode) => {
    let url = `https://restcountries.eu/rest/v2/currency/${currencyCode}/`;
    return axios.get(url).then((response) => {
        return response.data.map((country) => country.name);

    });
}

const convertCurrency = (from, to, amount) => {
    let countries;
    return getContries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} ir worth ${exchangedAmount} ${to}.  ${to} can be used in the following countries: ${countries.join(', ')}   `;
    });
};

// getExchangeRate('EUR','CAD').then((rate) => {
//     console.log(rate);
// })

// getContries('USD').then((rate) => {
//     console.log(rate);
// })

const convertCurrencyAlt = async(from, to, amount) => {
    const countries = await getContries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} ir worth ${exchangedAmount} ${to}.  ${to} can be used in the following countries: ${countries.join(', ')}   `;

};


convertCurrency('EUR', 'USD', 100).then((status) => {
    console.log(status);
});

convertCurrencyAlt('EUR', 'USD', 100).then((status) => {
    console.log(status);
})

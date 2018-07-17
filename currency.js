const axios = require("axios");

const getExchangeRate = async(from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=b040b9ce95e98a3c5b58164124c54d51');
        const rate = response.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error();
        }
    }
    catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }

}

const getContries = async(currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}/`);
        return response.data.map((country) => country.name);
    }
    catch (e) {
        throw new Error(`Unable to get countries that  ${currencyCode}.`);
    }

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

// convertCurrency('EUR', 'USD', 100).then((status) => {
//     console.log(status);
// });

convertCurrencyAlt('EUR', 'MMM', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e.message);
});

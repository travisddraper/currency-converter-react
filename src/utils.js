export const checkStatus = (response) => {
    if(response.ok) {
        return response;
    }

    throw new Error('Request was either a 404 or 500');
}

export const json = (response) => response.json();

export const currencyTracker = {
    'AUD': 'Australia',
    'BGN': 'Bulgaria',
    'BRL': "Brazil",
    'CAD': "Canada",
    'CHF': "Switzerland",
    'CNY': "China",
    'CZK': "Czech Republic",
    'DKK': 'Denmark',
    'EUR': 'European Union',
    'GBP': 'United Kingdom',
    'HKD': 'Hong Kong',
    'HRK': 'Croatia',
    'HUF': 'Hungary',
    'IDR': 'Indonesia',
    'ILS': 'Israel',
    'INR': 'India',
    'ISK': 'Iceland',
    'JPY': 'Japan',
    'KRW': 'South Korea',
    'MXN': 'Mexico',
    'MYR': 'Malaysia',
    'NOK': 'Norway',
    'NZD': 'New Zealand',
    'PHP': 'Philippines',
    'PLN': 'Poland',
    'RON': 'Romania',
    'RUB': 'Russia',
    'SEK': 'Sweden',
    'SGD': 'Singapore',
    'THB': 'Thailand',
    'TRY': 'Turkey',
    'USD': 'United States',
    'ZAR': 'South Africa'    
}
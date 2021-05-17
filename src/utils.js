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
    'CZK': "Czech_Republic",
    'DKK': 'Denmark',
    'EUR': 'European_Union',
    'GBP': 'United_Kingdom',
    'HKD': 'Hong Kong',
    'HRK': 'Croatia',
    'HUF': 'Hungary',
    'IDR': 'Indonesia',
    'ILS': 'Israel',
    'INR': 'India',
    'ISK': 'Iceland',
    'JPY': 'Japan',
    'KRW': 'South_Korea',
    'MXN': 'Mexico',
    'MYR': 'Malaysia',
    'NOK': 'Norway',
    'NZD': 'New_Zealand',
    'PHP': 'Philippines',
    'PLN': 'Poland',
    'RON': 'Romania',
    'RUB': 'Russia',
    'SEK': 'Sweden',
    'SGD': 'Singapore',
    'THB': 'Thailand',
    'TRY': 'Turkey',
    'USD': 'United_States',
    'ZAR': 'South_Africa'    
}
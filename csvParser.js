const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const csvHeaders = [
    'Name',
    'Category',
    'Address',
    'Phone',
    'Email',
    'website',
    'Latitude',
    'Longitude',
    'Weekday_Open_Hour',
    'Weekday_Close_Hour',
    'Saturday_Open_Hour',
    'Saturday_Close_Hour',
    'Sunday_Open_Hour',
    'Sunday_Close_Hour',
    'Added_Time',
    'Referrer',
    'Task_Owner',
];


fs.createReadStream(path.resolve(__dirname, 'ClientDetails_Report.csv'))
    .pipe(csv.parse({ headers: csvHeaders, renameHeaders: true }))
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
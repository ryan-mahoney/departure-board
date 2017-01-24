"use strict";

// node's date formatting is not as powerful as browser's...
const dateFormat = (seconds) => {
    let date = new Date(seconds * 1000);
    date = date.toLocaleString().split(', ')[1];
    return date.split(':')[0] + ':' + date.split(':')[1] + ' ' + date.split(' ')[1];
};

// export one function to render entire page
module.exports = (data) => {

    // get an array of table-row strings
    const rows = data.
        sort((a, b) => (
            (parseInt(a.ScheduledTime) + parseInt(a.Lateness)) -
            (parseInt(b.ScheduledTime) + parseInt(b.Lateness))
        )).
        map((record) => {
            return `
                <tr>
                    <td>MBTA</td>
                    <td>${dateFormat(parseInt(record.ScheduledTime) + parseInt(record.Lateness))}</td>
                    <td>${record.Destination}</td>
                    <td>${record.Track}</td>
                    <td>${record.Status}</td>
                </tr>
            `;
        });

    // return the page with the table-rows merged in
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>North Station Departure Board</title>
            <link rel="stylesheet" href="http://yegor256.github.io/tacit/tacit.min.css"/>
        </head>
        <body>
            <h1>North Station Departure Board</h1>
            <table>
                <thead>
                    <tr>
                        <th>Carrier</th>
                        <th>Time</th>
                        <th>Destination</th>
                        <th>Track</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.join('')}
                <tbody>
            </table>
        </body>
    </html>`;
}

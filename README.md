# google-sheet-to-json

Get data from a Google Sheet as JSON. 

## Usage
Publish the Google Sheet as HTML, and point the app to it by setting the `url` query parameter, like this: `https://gs.jasonaa.me/?url=https://docs.google.com/spreadsheets/d/e/2PACX-1vRrQMuGETRv6JZqmA8fSIYhMrx4D-UvYJeA1Ir4Y3SBd8ebaIInoQ0dvd9Z-wb7z26dkUXie9SH3ZxB/pubhtml`. 

Then, you should get an array of JSON objects, with the headers of your sheet used as the object keys.


Here's how to publish your Google Sheet.

![GIF showing how to publish a Google Sheet as HTML](https://raw.githubusercontent.com/jasonappah/google-sheet-to-json/master/publish_google_sheet.gif)

---

Powered by Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/jasonappah/google-sheet-to-json)

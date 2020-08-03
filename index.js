const tabletojson = require('tabletojson').Tabletojson;
const express = require('express');
const app = express();

// put a link to your sheet, published as an HTML file
const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBlbpaaeSANDkmVYWGsoE--djAZFZtns-eC_SY_2KeK5ZT8vKu5TP48oeks-iGq5_L_PEoqCOczfCC/pubhtml?gid=155390857&single=true"

// enter your headings in this array
const headings = [
    'Row No',
    'Date',
    'Start Time (EST)',
    'End Time (EST)',
    'Start Time (UTC)',
    'End Time (UTC)',
    'Type',
    "Owner",
    'Public',
    'Action'
]

/////////////////////////////////////////////////////////
// there should be no need to touch anything down here //
/////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.get('*', function(req, res) {
    try {
        tabletojson.convertUrl(
            url,
            { useFirstRowForHeadings: true, headings: headings },
            function(tablesAsJson) {
                respond(tablesAsJson);
            }
        );

        function respond(d) {
            var tmp = []
            for (entry in d[0]) {
                tmp.push({ entry })
                tmp[entry]['Date'] = d[0][entry]['Date']
                tmp[entry]['Time'] = d[0][entry]['Start Time (EST)']
                tmp[entry]['Action'] = d[0][entry]['Action']
            }
            tmp.shift()
            tmp.shift()
            res.json(tmp)
        }

    } catch (err) {
        res.send(err)
    }
});

app.listen(process.env.PORT || 80);

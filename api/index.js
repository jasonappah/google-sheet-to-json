const tabletojson = require('tabletojson').Tabletojson;

////////////////////////////////////////////////////////
// there should be no need to touch anything up there //
////////////////////////////////////////////////////////

module.exports = (req, res) => {
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
        "Owner",
        'Action',
        'Completed',
        'Public',
        'Notes'
    ]

    /////////////////////////////////////////////////////////
    // there should be no need to touch anything down here //
    /////////////////////////////////////////////////////////

    try {
        tabletojson.convertUrl(
            url, { useFirstRowForHeadings: true, headings: headings },
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
            res.send(JSON.stringify(tmp))
        }

    } catch (err) {
        res.send(err)
    }

}

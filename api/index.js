const HtmlTableToJson = require("html-table-to-json");
const fetch = require("node-fetch");

module.exports = (req, res) => {
  // put a link to your sheet, published as an HTML file
  const url =
    req.query.url ||
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBlbpaaeSANDkmVYWGsoE--djAZFZtns-eC_SY_2KeK5ZT8vKu5TP48oeks-iGq5_L_PEoqCOczfCC/pubhtml?gid=155390857&single=true";

  try {
    fetch(url)
      .then(response => response.text())
      .then(body => next(body));

    function next(html) {
      const jsonTables = HtmlTableToJson.parse(html);

      var data = jsonTables.results[0];
      const headings = Object.values(jsonTables.results[0][0]);

      data.shift();

      var final = [];

      for (var row in data) {
        var obj = {};
        const vals = Object.values(data[row]);

        for (var cell in vals) {
          obj[headings[cell]] = vals[cell];
        }
        final.push(obj);
      }
      res.send(JSON.stringify(final));
    }
  } catch (e) {
    const json = { service_error: e };
    console.error(json);
    res.send(JSON.stringify(e));
  }
};

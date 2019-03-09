// ### Level 1: Automatic Table and Date Search

// * Create a basic HTML web page
// * Using the UFO dataset provided (array of JavaScript objects), 
//         - write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
//         - Make sure you have a column for `date/time`, `city`, `state`, `country`, `shape`, and `comment` at the very least.
// * Use a date form in your HTML document and write JavaScript code that will listen for events and search 
//   through the `date/time` column to find rows that match user input.

/**
 * Helper function to select UFO data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - datetime
 * index 1 - city
 * index 2 - state
 * index 3 - country
 * index 4 - shape
 * index 5 - durationMinutes
 * index 6 - comments
 */

function unpack(rows, index) {
	return rows.map(function (row) {
		return row[index];
	});}

// from data
var tableData = data;

function handleSubmit() {               // date entered by user
	d3.event.preventDefault(); // Prevent the page from refreshing
        var date_input = d3.select("#datetime").node().value; // Select the input value from the form
        //console.log("Hello: ", date_input); // for checking; 
        //d3.select("#filterdate-btn").node().value = ""; // clear the input value
        date_data = tableData.filter((d,i)=>d.datetime===date_input)
 	buildTable(date_data); // Build the plot with the new date selected; 
                        }               // dataset filtered by date & passed ⟶ buildTable(filtered_dates)

function buildTable(input_data) {       // columns needed: datetime, city, state, country, shape, durationMinutes, comments; 
 	var tbody = d3.select("#ufo-table").select("tbody");
        var datetime = unpack(input_data, 'datetime');
        var city = unpack(input_data, 'city');
        var state = unpack(input_data, 'state');
        var country = unpack(input_data, 'country');
        var shape = unpack(input_data, 'shape');
        var durationMinutes = unpack(input_data, 'durationMinutes');
        var comments = unpack(input_data, 'comments');
        d3.select("#ufo-table").select("tbody").selectAll('tr').remove() //clear table
	for (var i = 0; i < input_data.length; i++) {
		trow = tbody.append("tr");
		trow.append("td").text(datetime[i]);
		trow.append("td").text(city[i]);
		trow.append("td").text(state[i]);
		trow.append("td").text(country[i]);
                trow.append("td").text(shape[i]);
                trow.append("td").text(durationMinutes[i]);
                trow.append("td").text(comments[i]);
                }
                                };      // clear existing table & builds new one w/ passed data

buildTable(tableData);

d3.select("#date-btn")
        .on("click", handleSubmit);     // Add event listener for submit button

// ### Level 2: Multiple Search Categories (Optional)
// * Complete all of Level 1 criteria.
// * Using multiple `input` tags and/or select dropdowns, write JavaScript code so the user can to set multiple filters &
//   search for UFO sightings using the following criteria based on the table columns:
//   1. `date/time`
//   2. `city`
//   3. `state`
//   4. `country`
//   5. `shape`



















//d3.selectAll("tr").filter(function(datum, index) { return index & 1; });
// filter returns a new selection of elements that evaluated to true; can be returned blank
// filter by d3 selector 
// filter by function ⟶ evaluated for entire selection in order: ⟶ datum(d) ⟶ index(i) ⟶ selected_group_of_nodes
// this == current nodes[i]

// d3.selectAll("tr").filter((datum, index)=>datum.datetime='1/1/2010')


// d3.select('#ufo-table').select('tbody').selectAll('tr').select('td')
/**   Level 1: Automatic Table and Date Search 
 *        Using the UFO dataset provided (array of JavaScript objects), 
 *                - Populate an html table w/ its values, using columns `date/time`, `city`, `state`, `country`, `shape`, & `comment`.
 *        Use date input form in HTML & use JavaScript to listen for input & filter `datetime` column for matching results.
*/

/**  UFO dataset Metadata - Array of Objects:
 *      0:datetime, 1:city, 2:state, 3:country, 4:shape, 5:durationMinutes, 6:comments
 */

var tableData = data;                           // from data.js

function unpackArray(arrayRows, indexName){     // parameter = array of objects & desired filter
        
        return arrayRows.map(row=>row[indexName]);
                                          }     // return ⟶ array of filtered values

function handleSubmit() {                       // invoked when date entered by user
	d3.event.preventDefault(); // Prevent the page from refreshing
        var userDateEntry = d3.select("#datetime").node().value; // Select the input value from the form
        //console.log("Hello: ", userDateEntry); // for checking; 
        //d3.select("#filterdate-btn").node().value = ""; // clear the input value
        validDate(userDateEntry)        // return ⟶ validDate(userDateEntry) ⟶ buildTable(filteredDatesArray) ⟶ Build the plot with the new date selected;;
                        };                      // dataset filtered by date & passed to ⟶ validDate(userDateEntry); which will check & pass to ⟶ buildTable(filtered_dates)

function validDate(dateInput) {                 // parameter = date input by user
        if (availableDates.includes(dateInput)) {
                filteredDatesArray = tableData.filter((datum,index)=>datum.datetime===dateInput) // returns array of objects w/ dates filtered
                return success(filteredDatesArray), buildTable(filteredDatesArray);
                                                } // Build the plot with the new date selected;;
        else {return warning(), buildTable(tableData)}
                              };                // checks validity & return ⟶ warning or buildTable(filteredDatesArray)
function warning(){                             // ALERT: invalid date
        var str = 'Date entered is unavailable (or invalid)';
        alert(`${str},  This dataset only contains ${availableDates.length} sightings on the following unique dates:\n\n${availableDates.join(",\t")}\n\nPlease try again.`)        
                  };
function success(inputArray){                   // ALERT: success
                alert(`${inputArray.length} sightings found!`)        
                            };
function buildTable(inputArray) {               // parameter = array for which to populate table;
        // columns needed: datetime, city, state, country, shape, durationMinutes, comments; 
        var durationMinutes = unpackArray(inputArray, 'durationMinutes');
        var comments = unpackArray(inputArray, 'comments');
        var datetime = unpackArray(inputArray, 'datetime');
        var country = unpackArray(inputArray, 'country');
        var shape = unpackArray(inputArray, 'shape');
        var state = unpackArray(inputArray, 'state');
        var city = unpackArray(inputArray, 'city');

        var tbody = d3.select("#ufo-table").select("tbody");
        tbody.selectAll('tr').remove() //clear table
	for (var i = 0; i < inputArray.length; i++) {
		trow = tbody.append("tr");
		trow.append("td").text(datetime[i]);
		trow.append("td").text(city[i]);
		trow.append("td").text(state[i]);
		trow.append("td").text(country[i]);
                trow.append("td").text(shape[i]);
                trow.append("td").text(durationMinutes[i]);
                trow.append("td").text(comments[i]);
                }
                                };              // clear existing table & return ⟶ new table in HTML

buildTable(tableData);                          // initialize table when first loading page
var availableDates = uniqueDates();             // global array variable containing unique dates

d3.select("#date-btn")
        .on("click", handleSubmit);             // Add event listener for submit button

function uniqueDates()  {                       // Determines # of unique dates –––
var flags = [], availableDates = [], l = data.length, i;
for( i=0; i<l; i++) 
        {
        if( flags[data[i].datetime]) continue;
        flags[data[i].datetime] = true;
        availableDates.push(data[i].datetime);
        }
        return availableDates;
                        };                      // needed to validate user entry
// –––––––––––––––––––––––––––––– ### Level 2: Multiple Search Categories (Optional)

/* Using multiple `input` tags and/or select dropdowns, write JavaScript code so the user can to set multiple filters &
 * search for UFO sightings using the following criteria based on the table columns:
 * 1. `date/time`
 * 2. `city`
 * 3. `state`
 * 4. `country`
 * 5. `shape`
*/
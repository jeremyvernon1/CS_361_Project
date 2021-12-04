const MAX_RESULTS = 3;

function compare() {
    var form = document.getElementById("searchResults");
    const checkedArr = [];
    form.querySelectorAll('input').forEach(function (input) {
        /* used from https://stackoverflow.com
        /questions/48000213/saving-checkbox-text-value-to-an-array */
        if(input.type === 'checkbox' && input.checked) {
            checkedArr.push(input.value);
        }
    });
    // Check if more than 3 selected
    if (checkedArr.length > MAX_RESULTS) {
        window.alert("Please select no more than " + MAX_RESULTS + " airports.");
    }
    
    // Route to new page
    var resultValues = "";
    if (checkedArr[0]) {
        tempValue = "?airport0=" + checkedArr[0];
        resultValues += tempValue;
    }
    for (i = 1; i < 3; i++) {
        if (checkedArr[i]) {
            tempValue = "&airport" + i + "=" + checkedArr[i];
            resultValues += tempValue;
        }
    }
    event.preventDefault(); // Redirect from State page does not work without.
    window.location.href = "/sitePage3" + resultValues;
    return false;
}

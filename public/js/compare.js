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
    if (checkedArr.length > 3) {
        window.alert("Please select no more than 3 airports.");
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
    event.preventDefault();
    window.location.href = "/sitePage3" + resultValues;
    return false;
}

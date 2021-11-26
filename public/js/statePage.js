function compare() {
    const checkedArr = [];
    var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
    // Get items that are clicked
    // Check if over 3
    // Route to new page
    window.location.href = "/sitePage3";
}

var checkedCount = 0;

checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
if (checkedCount > 3) {
    alert("Please select fewer airports.");
}

const stateAbbreviations = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
   ];

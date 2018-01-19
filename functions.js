
        
        
//set event listeners on inputs

/* I'm having all values get set on the dollarAmount entry in order to show the user 
 * what their inputs are accomplishing. I believe this will also motivate them
 * to change all values more than once, to see how their inputs affect the outcome.
*/
document.getElementById('dollarAmount').addEventListener('input', function() { 
    getHistoricalPrice(document.getElementById('dateSlider').value);

});
document.getElementById('dateSlider').addEventListener('input', setBuyDate);

//load the page
document.addEventListener('load', loadPage());


function loadPage() {


    loadJSON();
    setBuyDate();


}



function setCurrentPrice(numCoins) {



    var coinPrice = 14445.84;

    var currentValue = coinPrice * numCoins;


    pageDisplay('finalValue', currentValue.toFixed(2));


}






//takes UNIX interval from the dateSlider and converts it to a dateString
//  also, calls priceCheck function using the date
function setBuyDate() {

    let sliderInput = document.getElementById('dateSlider').value;

    //check price and calls setCoins()
    getHistoricalPrice(sliderInput);

    let buyDate = new Date(sliderInput * 1000); //converts the UNIX slider date to a DATE object



    //display the date                        
    pageDisplay('buyDate', printWeekOf(buyDate));


}


function getHistoricalPrice(unixDate){

    //get current array from local storage, parse from string to JSON
    var pricesArray = JSON.parse(localStorage.getItem('prices'));

    var dateFound = false;
    for(var i = 0; i < pricesArray.length; i++) {
        if (pricesArray[i].date == unixDate) {
            dateFound = true;
            setCoins(pricesArray[i].high);//sends price high at that date to set num coins
            break;
        }
    }

}

 /*  setCoins() - uses price from the high at buyDate, and
*       returns how many bitcoins you would have.
*       
*/

function setCoins(highPrice) {

    let startingDollars = document.getElementById('dollarAmount').value;

    let numCoins = startingDollars / highPrice;


    pageDisplay('coinCount', numCoins);

    //temporary call
    setCurrentPrice(numCoins);

}


function pageDisplay(id, content){
    document.getElementById(id).innerHTML = content;
}

/* checkInputsFull - returns true if all inputs have values
//      used to trigger the final display of dollars
function checkInputsFull(){

    let dollarInput = document.getElementById('dollarAmount').value;
    let buyDate = document.getElementById('buyDate').value;
    let sellDate = document.getElementById('sellDate').value;

    if (dollarInput && buyDate && sellDate){
        return true; //the inputs all have values
    }
    else return false;

}
*/

// displayResults -- takes final dollar amount and displays it

function displayResults(finalAmount) {


    document.getElementById('finalValue').innerHTML = finalAmount;
}


// printWeekOf - convert unix stamp results  to formatted date

function printWeekOf(buyDate){
    let month = buyDate.getMonth() + 1; //get-date methods use array indexing (jan is 0)
    let day = buyDate.getDate() + 1;
    let year = buyDate.getFullYear();

    // print correct Month to correspond with Unix date
    switch(month) {
        case 1:
            month = 'Jan'
            break;
        case 2:
            month = 'Feb'
            break;
        case 3:
            month = 'Mar';
            break;
        case 4:
            month = 'Apr';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'Jun';
            break;
        case 7:
            month = 'Jul';
            break;
        case 8:
            month = 'Aug';
            break;
        case 9:
            month = 'Sep';
            break;
        case 10:
            month = 'Oct';
            break;
        case 11:
            month = 'Nov';
        default:
            month = 'Dec';
    }         

    return (month + ' ' + day + ', ' + year);        

}

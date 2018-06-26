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

//global element definitions
var whatButton = document.getElementById('what-btn');
var aboutSection = document.getElementById('about-section');


function setCurrentPrice(numCoins) {
    
    var coinPrice = 19891.00; //price Dec 16, 2017 (investing.com)
    var currentValue = coinPrice * numCoins;

    pageDisplay('finalValue', currentValue.toFixed(2));

    var startingDollars = document.getElementById('dollarAmount').value; //re-defined for scope
    
    if(startingDollars > currentValue){ //happy face! you dodged a bullet
        document.getElementById('face').src = 'happy-face.png';
        document.getElementById('face-msg').textContent = 'No regrets! You saved money!';
        document.getElementById('face-div').style.display = 'block';
    } else if (currentValue > startingDollars) {
        // missed opportunity, you should be sad
        document.getElementById('face').src = 'sad-face.png';
        document.getElementById('face-msg').textContent = 'Yikes. Hindsight is 20/20.';
        document.getElementById('face-div').style.display = 'block';
    }
    
}


//takes UNIX interval from the dateSlider and converts it to a dateString
//  also, calls priceCheck function using the date
function setBuyDate() {

    var sliderInput = document.getElementById('dateSlider').value;

    //check price and calls setCoins()
    getHistoricalPrice(sliderInput);

    var buyDate = new Date(sliderInput * 1000); //converts the UNIX slider date to a DATE object

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

    var startingDollars = document.getElementById('dollarAmount').value;

    var numCoins = (startingDollars / highPrice).toFixed(2);

    pageDisplay('coinCount', numCoins);

    //temporary call
    setCurrentPrice(numCoins);
    
    
    

}

// pageDisplay -- changes the inner HTML of an element with named ID

function pageDisplay(id, content){
    document.getElementById(id).innerHTML = content;
}


// displayResults -- takes final dollar amount and displays it

function displayResults(finalAmount) {
    document.getElementById('finalValue').innerHTML = finalAmount;
}


// printWeekOf - convert unix stamp results  to formatted date

function printWeekOf(buyDate){
    var month = buyDate.getMonth() + 1; //get-date methods use array indexing (jan is 0)
    var day = buyDate.getDate() + 1;
    var year = buyDate.getFullYear();

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
            break;
        default:
            month = 'Dec';
    }         

    return (month + ' ' + day + ', ' + year);        

}


// event listener to alternate calc and about sections
document.getElementById('what-btn').onclick = function(){
    
    if(aboutSection.style.display != 'block'){
        aboutSection.style.display = 'block';
        whatButton.textContent = 'Close Section';
        
    } else {
        aboutSection.style.display = 'none';
        whatButton.textContent = 'What is this?';
    }
}
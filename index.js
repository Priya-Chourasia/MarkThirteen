var birthDate=document.querySelector('#birthday-input');
var showButton=document.querySelector('#show-btn');
var Output=document.querySelector('#output');

showButton.addEventListener('click',clickHandler)
function clickHandler(e){
   
    var bdayStr=birthDate.value;
    if(bdayStr==""){
        Output.innerText= "Enter a valid date";
    }
    if(bdayStr!==''){
        var listofDates=bdayStr.split('-');
        var date={
            day:Number(listofDates[2]),
            month:Number(listofDates[1]),
            year:Number(listofDates[0]) 
        };
        var isPallindrome=checkPalindromeForAllDateFormats(date);
        if(isPallindrome){
       Output.innerText= "Yay! your Birthday is a palindrome";
        }
        else{
            var [ctr,nextDate]=getnextpalindromeDate(date);
            Output.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
        }
    }
}

function reverseStr(string) {
    var listofChars = string.split(''); //this will split the string eg['h','e','l,'l','o']
    var reverselistofChars = listofChars.reverse();
    var reversedString = reverselistofChars.join('');
    return reversedString;
    //return string.split('').reverse().join('');
}

function isPallindrom(string) {
    var reverse = reverseStr(string);
    return string === reverse;

}

function convertdatetoStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}

function getalldateFormats(date) {
    var dateStr = convertdatetoStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getalldateFormats(date);

    var check = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPallindrom(listOfPalindromes[i])) {
            check = true;
            break;
        }
    }
    return check;
}


function getnextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){ 
        
        if(isLeapYear(year)){ 
           if(day > 29){ 
             day = 1;
             month++;  
           }
        }
        else {
           if(day > 28){
             day = 1;
             month++;  
           }
        }
      }
      else {
        if(day > daysinMonth[month - 1]){ 
          day = 1; 
          month++;  
        }
      }
      if(month > 12){
        month = 1;
        year++; 
      }
    return {
        day: day,
        month: month,
        year: year
    };

}


function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getnextpalindromeDate(date) {
    var ctr = 0;
    var nextDate = getnextDate(date);

    while (1) {
        ctr++;
        var palindromedate = checkPalindromeForAllDateFormats(nextDate);
        if (palindromedate) {
            break;
        }
        nextDate = getnextDate(nextDate);
    }
    return [ctr, nextDate];

}
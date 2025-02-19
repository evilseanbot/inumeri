var numsTo19 = {
  "1": "uno",
  "2": "due",
  "3": "tre",
  "4": "quattro",
  "5": "cinque",
  "6": "sei",
  "7": "sette",
  "8": "otto",
  "9": "nove",
  "10": "dieci",
  "11": "undici",
  "12": "dodici",
  "13": "tredici",
  "14": "quattordici",
  "15": "quindici",
  "16": "sedici",
  "17": "diciassette",
  "18": "diciotto",
  "19": "diciannove"
};

var tensPlaceNums = {
  "2": "venti",
  "3": "trenta",
  "4": "quaranta",
  "5": "cinquanta",
  "6": "sessanta",
  "7": "settanta",
  "8": "ottanta",
  "9": "novanta"
};

function translateTo19( num ) {
  var translatedNum;
  for ( var prop in numsTo19 ) {
    if ( num == prop ) {
      translatedNum = numsTo19[ prop ];
      return translatedNum;
    }
  }
}

function translate20To99( num ) {
  var onesPlace = String( num )[ 1 ];
  var tensPlace = String( num )[ 0 ];
  var translatedNum;

    // Translate ones place.
  for ( var ones in numsTo19 ) {
    if ( ones == onesPlace ) {
        onesPlace = numsTo19[ ones ];
    }
  }

    // Change tre to tré.
  if ( onesPlace == "tre" ) {
    onesPlace = "tré";
  }

  for ( var tens in tensPlaceNums ) {
    if ( tensPlace == tens && onesPlace == "0" ) {
       translatedNum = tensPlaceNums[ tens ];
       return translatedNum;
    } else if ( tensPlace == tens && ( onesPlace == "uno" || onesPlace == "otto" ) ) {
       translatedNum = tensPlaceNums[ tens ].slice( 0, -1 ) + onesPlace;
       return translatedNum;
    } else if ( tensPlace == tens ) {
       translatedNum = tensPlaceNums[ tens ] + onesPlace;
       return translatedNum;
    }
  }
}

function translate100To999( num ) {
  var hundredsPlace = String( num )[ 0 ];
  var tensPlace = String( num )[ 1 ];
  var onesPlace = String( num )[ 2 ];
  var restOfNumber = parseInt( String( num ).slice( 1 ) );
  var hundreds;
  var translatedNum;

  /*If the hundreds place is 1, then you use "cento" NOT "uno cento"*/
  if ( ( parseInt( hundredsPlace ) > 1 ) ) {
    hundreds = translateTo19( Math.floor( num / 100 ) ) + "cento";
  } else {
    hundreds = "cento";
  }

  /*Obtain value of the tens and ones place.
  * The "o" ending of cento is dropped if followed by otto or ottanta.
  */
  if ( tensPlace == "0" && onesPlace == "0" ) {
    translatedNum = hundreds;
    return translatedNum;
  }

  if ( restOfNumber < 20 ) {
    if ( restOfNumber == 8 ) {
      hundreds = hundreds.slice( 0, -1 );
      translatedNum = hundreds + "otto";
      return translatedNum;
    } else if ( restOfNumber == 3 ) {
      translatedNum = hundreds + "tré";
      return translatedNum;
    } else {
      translatedNum = hundreds + translateTo19( restOfNumber );
      return translatedNum;
    }
  } else if ( restOfNumber >= 20 ) {
  if ( tensPlace == "8" ) {
    hundreds = hundreds.slice( 0, -1 );
  }

  translatedNum = hundreds + translate20To99( restOfNumber );
  return translatedNum;
  }
}

function translate1000To9999( num ) {
  var thousandsPlace = parseInt( String( num )[ 0 ] );
  var restOfNumber = parseInt( String( num ).slice( 1 ) );
  var thousands,
    translatedNum;

  if ( thousandsPlace == 1 ) {
    thousands = "mille";
  } else {
    thousands = translateTo19( thousandsPlace ) + "mila";
  }

  if ( restOfNumber == 0 ) {
    translatedNum = thousands;
    return translatedNum;
  } else if ( restOfNumber >= 100 ) {
    translatedNum = thousands + translate100To999( restOfNumber );
    return translatedNum;
  } else if ( restOfNumber >= 20 ) {
    translatedNum = thousands + translate20To99( restOfNumber );
    return translatedNum;
  } else {
    if ( restOfNumber != 3 ) {
      translatedNum = thousands + translateTo19( restOfNumber );
    } else {
      translatedNum = thousands + "tré";
    }
    return translatedNum;
  }
}

function translateNumber( num ) {
  var translatedNum;
  if ( num < 20 ) {
    translatedNum = translateTo19( num );
  } else if ( num >= 20 && num < 100 ) {
    translatedNum = translate20To99( num );
  } else if ( num >= 100 && num < 1000 ) {
    translatedNum = translate100To999( num );
  } else if ( num >= 1000 && num < 10000 ) {
    translatedNum = translate1000To9999( num );
  } else {
    return "That number is not within the specified range.";
  }
  return translatedNum;
}

function translate( input ) {
  return translateNumber( parseInt( input ) );
}

module.exports = translate;

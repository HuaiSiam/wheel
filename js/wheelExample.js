var balanceCoin = 500, choosePrize, finalCoins, select_coin, select_prize, 
prize_value, coin_value,select_radio, total_select_coin, selchb, selbtn, select_radio1;

// Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'numSegments'  : 8,     // Specify number of segments.
    'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
    'textFontSize' : 28,    // Set font size as desired.
    'segments'     :        // Define segments including colour and text.
    [
        {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
        {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 5,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : alertPrize
    }
});

// Vars used by the code in this page to do power controls.
var wheelPower    = 0;
var wheelSpinning = false;
var playButton = false, final_balance_coin = 0;

init();

// Click handler for spin button.
document.querySelector('.btn-spin').addEventListener('click', function () {

    // Begin the spin animation by calling startAnimation on the wheel object.
    if (wheelSpinning == false){
        theWheel.startAnimation();        
        wheelSpinning = true;
    } 
});

/* Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.*/

function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    choosePrize = indicatedSegment.text;     
    if (playButton){
        balanceCoin = final_balance_coin - +select_coin;
    } else {
        balanceCoin = 500 - +select_coin;
    }
    for (var i = 0 ; i < select_radio.length; i++){
        prize_value = select_radio[i].prize_name;
        coin_value = select_radio[i].coin;
        var length = select_radio.length;
        if (choosePrize === prize_value){
            if (playButton){ 
                if (select_radio.length>1) {
                    finalCoins += length * +coin_value;
                    final_balance_coin = finalCoins + balanceCoin;
                } else {
                    finalCoins += +coin_value;
                    final_balance_coin = balanceCoin + finalCoins;
                }
                document.querySelector('.final-coins').textContent = 'You win: ' + finalCoins;            
                document.querySelector('.balance_coin').textContent = final_balance_coin;
                break;                
            } else { 
                if (select_radio.length>1) {
                    finalCoins += length * +coin_value;
                    final_balance_coin = finalCoins + balanceCoin;
                } else {
                    finalCoins += +coin_value;
                    final_balance_coin = balanceCoin + finalCoins;
                }
                document.querySelector('.final-coins').textContent = 'You win: ' + finalCoins;            
                document.querySelector('.balance_coin').textContent = final_balance_coin;
                break;
            }
        } else if (choosePrize !== prize_value){
            if (playButton){
                final_balance_coin = balanceCoin;
                document.querySelector('.final-coins').textContent = 'You lose: ' + -(+coin_value);            
                document.querySelector('.balance_coin').textContent = final_balance_coin;
            } else {
                final_balance_coin = balanceCoin;
                document.querySelector('.final-coins').textContent = 'You lose: ' + -(+coin_value);            
                document.querySelector('.balance_coin').textContent = final_balance_coin;
            }
        } else {
            document.querySelector('.final-coins').textContent = 500;
        }
    }
    //show alert
    if (balanceCoin == 0 && final_balance_coin == 0){
        document.querySelector('.alert').style.display = 'block'; 
        document.querySelector('.btn-bet').disabled = true; 
        document.querySelector('.btn-spin').disabled = true;        
    }
};

function betBtn() { 
    document.querySelector('.btn-spin').disabled = false;
    selchb.forEach( function( v ) {
        if (v.checked){
            select_prize = v.value;
            selbtn.forEach( function( n ) {
                if (n.checked){
                    select_coin = n.value;
                }
            });        
            select_radio.push({"prize_name": select_prize, "coin": select_coin});
            document.querySelector('#result').textContent += select_prize + ',';
            document.querySelector('#result1').textContent = ': '+select_coin;            
            // document.querySelector('.balance_coin').textContent = balanceCoin - +select_coin; 
        }
    });
    total_select_coin += +select_coin; 
    if (playButton){
        balanceCoin = final_balance_coin - +select_coin;
        document.querySelector('.balance_coin').textContent = balanceCoin;
    } else {
        balanceCoin = 500 - +select_coin;
        document.querySelector('.balance_coin').textContent = balanceCoin;
    }
    document.querySelector( ".btn-bet" ).disabled = true;
    cancelBtn();
}

function cancelBtn () { 
    selchb.forEach( function( v ) {
        selbtn.forEach( function( n ) {
            v.checked=false;
            n.checked=false;
        });
    });
}

/*game initialization*/
function init() {
    choosePrize = '';
    finalCoins = 0;
    select_coin = '';
    select_prize = '';
    prize_value = '';
    coin_value = '';
    total_select_coin = 0;
    select_radio = [];

    // creates array for checkbox
    selchb = Array.from( document.getElementsByName( "style" ) );
    selbtn = Array.from( document.getElementsByName( "check" ) );

    document.querySelector('.btn-spin').disabled = true; 
    document.querySelector('.btn-bet').disabled = false;
    document.querySelector('.final-coins').textContent = '';
    document.querySelector('#result').textContent = '';    
    document.querySelector('#result1').textContent = '';
}

function playBtn () {
    wheelSpinning = false;
    playButton = true;
    init ();
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); 
    selchb.forEach(function(v){
        if(!v.checked){
            v.disabled = false;
        }
    });
    document.querySelector( ".btn-bet" ).disabled = false;
}

/*click new game button*/
document.querySelector('.btn-new').addEventListener('click', function () {
    window.location.reload()
})

function disableCheckbox () {
    var len = 0;
    selchb.forEach(function (v){
        if (v.checked){                    
            len++;
        }
    })

    if(len>3){
        selchb.forEach(function(v){
            if(!v.checked){
                v.disabled = true
            }
        })
    }else{
        selchb.forEach(function(v){
            if(!v.checked){
                v.disabled = false
            }
        })
    }    
}

//click on icon
document.querySelector('.fa').addEventListener('click', function(){
    document.querySelector('.alert').style.display = 'none';    
})
document.querySelector('.balance_coin').textContent = balanceCoin;

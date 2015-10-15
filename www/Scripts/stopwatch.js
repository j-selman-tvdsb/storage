
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
		
		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};
 
		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};
 
		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};
 
		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};
 
var x = new clsStopwatch();
var $time;
var clocktimer;
var instructionTimer;
var blnRound1=false,blnRound2=false,blnRound3=false,blnRound4=false,
blnRound5=false,blnRound6=false,blnRound6=false,blnRound7=false,
blnRound8=false,blnRound9=false;
 
function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}
 
function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';
 
	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );

	switch (m)
		{
		case 3 :
			if (blnRound1==false)
			{
				blnRound1=true;
				//alert ("set speed at 2.5 mph and Grade at 12%");
				navigator.notification.alert("set speed at 2.5 mph and Grade at 12%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			
			break;

			case 6 :
			
			if (blnRound2==false)
			{
				blnRound2=true;
				//alert ("set speed at 3.4 mph and Grade at 14%");
				navigator.notification.alert("set speed at 3.4 mph and Grade at 14%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
				
			}
			break;

			case 9 :
			
			if (blnRound3==false)
			{
				blnRound3=true;
				//alert ("set speed at 4.2 mph and Grade at 16%");
				navigator.notification.alert("set speed at 4.2 mph and Grade at 16%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
			case 12 :
			
			if (blnRound4==false)
			{
				blnRound4=true;
				//alert ("set speed at 5 mph and Grade at 18%");
				navigator.notification.alert("set speed at 5 mph and Grade at 18%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
			case 15 :
			
			if (blnRound5==false)
			{
				blnRound5=true;
				//alert ("set speed at 5.5 mph and Grade at 20%");
				navigator.notification.alert("set speed at 5.5 mph and Grade at 20%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
			case 18 :
			
			if (blnRound6==false)
			{
				blnRound6=true;
				//alert ("set speed at 6.0 mph and Grade at 22%");
				navigator.notification.alert("set speed at 6.0 mph and Grade at 22%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
			case 21 :
			
			if (blnRound7==false)
			{
				blnRound7=true;
				//alert ("set speed at 6.5 mph and Grade at 24%");
				navigator.notification.alert("set speed at 6.5 mph and Grade at 24%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
			case 24 :
			
			if (blnRound8==false)
			{
				blnRound8=true;
				//alert ("set speed at 7.0 mph and Grade at 26%");
				navigator.notification.alert("set speed at 7.0 mph and Grade at 26%", alertConfirm,"Change Treadmill Settings", "OK");
				navigator.notification.beep(2);
			}
			break;
		}
	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) ;
	return newTime;
	
}
	
	
	

 
function show() {
	$time = document.getElementById('time');
	update();
}
 
function update() {
	$time.innerHTML = formatTime(x.time());
	
	
}
 

function start() {
	navigator.notification.alert("set speed at 1.7 mph and Grade at 10%", alertConfirm2,"Change Treadmill Settings", "Start Test");
	//alert("set speed at 1.7 mph and Grade at 10%");
	
}

function alertConfirm(){}
function alertConfirm2()
{
	clocktimer = setInterval("update()", 1000);
	x.start();
	$("#btnStartTimer").button('disable');
	$("#btnResetTimer").button('disable');
	$("#btnStopTimer").button('enable');
	$('#btnStopTimer').buttonMarkup({ theme: "b" ,icon: "star" });
}
 
function stop() {
	x.stop();
	$("#btnStartTimer").button('disable');
	$("#btnResetTimer").button('enable');
	$("#btnStopTimer").button('disable');
	$('#btnStopTimer').buttonMarkup({ theme: "c"  });
	$('#btnResetTimer').buttonMarkup({ theme: "b" ,icon: "star" });
	$('#btnStartTimer').buttonMarkup({ theme: "c"  });
	$('#btnStopTimer').button('refresh');
	//$('#btnResetTimer').button('refresh');
	$('#btnStartTimer').button('refresh');
	clearInterval(clocktimer);
	clearInterval(instructionTimer);
	calculateVo2Max();
}
 
function reset() {
	stop();
	blnRound1=blnRound2=blnRound3=blnRound4=blnRound5=blnRound6=blnRound7=blnRound8=blnRound9=false;
	x.reset();
	update();
	$("#btnStartTimer").button('enable');
	$("#btnResetTimer").button('disable');
	$("#btnStopTimer").button('disable');
	$('#btnStopTimer').buttonMarkup({ theme: "c"  });
	$('#btnResetTimer').buttonMarkup({ theme: "c" });
	$('#btnStartTimer').buttonMarkup({ theme: "b" ,icon: "star" });
	$('#btnStopTimer').button('refresh');
	$('#btnResetTimer').button('refresh');
	//$('#btnStartTimer').button('refresh');

}

function calculateVo2Max()
{
//VO2 max = 14.8 - (1.379 x T) + (0.451 x T²) - (0.012 x T³) men
// 4.38 x T - 3.9 women

var T= (x.time()/60000);


var vo2Max = 14.8 - (1.379 * T) + (0.451 * Math.pow(T,2)) - (0.012 * Math.pow(T,3))

 $("#VO2TreadmillSlider").val(parseInt(vo2Max)).slider("refresh");
 $("#VO2TreadmillSlider").slider("disable");


}
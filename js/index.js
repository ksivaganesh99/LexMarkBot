

$(document).ready(function() {
	var $messages = $('.messages-content');
    var d,h,m,msg = 0;
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
  	 // Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:9e80f8c4-816f-44da-8553-ed7a79ed5687',
});		
		
var lexruntime = new AWS.LexRuntime({apiVersion: '2016-11-28'});
var userid = guid();
//alert(lexruntime);
console.log();
var i = 0;
var params = {
  botAlias: 'TEST', /* required */
  botName: 'IDMPasswordReset', /* required */
  inputText: 'Reset the password', /* required */
  userId: userid, /* required */
  sessionAttributes: {
    Name: 'Siva',
    /* anotherKey: ... */
  }
};



function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 5,
    timeout: 0
  });
}

function setDate(){
  d = new Date();
 
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
 
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
   $('.message-input').val(null);  
  setDate();
	updateScrollbar();
    fakeMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});

var Fake = [
  'Welcome to your L1 Support Desk! How may I help you?'
];

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/help-desk.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
 
  updateScrollbar();
 
	if( i > 0 ){
	params.inputText = msg;
	  	lexruntime.postText(params, function (err, data) {
  if (err){
	   console.log(err, err.stack); 
		}
  else {  
	var message = data.message;
	console.log(data);
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/help-desk.png" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  
	} 
});
	  }else{
	  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/help-desk.png" /></figure>' + Fake[0] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 10 + (Math.random() * 20) * 100);
  }

}
});
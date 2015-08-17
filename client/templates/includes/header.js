Template.header.events({
	'click #logout': function (event, template) {
		event.preventDefault();
		Meteor.logout();
		Router.go('home');
		return false;
	},

	'click #logintrigger': function(event,template){
		// $('#logintrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
		event.preventDefault();

		//add a grey background to the body
		var overlay=$("<div id='overlay'></div>");
    $('body').append(overlay);

    //close the login form when click the background
    $('#overlay').click(function(){
    	$('#overlay').fadeOut(200);
    	$('#loginform').css({'display':'none'});
    });

    //also close the login form when click to the login button
    // $('#hideloginform').click(function(){
    // 	$('#overlay').fadeOut(200);
    // 	$('#loginform').css({'display':'none'});
    // });

    var login_form_height=$('#loginform').outerHeight();
		var login_form_width=$('#loginform').outerWidth();

		//set the background's css and fade it in
		$("#overlay").css({
		  "display":"block",
		  "opacity":0
		});
		$("#overlay").fadeTo(500, 0.45);

		//set the login form's css and fade it in
		$('#loginform').css({
		  "display":"block",
		  "position":"fixed",
		  "opacity":0,
		  "z-index":11000,
		  "left":50+"%",
		  "margin-left":-(login_form_width/2)+"px",
		  "top": 110+"px"
		});
		$('#loginform').fadeTo(500,1);
		
	}
});
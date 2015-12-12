
$(document).ready(function() {
	$('.box_signUp').click(function() {
		$('.sign').css({'visibility' : "visible", 'opacity' : "1", "transform" : "scale(1) translate(-50%,-50%)" });
		$('.login').css({'visibility' : "hidden", "transform" : "scale(0) translate(-50%,-50%)" });
		$(".fade").css({'visibility' : "visible", 'opacity' : "0.7"});
	});
	$('.box_login').click(function() {
		$('.login').css({'visibility' : "visible", 'opacity' : "1", "transform" : "scale(1) translate(-50%,-50%)" });
		$('.sign').css({'visibility' : "hidden" , "transform" : "scale(0) translate(-50%,-50%)" });
		$(".fade").css({'visibility' : "visible", 'opacity' : "0.7"});
	});
	$('.icon-close').click(function() {
		$('.sign').css({'visibility' : "hidden" , "transform" : "scale(0) translate(-50%,-50%)" });
		$('.login').css({'visibility' : "hidden", "transform" : "scale(0) translate(-50%,-50%)" });
		$(".fade").css({'visibility' : "hidden", 'opacity' : "0"});
	});

	/* SOUS LISTE*/
	$('.photo').on("mouseenter", function() {
		$('#menu').css('display' , 'block');
	});
	$('#menu').on("mouseleave", function() {
		$('#menu').css('display' , 'none');
	});

	/*WYSIWYG text editor */
});
jQuery.noConflict();
jQuery(document).ready(function($) {
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
    tinymce.init({ 
    	selector:'#myTextarea',
    	theme: 'modern',
    	width: 850,
    	height: 300,
    	content_css: 'skins/lightgray/content.min.css',
    	menubar: false,
    	plugins: [
	      'autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
	      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
	      'save table contextmenu directionality emoticons template paste textcolor'
	    ],
    	toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | link image |  preview media fullpage | forecolor backcolor emoticons'
    });
});
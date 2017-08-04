$(function(){

	$(document).on('click', '.subscribe .btn', function(){

		$(this).closest('.subscribe-form').removeClass('subscribe').addClass('submit');
		$(this).siblings('input').focus();

	});

	$(document).on('click', '.submit .btn', function(){

		// Submit to Mailchimp

		$(this).find('span').text('Subscribed!').closest('.subscribe-form').removeClass('submit').addClass('success');
	});

});
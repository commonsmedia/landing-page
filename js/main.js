$(function(){

	$(document).on('submit', 'form', function(e){

		e.preventDefault();

		if($(this).parent().hasClass('subscribe')){

			$(this).closest('.subscribe-form').removeClass('subscribe').addClass('submit');
			$(this).find('input').focus();

		}else if($(this).parent().hasClass('submit')){

			ajaxMailChimpForm($("form"), $(".result"));

			// Turn the given MailChimp form into an ajax version of it.
			// If resultElement is given, the subscribe result is set as html to
			// that element.
			function ajaxMailChimpForm($form, $resultElement){
				// Hijack the submission. We'll submit the form manually.

				if (!isValidEmail($form)) {
					var error =  "Please enter a valid email";
					$resultElement.addClass('error');
					$resultElement.html(error);
				} else {
					$resultElement.html('');
					$resultElement.removeClass('error');
					submitSubscribeForm($form, $resultElement);
				}
			}

			// Validate the email address in the form
			function isValidEmail($form) {
				// If email is empty, show error message.
				// contains just one @
				var email = $form.find("input[type='email']").val();
				if (!email || !email.length) {
					return false;
				} else if (email.indexOf("@") == -1) {
					return false;
				}
				return true;
			}

			// Submit the form with an ajax/jsonp request.
			// Based on http://stackoverflow.com/a/15120409/215821
			function submitSubscribeForm($form, $resultElement) {

				$('.subscribe-form').removeClass('submit').addClass('submitting');

				$.ajax({
					type: "GET",
					url: "https://futurism.us8.list-manage.com/subscribe/post-json?u=aa1f459b1dc368b292f0587f2&amp;id=8e44b73d9e",
					data: $form.serialize(),
					cache: false,
					dataType: "jsonp",
					jsonp: "c", // trigger MailChimp to return a JSONP response
					contentType: "application/json; charset=utf-8",
					error: function(error){
						// According to jquery docs, this is never called for cross-domain JSONP requests
					},
					success: function(data){

						if (data.result != "success") {
							var message = data.msg || "Something went wrong! Please refresh the page and try again.";
							$resultElement.addClass('error');
							if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
								message = "You're already subscribed! :)";
								$resultElement.removeClass('error');
							}
							$resultElement.html(message);
							$('.subscribe-form').removeClass('submitting').addClass('submit');
						} else {
							$resultElement.removeClass('error');
							$resultElement.html('Please confirm your email address!');
							$form.find('span').text('Subscribed!').closest('.subscribe-form').removeClass('submitting').addClass('success');
						}
					}
				});
			}

		}

	});

});
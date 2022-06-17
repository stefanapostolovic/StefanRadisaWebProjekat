$(document).ready(function() {
	$('#forma').submit(function(event) {
		event.preventDefault();
		let username = $('input[name="username"]').val();
		let password = $('input[name="password"]').val();
		$('#error').hide();
		// url: bazna putanja do rest servisa / putanja do servisa / putanja do metode u tom servisu 
		$.post({
			url: 'rest/login',
			data: JSON.stringify({username: username, password: password}),
			contentType: 'application/json',
			success: function(product) {
				$('#success').text('Korisnik je uspesno prijavljen.');
				$("#success").show().delay(3000).fadeOut();
			},
			error: function(message) {
				$('#error').text(message.responseText);
				$("#error").show().delay(3000).fadeOut();
			}
		});
	});
});

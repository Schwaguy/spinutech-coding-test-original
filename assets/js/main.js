// Main
jQuery.noConflict();

(function($) { 
	"use strict";
	
	function checkActive() {
		var $sqRow = $('#squares');
		if ($sqRow.find('.active').length) {
			$sqRow.addClass('active');
		} else {
			$sqRow.removeClass('active');
		}
	}
	
	// Circle Click Function
	$('#circles').on('click', '.shape', function(e) {
		e.preventDefault();
		
		// Get Circle Color and Target Square 
		var $this, shapeColor, squareTarget;
		$this = $(this);
		shapeColor = $this.parents('.contain').data('color');
		squareTarget = $('#squares').children('.contain.'+ shapeColor); 
		
		// Add active class to Target Square
		$(squareTarget).addClass('active');
		
		checkActive();

	});
	
	// Square Click Function
	$('#squares').on('click', '.shape', function(e) {
		e.preventDefault();
		
		// Get Square element and Color
		var $this, element, elemColor;
		$this = $(this);
		element = $this.parents('.contain');
		elemColor = $(element).data('color');
		
		// Remove Circle class form any Square elements, then add Circle class/remove Square class from target element  
		$('#squares').children('.contain .shape').not($this).removeClass('circle');
		$(this).addClass('circle').removeClass('square');
		
		// With for the square to circle animation to finish, then move the target element to the #circles div 
		setTimeout(function() { 			
			$(element).prependTo('#circles').removeClass('active');
			$('#circles').find('.contain[data-color="'+ elemColor +'"]').not(element).remove(); // Remove the old Circle element from ther #circles div 
			
			// Clone the target element to the beginning of the #squares div and turn it back into an inactive square
			$(element).clone().prependTo('#squares');
			$('#squares').children('.contain.'+ elemColor).removeClass('active').children('.shape').removeClass('circle').addClass('square');
			checkActive();
		}, 600);

	});
})(jQuery);
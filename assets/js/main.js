/* Multiverse by HTML5 UP */

(function() {
/*(function($) {*/
	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {
			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});
			// Prevent transitions/animations on resize.
				var resizeTimeout;
				$window.on('resize', function() {
					window.clearTimeout(resizeTimeout);
					$body.addClass('is-resizing');
					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);
				});
		}

	// Panels.
		var $panels = $('.panel');
		$panels.each(function() {
			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);
			// Closer.
				$closer
					.on('click', function(event) {
						$this.trigger('---hide');
					});
			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');
					})
					.on('---show', function() {
						// Hide other content.
							if ($body.hasClass('content-active'))
								$panels.trigger('---hide');
						// Activate content, toggles.
							$this.addClass('active');
							$toggles.addClass('active');
						// Activate body.
							$body.addClass('content-active');
					})
					.on('---hide', function() {
						// Deactivate content, toggles.
							$this.removeClass('active');
							$toggles.removeClass('active');
						// Deactivate body.
							$body.removeClass('content-active');
					});
			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						$this.trigger('---toggle');
					});
		});
		// Global events.
			$body
				.on('click', function(event) {
					if ($body.hasClass('content-active')) {
						event.preventDefault();
						event.stopPropagation();
						$panels.trigger('---hide');
					}
				});
			$window
				.on('keyup', function(event) {
					if (event.keyCode == 27
					&&	$body.hasClass('content-active')) {
						event.preventDefault();
						event.stopPropagation();
						$panels.trigger('---hide');
					}
				});

	// Main.
		var $main = $('#main');
		// Thumbs.
			$main.children('.thumb').each(function() {
				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;
				// No image? Bail.
					if ($image.length == 0)
						return;
				// Image.
				// This sets the background of the "image" <span> to the image pointed to by its child
				// <img> (which is then hidden). Gives us way more flexibility.
					// Set background.
						$image.css('background-image', 'url(' + $image_img.attr('src') + ')');
					// Set background position.
						if (x = $image_img.data('position'))
							$image.css('background-position', x);
					// Hide original img.
						$image_img.hide();
			});
		// Poptrox.
			$main.poptrox({
				baseZIndex: 20000,
				caption: function($a) {
					var s = '';
					$a.nextAll().each(function() {
						s += this.outerHTML;
					});
					return s;
				},
				fadeSpeed: 300,
				onPopupClose: function() { $body.removeClass('modal-active'); },
				onPopupOpen: function() { $body.addClass('modal-active'); },
				overlayOpacity: 0,
				popupCloserText: '',
				popupHeight: 150,
				popupLoaderText: '',
				popupSpeed: 300,
				popupWidth: 150,
				selector: '.thumb > a.image',
				usePopupCaption: true,
				usePopupCloser: true,
				usePopupDefaultStyling: false,
				usePopupForceClose: true,
				usePopupLoader: true,
				usePopupNav: true,
				windowMargin: 50
			});
			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main[0]._poptrox.windowMargin = 0;
				});
				breakpoints.on('>xsmall', function() {
					$main[0]._poptrox.windowMargin = 50;
				});
})();
/*})(jQuery); */
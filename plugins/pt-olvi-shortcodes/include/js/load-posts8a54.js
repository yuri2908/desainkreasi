jQuery(document).ready(function($) {
	"use strict";
	
	jQuery('.load-button a').each(function() {
		var pageNum = parseInt(jQuery(this).attr('data-start-page')) + 1,
			max = parseInt(jQuery(this).attr('data-max')),
			nextLink = jQuery(this).attr('data-next-link'),
			load_wrap = jQuery(jQuery(this).attr('data-wrap'));

		jQuery(this).on('click', function() {
			jQuery(this).parent().after('<div class="load-items-area load-items-'+ pageNum +'"></div>');

			var button = jQuery(this);
			button.addClass('loading');

			var $items = load_wrap.next('.load-items-'+ parseInt(pageNum)).find('article');

			jQuery('.load-items-'+ pageNum).load(nextLink + ' ' + jQuery(this).attr('data-wrap') + ' article',
				function() {
					var $html = jQuery(this).find('article');
					var load_s = jQuery(this),
						type = '';

					if(load_wrap.hasClass('portfolio-type-justified')) {
						type = 'justified';
					} else if(load_wrap.hasClass('portfolio-type-masonry_type2')) {
						type = 'masonry_t2';
					} else {
						type = 'other';
					}

					load_s.imagesLoaded( function() {
						load_wrap.append( $html );
						load_s.remove();
						if(type == 'justified') {
							load_wrap.justifiedGallery('norewind').on('jg.rowflush', function (e) {
								jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").waypoint(function() {
						            jQuery(this).addClass("wpb_start_animation animated");
						        });
							});
						} else if(type == 'masonry_t2') {
							load_wrap.isotope( 'appended', $html );
							load_wrap.find('.portfolio-item-masonry-t2').each(function() {
								translate_p_item(jQuery(this));
							});
						} else {
							load_wrap.isotope( 'appended', $html );
						}
						button.removeClass('loading');
						jQuery(window).trigger('resize').trigger('scroll');
					});

					pageNum++;
					nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);
				}
			);

			if(pageNum >= max) {
				jQuery(this).parent().fadeOut();
			}

			setTimeout(function() {jQuery(window).trigger('resize').trigger('scroll');}, 500);
			
			return false;
		});
	});
});
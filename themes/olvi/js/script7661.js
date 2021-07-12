/*------------------------------------------------------------------
[Master Scripts]

Project:    Olvi Theme
Version:    1.0.0

[Table of contents]

[Components]

	-Preloader
	-Stick sidebar
	-Dropdown img
	-Equal Height function
	-Navigation open
	-Search
	-Mobile menu
	-Fixed header
	-Screen rezise events
	-Fix centered container
	-Blog items & filtering
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Comment reply
	-Popup image
	-Parallax
	-Tabs
	-Quantity
	
-------------------------------------------------------------------*/

"use strict";

if (jQuery('html').attr('dir') == 'rtl') {
  var $rtl = true;
} else {
  var $rtl = false;
}

/*------------------------------------------------------------------
[ Preloader ]
*/
jQuery(window).on('load', function () {
  jQuery('body').addClass('loaded');

  jQuery(window).trigger('resize').trigger('scroll');
  jQuery('.owl-carousel').trigger('refresh.owl.carousel');

  setTimeout(function () {
    //jQuery('.preloader-default-area, .preloader-area').remove();
  }, 2500);

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
    jQuery('.owl-carousel').trigger('refresh.owl.carousel');
  }, 1000)
});

function leadZero(n) {
  return (n < 10 ? '0' : '') + n;
}

jQuery('.side-navigation .sub-menu').each(function () {
  jQuery(this).prepend('<li class="back decor-icons-arrow-left"></li>');
});

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function translate_p_item(el) {
  var $el = el,
    coef = randomInteger(2, 4) / 10;

  if ($el.hasClass('translated')) return false;

  $el.addClass('translated');

  jQuery(window).on('load scroll', function () {
    var w_c = jQuery(window).scrollTop() + jQuery(window).height() / 2,
      t_t = $el.offset().top,
      top = -(w_c - t_t) * coef;

    if (top <= 0) top = 0;

    $el.find('.wrap').css({
      "-webkit-transform": "translate(0px," + top + "px)",
      "transform": "translate(0px," + top + "px)"
    });
  });
}

/*------------------------------------------------------------------
[ Equal Height function ]
*/
function equalHeight(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisHeight = jQuery(this).css('height', '').outerHeight();
      if (thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    jQuery(group).css('height', tallest);
  } else {
    jQuery(group).css('height', '');
  }
}

function equalHeight_m(group) {
  var tallest = 0;
  jQuery(group).each(function () {
    var thisHeight = jQuery(this).css('height', '').outerHeight();
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  jQuery(group).css('height', tallest);
}

function equalWidth(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisWidth = jQuery(this).css('width', '').outerWidth();
      if (thisWidth > tallest) {
        tallest = thisWidth;
      }
    });
    jQuery(group).css('width', tallest);
  } else {
    jQuery(group).css('width', '');
  }
}

jQuery('.comment-items .comment-item .image img').each(function () {
  var src = jQuery(this).attr('src');
  jQuery(this).parent().css('background-image', 'url(' + src + ')');
});

jQuery('.mega-menu').each(function () {
  var $this = jQuery(this),
    cols_count = $this.find('.sub-menu.mega-menu-row').length;

  $this.addClass('cols-' + cols_count);
});

jQuery(document).ready(function () {

  jQuery('.wpcf7-form-control-wrap .wpcf7-form-control').on('input', function () {
    var len = (jQuery(this).val()).length;
    if (len) {
      jQuery(this).parent().next('label').hide();
    } else {
      jQuery(this).parent().next('label').show();
    }
  })

  /*------------------------------------------------------------------
  [ Right click disable ]
  */

  jQuery('.right-click-disable').on('contextmenu', function () {
    jQuery('.right-click-disable-message').addClass('active');
    return false;
  });

  jQuery('.right-click-disable-message:not(.lic)').on('click', function () {
    jQuery(this).removeClass('active');
    return false;
  });


  jQuery('input.style1, textarea.style1').on('focusin', function () {
    var $this = jQuery(this);
    $this.parents('.input-row-s1').addClass('focus');
  }).on('focusout', function () {
    var $this = jQuery(this);
    if (!$this.val()) {
      $this.parents('.input-row-s1').removeClass('focus');
    }
  });

  if (jQuery('.navigation > ul > li').length > 6) {
    jQuery('.navigation').addClass('min');
  }

  jQuery('#wpadminbar').addClass('wpadminbar');

  /*------------------------------------------------------------------
  [ Project slider ]
  */
  jQuery('.project-slider').each(function () {
    var head_slider = jQuery(this);

    if (jQuery(this).find('.item').length > 1) {
      head_slider.addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoHeight: true,
        navClass: ['owl-prev base-icons-back', 'owl-next base-icons-next-1'],
        navText: false,
      });
    }
  });

  /*------------------------------------------------------------------
  [ Search ]
  */

  jQuery('.site-header .search-button').on("click", function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.search-popup').fadeOut();
    } else {
      jQuery(this).addClass('active');
      jQuery('.search-popup').fadeIn();
    }
  });

  jQuery('.search-popup .close').on("click", function () {
    jQuery('.site-header .search-button').removeClass('active');
    jQuery('.search-popup').fadeOut();
  });

  /*------------------------------------------------------------------
  [ Navigation ]
  */

  jQuery('.butter-button.hidden_menu, .butter-button.visible_menu, .butter-button.centered_menu').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.navigation').removeClass('active');
      jQuery('body').removeClass('navigation-opened');
    } else {
      jQuery(this).addClass('active');
      jQuery('.navigation').addClass('active');
      jQuery('body').addClass('navigation-opened');
      setTimeout(function () {
        jQuery(window).trigger('resize').trigger('scroll');
      }, 500);
    }
  });

  jQuery('.butter-button.minified-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active').find('.butter-button').removeClass('active');
      jQuery('.minified-block, .navigation, .butter-button.hidden_menu').removeClass('active');
      jQuery('body').removeClass('navigation-opened');
    } else {
      jQuery(this).addClass('active').find('.butter-button').addClass('active');
      jQuery('.minified-block, .navigation, .butter-button.hidden_menu').addClass('active');
      jQuery('body').addClass('navigation-opened');
    }
  });

  jQuery('.butter-button.full_screen').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.full-screen-nav').fadeOut();
    } else {
      jQuery(this).addClass('active');
      jQuery('.full-screen-nav').fadeIn();
    }
  });

  jQuery('.full-screen-nav .close').on("click", function () {
    jQuery('.butter-button.full_screen').removeClass('active');
    jQuery('.full-screen-nav').fadeOut();
  });

  jQuery('.butter-button.on_side').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.right-side-nav').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.right-side-nav').addClass('active');
    }
  });

  jQuery('.right-side-nav .close').on("click", function () {
    jQuery('.butter-button.on_side').removeClass('active');
    jQuery('.right-side-nav').removeClass('active');
  });

  jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function () {
    if (!jQuery(this).hasClass('active')) {
      jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
      return false;
    }
  });

  jQuery('.side-navigation ul li.menu-item-has-children > a,.side-navigation ul li.page_item_has_children > a').on('click', function () {
    jQuery(this).parents('li').addClass('active-child');
    return false;
  });

  jQuery('.side-navigation .sub-menu .back,.side-navigation .children .back').on('click', function () {
    jQuery(this).parent().parent().removeClass('active-child');
    return false;
  });

  jQuery('.right-side-navigation ul li.menu-item-has-children > a').on('click', function () {
    if (jQuery(this).parent().hasClass('active')) {
      jQuery(this).parent().removeClass('active').find('.sub-menu').slideUp().find('.active').removeClass('active');
    } else {
      jQuery(this).parent().addClass('active').children('.sub-menu').slideDown();
    }

    return false;
  });

  jQuery('.full-screen-nav .close').on("click", function () {
    jQuery('.butter-button.full_screen').removeClass('active');
    jQuery('.full-screen-nav').fadeOut();
  });

  jQuery('.side-nav-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.side-navigation-block').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.side-navigation-block').addClass('active');
    }
  });

  jQuery('.side-navigation-block .close').on("click", function () {
    jQuery('.side-nav-button').removeClass('active');
    jQuery('.side-navigation-block').removeClass('active');
  });

  /*------------------------------------------------------------------
  [ Side bar ]
  */

  jQuery('.sidebar-button').on('click', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).removeClass('active');
      jQuery('.side-bar-area').removeClass('active');
    } else {
      jQuery(this).addClass('active');
      jQuery('.side-bar-area').addClass('active');
    }
  });

  jQuery('.side-bar-area .close').on("click", function () {
    jQuery('.side-bar-area, .sidebar-button').removeClass('active');
  });

  jQuery('.team-nav .wrap').each(function () {
    jQuery(this).scrollbar({
      autoScrollSize: false
    });
  });

  /*------------------------------------------------------------------
  [ Fixed header ]
  */

  jQuery(window).on("load resize scroll", function () {
    if (jQuery(document).scrollTop() > 0) {
      jQuery('.site-header').addClass('fixed');
    } else {
      jQuery('.site-header').removeClass('fixed');
    }

    jQuery('body.home.base-theme').each(function () {
      if (jQuery(document).scrollTop() > jQuery(window).height() * 0.7) {
        jQuery('.site-header').addClass('show');
      } else {
        jQuery('.site-header').removeClass('show');
      }
    });

    jQuery('body.header-type-left-side-t2').each(function () {
      if (jQuery('.site-footer').length > 0) {
        var s_top = jQuery(document).scrollTop() + jQuery(window).height(),
          f_top = jQuery('.site-footer').offset().top,
          value = '';

        if (s_top >= f_top) {
          value = f_top - s_top;
          value = 'translateY(' + value + 'px)';
        } else {
          value = 'translateY(0px)';
        }
        jQuery('.side-header.style2').css({
          transform: value
        });
      }
    });
  });

  /*------------------------------------------------------------------
  [ Screen rezise events ]
  */

  var nav_el = '';
  if (jQuery('.navigation').hasClass('visible_menu')) {
    nav_el = 'yes';
  }
  jQuery(window).on("load resize", function () {
    if (jQuery('body').hasClass('header-type-left-side-t2')) {
      var width = jQuery(window).width() / 2 - jQuery('.container').width() / 4;
      if (jQuery('#header-type-left-side-t2-css').length > 0) {
        jQuery('#header-type-left-side-t2-css').html('.header-type-left-side-t2 #all:before, .header-type-left-side-t2 .banner .item:before, .header-type-left-side-t2 .vc_row[data-vc-full-width]:before { width: ' + width + 'px }');
      } else {
        jQuery('body').append('<style type="text/css" id="header-type-left-side-t2-css">.header-type-left-side-t2 #all:before, .header-type-left-side-t2 .banner .item:before, .header-type-left-side-t2 .vc_row[data-vc-full-width]:before { width: ' + width + 'px }</style>');
      }
    }

    jQuery('.banner-area').each(function () {
      if ((jQuery(this).offset().top - jQuery('#wpadminbar').outerHeight()) == 0) {
        // jQuery(this).addClass('on-top').find('.item > div > .cell').css('padding-top', parseInt(30+jQuery('.site-header').outerHeight()))
      }
    });

    /*------------------------------------------------------------------
    [ Mobile menu ]
    */
    if (jQuery(window).width() <= '992') {
      jQuery('.navigation .menu-item-has-children > a').on("click", function () {
        if (!jQuery(this).hasClass('active')) {
          jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
          jQuery(this).addClass('active').parent().children('.mega-menu').slideDown().siblings().children('.mega-menu').slideUp();
          return false;
        }
      });
    }

    if (jQuery(window).width() < '768') {
      jQuery('body').addClass('is-mobile-body');
    } else {
      jQuery('body').removeClass('is-mobile-body');
    }

    jQuery('.header-space').css('height', jQuery('.site-header').outerHeight() + jQuery('.header + .navigation').outerHeight());

    jQuery('main.main-row').css('min-height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());

    jQuery('.block-404 .cell').css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());

    jQuery('.about-me-section').each(function () {
      var height = jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight();

      jQuery(this).css('height', height).find('.cell-container').css('height', height);
      jQuery(this).find('.scroll-b').css('max-height', height - 160);
    });

    jQuery('[class*="dec-line-"]').each(function (index) {
      jQuery(this).css('width', '').css('height', '');

      var width = parseInt(Math.round(jQuery(this).outerWidth()).toFixed(0)),
        height = parseInt(Math.round(jQuery(this).outerHeight()).toFixed(0));

      if (width & 1) {
        jQuery(this).css('width', parseInt(width + 1));
      } else {
        jQuery(this).css('width', width);
      }

      if (height & 1) {
        jQuery(this).css('height', parseInt(height + 1));
      } else {
        jQuery(this).css('height', height);
      }
    });

    jQuery('.protected-post-form .cell').css('height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.footer-social-button').outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - parseInt(jQuery('#all').css('padding-top')) - parseInt(jQuery('#all').css('padding-bottom')))

    jQuery('.banner:not(.fixed-height)').each(function () {
      var coef = 0;
      jQuery(this).parent().css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - coef);
      jQuery(this).find('.item, .cell').css('height', jQuery(this).parent().height());
    });
    jQuery('.banner.fixed-height').each(function () {
      jQuery(this).find('.item, .cell').css('height', jQuery(this).height());
    });

    jQuery('.categories-carousel:not(.fixed-height)').each(function () {
      var height = jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight();
      if (jQuery(this).parents('.with-header-space').length > 0) {
        height = height - parseInt(jQuery(this).parents('.with-header-space').find('.cell-container').css('padding-top'));
      }
      jQuery(this).find('.item').css('height', height);
    });

    jQuery('.side-image-box').each(function () {
      var height = jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight();
      if (jQuery(this).parents('.with-header-space').length > 0) {
        height = height - parseInt(jQuery(this).parents('.with-header-space').find('.cell-container').css('padding-top'));
      }
      jQuery(this).find('.si-wrap > .cell').css('height', height);
    });

    jQuery('.full-screen-nav .cell').css('height', jQuery(window).height() - 20 - jQuery('#wpadminbar').height() - jQuery('.ypromo-site-bar').outerHeight());

    if (nav_el == "yes") {
      if (jQuery(window).width() >= 992) {
        jQuery('.navigation').addClass('visible_menu');
        jQuery('.butter-button').addClass('hidden');
      } else {
        jQuery('.navigation').removeClass('visible_menu');
        jQuery('.butter-button').removeClass('hidden');
        if (!jQuery('.navigation').hasClass('active')) {
          jQuery('.butter-button').removeClass('active');
        }
      }
    }

    jQuery('div[data-vc-full-width-mod="true"]').each(function () {
      var coef = (jQuery('.container').outerWidth(true) - jQuery('#all').width()) / 2;
      jQuery(this).css('left', coef).css('width', jQuery('#all').width());
    });

    jQuery('.products.filter-items').each(function () {
      equalHeight(jQuery(this).find('.product'));
    });

    jQuery('.blog-type-grid').each(function () {
      equalHeight(jQuery(this).find('.text'));
    });

    jQuery('.woocommerce .products').each(function () {
      equalHeight(jQuery(this).find('div.product'));
    });

    jQuery('.icon-box-carousel').each(function () {
      equalHeight_m(jQuery(this).find('.item'));
    });

    jQuery('.side-header .wrap').each(function () {
      var height = jQuery(this).height();
      jQuery(this).find('.cell').css('height', height);
    });

    jQuery('.banner .symbol').each(function () {
      var fs = jQuery(this).parents('.banner').height() * 1.55;
      jQuery(this).css('font-size', fs + 'px');
    });

    jQuery('.project-horizontal .cell').css('height', jQuery('.project-horizontal').outerHeight());

    jQuery('.projects-slider').css('height', jQuery(window).outerHeight() - jQuery('.site-footer').outerHeight() - jQuery('.site-header').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());

    jQuery('.side-navigation-block .cell').css('height', jQuery('.side-navigation-block .wrap').height());

    /*------------------------------------------------------------------
    [ Fix centered container ]
    */
    jQuery('.centered-container').each(function () {
      var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
        height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

      jQuery(this).css('width', '').css('height', '');

      if (width & 1) {
        jQuery(this).css('width', (width + 1) + 'px');
      }

      if (height & 1) {
        jQuery(this).css('height', (height + 1) + 'px');
      }
    });

    /*------------------------------------------------------------------
    [ Scroll Bar ]
    */

    jQuery('.scroll-inner').each(function () {
      jQuery(this).scrollbar();
    });

    /*------------------------------------------------------------------
    [ Parallax ]
    */
    jQuery('.background-parallax').each(function () {
      var wScroll = jQuery(window).scrollTop() - jQuery(this).parent().offset().top + jQuery('#wpadminbar').height() + jQuery('.header-space').height() - jQuery('.ypromo-site-bar').outerHeight();
      jQuery(this).css('transform', 'translate(0px,' + wScroll + 'px)');
      jQuery(this).parents('.owl-carousel').find('.owl-nav div').css('margin-top', wScroll);
    });

    jQuery('.about-page-image').css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());

    jQuery('.filter-button-on-side').each(function () {
      var height = jQuery(this).height();
      jQuery(this).parent().css('min-height', height);
    });

    jQuery('.one-screen-area').each(function () {
      var $this = jQuery(this);

      $this.css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight());
      $this.find('.item').css('height', $this.height());
      $this.find('.one-screen-contact .container > .cell').css('height', $this.height());
      $this.find('.one-screen-about-me > .container > .cell').css('height', $this.height());

      var p_val = (($this.height() - $this.find('.portfolio-slider-items').height()) / 2);

      $this.find('.portfolio-slider-items').css('margin-top', p_val);
    });

    jQuery('.video-button-enlarged').each(function () {
      var b_height = jQuery(this).parents('.item').height();

      jQuery(this).css('width', b_height - 120);
    });
  });

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
  }, 500);

  /*------------------------------------------------------------------
  [ Scroll top button ]
  */

  jQuery('#scroll-top').on("click", function () {
    jQuery('body, html').animate({
      scrollTop: '0'
    }, 1100);
    return false;
  });

  /*------------------------------------------------------------------
  [ Comment reply ]
  */

  jQuery('.replytocom').on('click', function () {
    var id_parent = jQuery(this).attr('data-id');
    jQuery('#comment_parent').val(id_parent);
    jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
    jQuery('#cancel-comment-reply-link').show();
    return false;
  });

  jQuery('#cancel-comment-reply-link').on('click', function () {
    jQuery('#comment_parent').val('0');
    jQuery('#respond').appendTo(jQuery('#commentform-area'));
    jQuery('#cancel-comment-reply-link').hide();
    return false;
  });

  /*------------------------------------------------------------------
  [ Quantity ]
  */

  jQuery('.quantity .down').on("click", function () {
    var val = jQuery(this).parent().find('.input-text').val();
    if (val > 1) {
      val = parseInt(val) - 1;
      jQuery(this).parent().find('.input-text').val(val);
    }
    return false;
  });

  jQuery('.quantity .up').on("click", function () {
    var val = jQuery(this).parent().find('.input-text').val();
    val = parseInt(val) + 1;
    jQuery(this).parent().find('.input-text').val(val);
    return false;
  });

});
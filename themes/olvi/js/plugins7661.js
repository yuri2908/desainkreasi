(function (jQuery) {
  "use strict";

  jQuery.fn.pt_full_screen = function () {
    return this.each(function () {
      var $this = jQuery(this),
        $items = $this.find('.fc-item'),
        $arrows = $this.find('.banner-navigation'),
        status = false;

      jQuery('body').addClass('full-page-mode');
      $items.each(function (index) {
        jQuery(this).css('z-index', parseInt($items.length - jQuery(this).index()));
      });

      scroll(false, 0);

      jQuery(window).on('load resize', function () {
        $this.css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());
        $this.find('.banner').css({
          'height': $this.height(),
          'width': $this.width(),
        });
        $items.find('.container-fluid').css('width', $this.width());

        if (jQuery(window) <= 992) {
          $items.addClass('active');
        }
      });

      function scroll(coef, index) {
        index = index === undefined ? false : index;
        if (coef != false) {
          var index = $this.find('.fc-item.active').index() - coef;
        }

        if (index == 0) {
          $arrows.find('.prev').addClass('disabled');
        } else {
          $arrows.find('.prev').removeClass('disabled');
        }

        if (index == $items.length - 1) {
          $arrows.find('.next').addClass('disabled');
        } else {
          $arrows.find('.next').removeClass('disabled');
        }

        $items.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
        $items.eq(index).prevAll().removeClass('next').addClass('prev');
        $items.eq(index).nextAll().removeClass('prev').addClass('next');

        $this.find('.banner-counter').text(index + 1 + '/' + $items.length);
      }

      $this.on('mousewheel wheel', function (e) {
        if (jQuery(window).width() > 992) {
          e.preventDefault();
          var cur = $this.find('.fc-item.active').index(),
            delay = 1000;
          if (status != true) {
            status = true;
            if (e.originalEvent.deltaY > 0 && cur != parseInt($items.length - 1)) {
              scroll('-1');
              setTimeout(function () {
                status = false
              }, delay);
            } else if (e.originalEvent.deltaY < 0 && cur != 0) {
              scroll('1');
              setTimeout(function () {
                status = false
              }, delay);
            } else {
              status = false;
            }
          }
        }
      });

      $arrows.on('click', '.prev:not(.disabled)', function () {
        scroll('1');
      });

      $arrows.on('click', '.next:not(.disabled)', function () {
        scroll('-1');
      });
    });
  };

  jQuery.fn.pt_full_screen_categories = function () {
    return this.each(function () {
      var $wrap = jQuery(this);

      jQuery(window).on('load resize', function () {
        $wrap.find('.cell').css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());
      });

      $wrap.find('.items .item').each(function (index) {
        var bg = jQuery(this).data('image');
        $wrap.find('.bg').append('<div class="bg-item" style="background-image: url(' + bg + ');"></div>');

        if (index == 0) {
          $wrap.find('.bg-item:eq(0)').addClass('active');
          $wrap.removeClass('white black').addClass($wrap.find('.items .item:eq(0)').data('color'));
        }
      });

      $wrap.on('mouseenter', '.items .item:not(.active)', function () {
        var eq = jQuery(this).index(),
          prev = $wrap.find('.items .item.active').index(),
          color = jQuery(this).data('color');

        jQuery(this).addClass('active').siblings().removeClass('active');
        $wrap.find('.bg-item').eq(eq).addClass('active').siblings().removeClass('active');

        $wrap.find('.items .item').eq(prev).addClass('prev').siblings().removeClass('prev');
        $wrap.find('.bg-item').eq(prev).addClass('prev').siblings().removeClass('prev');

        $wrap.removeClass('white black').addClass(color);
      });
    });
  };

  jQuery.fn.pt_full_page = function () {
    return this.each(function () {
      var $this = jQuery(this),
        $nav = $this.find('.fc-navigation'),
        $top_title = $this.find('.fc-top-nav .h'),
        $arrows = $this.find('.fc-top-nav .arrows'),
        $items = $this.find('.fc-item'),
        status = false;

      jQuery('body').addClass('body-overflow-hidden');
      $items.each(function (index) {
        jQuery(this).css('z-index', parseInt($items.length - jQuery(this).index()));
        $nav.find('ul').append('<li class="n-item"><span class="num">' + leadZero(index + 1) + '</span></li>');
      });

      scroll(false, 0);

      jQuery(window).on('load resize', function () {
        $this.css('height', jQuery(window).outerHeight() - jQuery('.header-space:visible').outerHeight() - jQuery('.ypromo-site-bar').outerHeight() - jQuery('#wpadminbar').outerHeight());
        if (jQuery(window).width() > 768) {
          $items.find('.cell-container').css({
            'height': $this.height(),
            'width': $this.width(),
          });
        }
        $items.find('.container-fluid').css('width', $this.width());
        $this.find('.fc-navigation .item').css('height', parseInt($this.height() / $items.length));

        if (jQuery(window) <= 992) {
          $items.addClass('active');
        }
      });

      function scroll(coef, index) {
        index = index === undefined ? false : index;
        if (coef != false) {
          var index = $this.find('.fc-item.active').index() - coef;
        }
        $items.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
        $items.eq(index).prevAll().removeClass('next').addClass('prev');
        $items.eq(index).nextAll().removeClass('prev').addClass('next');

        $nav.find('.n-item').eq(index).addClass('active').siblings().removeClass('active');

        if (index == 0) {
          $arrows.find('.prev').addClass('disabled');
        } else {
          $arrows.find('.prev').removeClass('disabled');
        }

        if (index == $items.length - 1) {
          $arrows.find('.next').addClass('disabled');
        } else {
          $arrows.find('.next').removeClass('disabled');
        }

        if ($items.eq(index).find('.owl-carousel').length > 0) {
          $items.eq(index).find('.owl-carousel').each(function () {
            jQuery(this).trigger('to.owl.carousel', [0, 0]);
          });
        }

        if ($items.eq(index).hasClass('with-header-space')) {
          jQuery('.site-header').addClass('fixed');
        } else {
          jQuery('.site-header').removeClass('fixed');
        }
      }

      $this.on('mousewheel wheel', function (e) {
        if (jQuery(window).width() > 992) {
          e.preventDefault();
          var cur = $this.find('.fc-item.active').index(),
            delay = 1000;
          if (status != true) {
            status = true;
            if (e.originalEvent.deltaY > 0 && cur != parseInt($items.length - 1)) {
              scroll('-1');
              setTimeout(function () {
                status = false
              }, delay);
            } else if (e.originalEvent.deltaY < 0 && cur != 0) {
              scroll('1');
              setTimeout(function () {
                status = false
              }, delay);
            } else {
              status = false;
            }
          }
        }
      });

      $nav.on('click', '.n-item', function () {
        scroll(false, jQuery(this).index());
      });

      $arrows.on('click', '.prev', function () {
        scroll('1');
      });

      $arrows.on('click', '.next', function () {
        scroll('-1');
      });
    });
  };

  jQuery.fn.pt_tabs = function () {
    return this.each(function () {
      var $tabs = jQuery(this),
        $tabs_head = $tabs.find('.tabs-head'),
        $tabs_body = $tabs.find('.tabs-body'),
        $tab_content = $tabs.find('.tab-content');

      function set_tab(index) {
        $tabs_head.find('.item').eq(index).addClass('current').siblings().removeClass('current');
        $tab_content.eq(index).slideDown().siblings().slideUp();

        if ($tabs.find('.isotope').length > 0) {
          $tabs.find('.isotope').isotope();
        }
      }

      $tabs_head.on('click', '.item:not(.current)', function () {
        set_tab(jQuery(this).index());
      });

      set_tab(0);
    });
  };

  jQuery.fn.pt_team = function () {
    return this.each(function () {
      var $wrap = jQuery(this),
        $nav = $wrap.find('.team-nav .item'),
        $item = $wrap.find('.items .item');

      $wrap.on('click', '.team-nav .item:not(.active)', function () {
        var eq = jQuery(this).index();

        jQuery(this).addClass('active').siblings().removeClass('active');
        $item.eq(eq).slideDown().siblings().slideUp();
      });
    });
  };

  jQuery.fn.pt_grid_gallery = function () {
    return this.each(function () {
      var this_el = jQuery(this).find('.grid'),
        cols = this_el.data('cols'),
        rows = this_el.data('rows'),
        images = this_el.data('images'),
        time_out = this_el.data('time-out'),
        load_all_images = new Image(),
        current_item = 0,
        current_image = 0,
        count_images = this_el.data('count'),
        count_items = cols * rows,
        i = 0;

      for (var i2 = 0; i2 < images.length; i2++) {
        load_all_images.src = images[i2];
      }

      while (i < (cols * rows) && i < count_images) {
        this_el.append('<div class="item col-xs-' + 12 / cols + '"><div class="wrap"><div class="img" style="background-image: url(' + images[i] + ');"></div></div></div>');
        i++;
        current_image = i;
      }

      function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
      }

      if (count_images > count_items) {

        setInterval(function () {
          this_el.find('.item').eq(current_item).addClass('active').delay(900).queue(function (next) {
            jQuery(this).find('.img').css('background-image', 'url(' + images[current_image] + ')');
            jQuery(this).removeClass("active");
            next();
          });

          current_item = randomInteger(1, count_items);

          current_item = current_item - 1

          if (current_image == count_images - 1) {
            current_image = 0;
          } else {
            current_image++;
          }
        }, time_out);
      }
    });
  };

  jQuery.fn.pt_anchor_nav = function () {
    return this.each(function () {
      var $wrap = jQuery(this),
        $items = $wrap.find('.bsa-item');

      $wrap.prepend('<div class="block-scroll-nav"></div>');
      $items.each(function () {
        $wrap.find('.block-scroll-nav').append('<div></div>');
      });

      jQuery(window).on('load scroll', function () {
        $items.each(function (index) {
          var top = jQuery(document).scrollTop() + jQuery(window).height() / 2,
            pos_top = jQuery(this).offset().top,
            pos_bottom = jQuery(this).offset().top + jQuery(this).outerHeight();

          if (top > pos_top && top < pos_bottom) {
            jQuery(this).addClass('active').siblings().removeClass('active');
            $wrap.find('.block-scroll-nav div').eq(index).addClass('active').siblings().removeClass('active');
          }
        });
      });

      $wrap.on('click', '.block-scroll-nav div:not(.active)', function () {
        var eq = jQuery(this).index(),
          top = $wrap.find('.bsa-item').eq(eq).offset().top - jQuery('.ypromo-site-bar').height();

        jQuery(this).addClass('active').siblings().removeClass('active');
        jQuery('body, html').animate({
          scrollTop: top
        }, 1100);
      });
    });
  };

  jQuery.fn.pt_split_screen = function () {
    return this.each(function () {
      jQuery('body').addClass('body-one-screen');

      var this_el = jQuery(this),
        el = this_el.find('.screen-item'),
        delay = 1000,
        dots = this_el.parent().find('.pagination-dots'),
        status = false;

      el.each(function (index) {
        dots.append('<span></span>');
        index++;

        jQuery(this).find('.num').text(leadZero(index));
        jQuery(this).find('.counter .current').text(leadZero(index));
        jQuery(this).find('.counter .total').text(leadZero(el.length));
      });

      jQuery(window).on('load resize', function () {
        var height = jQuery(window).outerHeight() - jQuery('.header-space:not(.hide)').height() - jQuery('#wpadminbar').outerHeight();
        this_el.css('height', height);
        this_el.find('.items .item, .items .cell').css('height', height);

        el.find('.letter').each(function () {
          var l_el = jQuery(this),
            p_w = l_el.parent().width(),
            f_size = 0;

          if (height > p_w) {
            f_size = p_w;
          } else {
            f_size = height;
          }
          if (f_size > 785) {
            f_size = 785;
          }
          l_el.css('font-size', f_size);
          //l_el.css('line-height', height+'px');
        });
      });

      function vertical_parallax(coef, index) {
        index = index === undefined ? false : index;
        if (coef != false) {
          var index = this_el.find('.screen-item.active').index() - coef;
        }
        el.eq(index).removeClass('prev next').addClass('active').siblings().removeClass('active');
        el.eq(index).prevAll().removeClass('next').addClass('prev');
        el.eq(index).nextAll().removeClass('prev').addClass('next');

        var bg_color = el.eq(index).attr('data-hex');

        dots.find('span').eq(index).addClass('active').css('background-color', bg_color).siblings().removeClass('active').removeAttr('style');

        if (el.eq(index).hasClass('dark')) {
          jQuery('body').addClass('header-right-white-color').removeClass('header-right-dark-color');
        } else {
          jQuery('body').addClass('header-right-dark-color').removeClass('header-right-white-color');
        }
      }

      vertical_parallax(false, 0);

      this_el.on('mousewheel wheel', function (e) {
        if (jQuery(window).width() > 768) {
          e.preventDefault();
          var cur = this_el.find('.screen-item.active').index();
          if (status != true) {
            status = true;
            if (e.originalEvent.deltaY > 0 && cur != parseInt(el.length - 1)) {
              vertical_parallax('-1');
              setTimeout(function () {
                status = false
              }, delay);
            } else if (e.originalEvent.deltaY < 0 && cur != 0) {
              vertical_parallax('1');
              setTimeout(function () {
                status = false
              }, delay);
            } else {
              status = false;
            }
          }
        }
      });
      if(jQuery(window).width() > 768) {
        this_el.find('.item-left').each(function () {
          jQuery(this).swipe({
            swipeUp: function () {
              vertical_parallax('-1');
            },
            swipeDown: function () {
              vertical_parallax('1');
            }
          });
        });
        this_el.find('.item-right').each(function () {
          jQuery(this).swipe({
            swipeUp: function () {
              vertical_parallax('1');
            },
            swipeDown: function () {
              vertical_parallax('-1');
            }
          });
        });
      }

      dots.on('click', 'span:not(.active)', function () {
        jQuery(this).addClass('active').siblings().removeClass('active');
        vertical_parallax(false, jQuery(this).index());
      });
    });
  };
})(jQuery);
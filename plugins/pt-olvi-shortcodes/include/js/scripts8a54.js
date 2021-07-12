jQuery(document).ready(function () {

  /*------------------------------------------------------------------
  [ Accordion ]
  */

  jQuery('.accordion-item').on('click', '.label', function () {
    if (jQuery(this).parent().hasClass('active')) {
      jQuery(this).parent().removeClass('active').find('.text').slideUp();
    } else {
      jQuery(this).parent().addClass('active').find('.text').slideDown();
      jQuery(this).parent().siblings().removeClass('active').find('.text').slideUp();
    }
  });

  /*------------------------------------------------------------------
  [ About Me Section ]
  */

  jQuery('.about-me-section').on('click', '.about-me-button', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).parents('.about-me-section').children().removeClass('active');
    } else {
      jQuery(this).parents('.about-me-section').find('.am-about-block').addClass('active').parents('.about-me-section').find('.am-portfolio-block, .am-contact-me-block').removeClass('active');
    }
  }).on('click', '.portfolio-button', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).parents('.about-me-section').children().removeClass('active');
    } else {
      jQuery(this).parents('.about-me-section').find('.am-portfolio-block').addClass('active').parents('.about-me-section').find('.am-about-block, .am-contact-me-block').removeClass('active');
    }
  }).on('click', '.contact-me-button', function () {
    if (jQuery(this).hasClass('active')) {
      jQuery(this).parents('.about-me-section').children().removeClass('active');
    } else {
      jQuery(this).parents('.about-me-section').find('.am-contact-me-block').addClass('active').parents('.about-me-section').find('.am-about-block, .am-portfolio-block').removeClass('active');
    }
  });

  jQuery('.icon-box-carousel-w-zoom').on('mouseenter', '.item', function () {
    jQuery(this).find('.content').stop().slideDown();
  }).on('mouseleave', '.item', function () {
    jQuery(this).find('.content').stop().slideUp();
  });


  jQuery('.banner-area .scroll-next').on('click', function () {
    var $area = jQuery(this).parent(),
      top = $area.offset().top + $area.height() - jQuery('.site-header').height() - jQuery('#wpadminbar').outerHeight() - jQuery('.ypromo-site-bar').outerHeight();

    jQuery('body, html').animate({
      scrollTop: top
    }, 1100);
    return false;
  });

  jQuery(window).on("load", function () {
    /*------------------------------------------------------------------
    [ Portfolio items & filtering ]
    */

    jQuery(document).on('click', '.blog-block .filter-button-group button:not(.active),.portfolio-block .filter-button-group button:not(.active)', function () {
      var $grid = jQuery(this).parents('.portfolio-block, .blog-block').find('.isotope');

      if ($grid.length == 0) return;

      jQuery(this).addClass('active').siblings().removeClass('active');

      var filterValue = jQuery(this).attr('data-filter');
      if (jQuery(this).parents('.portfolio-block, .blog-block').find('.loadmore-button').length > 0) {
        jQuery(this).parents('.portfolio-block, .blog-block').find('.loadmore-button').trigger('click', [false]);
      } else {
        $grid.isotope({
          filter: filterValue
        });
      }

      jQuery(window).trigger('resize').trigger('scroll');
    });


    jQuery('.portfolio-items:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: 'article',
        horizontalOrder: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });
    });

    /*------------------------------------------------------------------
    [ Blog items & filtering ]
    */
    jQuery('.blog-items:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: 'article'
      });
    });

    jQuery('.post-gallery-grid:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12',
        horizontalOrder: true
      });
    });

    jQuery('.portfolio-type-justified').each(function () {
      var gap = 15;
      if (jQuery(this).hasClass('gap-off')) {
        gap = 0;
      }
      jQuery(this).justifiedGallery({
        rowHeight: 250,
        selector: 'article',
        imgSelector: 'img',
        captions: false,
        margins: gap
      });
    });

    /*------------------------------------------------------------------
    [ Team ]
    */
    jQuery('.team-items:not(.owl-carousel)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12'
      });
    });

    /*------------------------------------------------------------------
    [ Price list ]
    */
    jQuery('.price-list:not(.disable-iso)').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.price-list-item'
      });
    });

    /*------------------------------------------------------------------
    [ Courses items ]
    */
    jQuery('.courses').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: 'article.course-item'
      });
    });

    /*------------------------------------------------------------------
    [ Categories items ]
    */
    jQuery('.categories').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.item',
        //horizontalOrder: true,
        masonry: {
          //horizontalOrder: true,
        }
      });
    });

    /*------------------------------------------------------------------
    [ Products ]
    */
    jQuery('.products.filter-items').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.col-xs-12'
      });

      jQuery(this).prev('.filter-button-group').on('click', 'button', function () {
        jQuery(this).addClass('active').siblings().removeClass('active');
        var filterValue = jQuery(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
        jQuery(window).trigger('resize').trigger('scroll');
      });
    });

    /*------------------------------------------------------------------
    [ Products ]
    */
    jQuery('.masonry-block').each(function () {
      var $grid = jQuery(this).addClass('isotope').isotope({
        itemSelector: '.wpb_column'
      });
    });
  });

  /*------------------------------------------------------------------
  [ Animations ]
  */

  jQuery('.portfolio-type-masonry_type2 .portfolio-item-masonry-t2').each(function () {
    translate_p_item(jQuery(this));
  });



  jQuery(window).on('load scroll', function () {
    var scroll_top = jQuery(window).scrollTop(),
      window_height = jQuery(window).height();
      
    jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
      var th = jQuery(this);
      th.imagesLoaded(function () {
        var top = jQuery(document).scrollTop() + jQuery(window).height(),
          pos_top = th.offset().top;
        if (top > pos_top) {
          th.addClass('wpb_start_animation animated');
        }
      });
    });

    jQuery('.skill-item .rating-line').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height(),
        pos_top = jQuery(this).offset().top,
        val = jQuery(this).data('percent');
      if (top > pos_top) {
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').find('div').css('width', val + '%');
        }
      }
    });

    jQuery('.banner-area .banner-social-buttons').each(function () {
      var top = jQuery(document).scrollTop() + jQuery('#wpadminbar').outerHeight(),
        el_pos_top = jQuery(this).offset().top,
        el_height = jQuery(this).offset().top + jQuery(this).height();

      if (top >= el_pos_top && top <= el_height) {
        jQuery('body').addClass('sidebar-button-w-line');
      } else {
        jQuery('body').removeClass('sidebar-button-w-line');
      }
    });

    jQuery('.portfolio-type-scattered .portfolio-item').each(function(index) {
      var $this = jQuery(this),
      offset = scroll_top+window_height-$this.offset().top,
      val = 10;

      if(offset >= 0 && offset <= window_height) {
        var percent = offset*100/window_height;
        val = 10-20*(percent/100);
      } else if(offset > window_height) {
        val = -10;
      }

      jQuery(this).find('.wrap').css({
        '-webkit-transform': 'translateY('+val+'%)',
        '-moz-transform': 'translateY('+val+'%)',
        '-o-transform': 'translateY('+val+'%)',
        'transform': 'translateY('+val+'%)',
      })
    });
  });

  jQuery(window).scroll(num_scr);

  function num_scr() {
    jQuery('.num-box-w-image .item .num').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height();
      var pos_top = jQuery(this).offset().top;
      if (top > pos_top) {
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').prop('Counter', 0).animate({
            Counter: jQuery(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              jQuery(this).text(Math.ceil(now));
            }
          });
        }
      }
    });
    jQuery('.skill-item-circle .circle .skill-level').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height();
      var pos_top = jQuery(this).offset().top;
      if (top > pos_top) {
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').prop('Counter', 0).animate({
            Counter: jQuery(this).text()
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              jQuery(this).html(Math.ceil(now) + '<span>%</span>');
            }
          });
        }
      }
    });
  }

  var l_button_index = 0;
  jQuery('.load-offline-area .load-button-area a').on('click', function () {
    var $this = jQuery(this),
      $wrap = $this.parents('.load-offline-area'),
      $load_items = $wrap.find('.load-items'),
      cout_pages = $load_items.length;

    l_button_index++;
    if (cout_pages == 1) {
      jQuery(this).parent().slideUp();
    }
    var items = $wrap.find('.load-items' + l_button_index).find('.load-item');
    $wrap.find('.load-items' + l_button_index).remove();

    $wrap.find('.items').append(items).isotope('appended', items);

    setTimeout(function () {
      jQuery(window).trigger('resize').trigger('scroll');
    }, 500);
    return false;
  });

  /*------------------------------------------------------------------
  [ Image Comparison Slider ]
  */

  jQuery(document).ready(function () {
    jQuery('.image-comparison-slider').each(function () {
      var cur = jQuery(this);
      var width = cur.width() + 'px';
      cur.find('.resize .old').css('width', width);
      drags(cur.find('.line'), cur.find('.resize'), cur);
    });
  });

  jQuery(window).resize(function () {
    jQuery('.image-comparison-slider').each(function () {
      var cur = jQuery(this);
      var width = cur.width() + 'px';
      cur.find('.resize .old').css('width', width);
    });
  });

  function drags(dragElement, resizeElement, container) {

    dragElement.on('mousedown touchstart', function (e) {

      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');

      var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX,
        dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth(),
        minLeft = containerOffset + 80,
        maxLeft = containerOffset + containerWidth - dragWidth - 80;

      dragElement.parents().on("mousemove touchmove", function (e) {

        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX,
          leftValue = moveX + posX - dragWidth;

        if (leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

        jQuery('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
          jQuery(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });
        jQuery('.resizable').css('width', widthValue);
      }).on('mouseup touchend touchcancel', function () {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      e.preventDefault();
    }).on('mouseup touchend touchcancel', function (e) {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
  }

  jQuery('.portfolio-block, .blog-block').YPRMLoadMore();

  if (jQuery('.popup-gallery').length > 0 || jQuery('.single-popup-item').length > 0) {
    if (jQuery('body').find('.pswp').length == 0) {
      jQuery('body').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>');
    }

    var $pswp = jQuery('.pswp')[0];
    var image = [];

    jQuery(document).on('click', '.popup-gallery .popup-item a, a.single-popup-item', function (event) {
      if (!jQuery(this).hasClass('permalink')) {
        var image = [];
        if (jQuery(this).hasClass('single-popup-item')) {
          var $pic = jQuery(this);
        } else {
          var $pic = jQuery(this).parents('.popup-gallery');
        }

        var getItems = function () {
          var items = [],
            $el = '';
          if ($pic.hasClass('owl-carousel')) {
            $el = $pic.find('.owl-item:not(.cloned) a:visible');
          } else if ($pic.hasClass('single-popup-item')) {
            $el = $pic;
          } else {
            $el = $pic.find('.popup-item a:not(.permalink)');
          }

          $el.each(function () {
            if (!jQuery(this).hasClass('permalink')) {
              var $href = jQuery(this).attr('href'),
                $size = jQuery(this).data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

              if (jQuery(this).data('type') == 'video') {
                var item = {
                  html: jQuery(this).attr('data-video')
                };
              } else {
                var item = {
                  src: $href,
                  w: $width,
                  h: $height
                }
              }

              items.push(item);
            }
          });
          return items;
        }

        var items = getItems();

        jQuery.each(items, function (index, value) {
          image[index] = new Image();
          if (value['src']) {
            image[index].src = value['src'];
          }
        });

        event.preventDefault();

        var $index = jQuery(this).parents('.popup-item').index();

        if (jQuery(this).hasClass('single-popup-item')) {
          $index = 1;
        }
        if (jQuery(this).parent().hasClass('thumbnails')) {
          $index++;
        }
        if ($pic.hasClass('owl-carousel')) {
          $index = jQuery(this).data('id');
        }
        if (jQuery(this).parents('.popup-gallery').find('.grid-sizer').length > 0) {
          $index = $index - 1;
        }
        var options = {
          index: $index,
          bgOpacity: 0.7,
          showHideOpacity: true
        }

        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        lightBox.init();

        lightBox.listen('beforeChange', function () {
          var currItem = jQuery(lightBox.currItem.container);
          jQuery('.pswp__item .pswp__video').removeClass('active');
          var currItemIframe = currItem.find('.pswp__video').addClass('active');
          jQuery('.pswp__item .pswp__video').each(function () {
            if (!jQuery(this).hasClass('active')) {
              jQuery(this).attr('src', jQuery(this).attr('src'));
            }
          });
        });

        lightBox.listen('close', function () {
          jQuery('.pswp__item .pswp__zoom-wrap').remove();
        });
      }
    });
  }
});

(function (jQuery) {
  "use strict";
  jQuery.fn.YPRMLoadMore = function (options) {

    function rebuild_array(src, filt) {
      var result = [];

      for (let index = 0; index < src.length; index++) {
        let id = src[index].id,
          flag = false;
        for (let index2 = 0; index2 < filt.length; index2++) {
          let id2 = filt[index2].id;
          if (id == id2) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          result.push(src[index]);
        }
      }

      return JSON.stringify(result);
    }

    function getFromCategory(array, slug, count, return_type) {
      var result = [],
        i = 0;

      for (let index = 0; index < array.length; index++) {
        let flag = false;

        if(typeof array[index].cat === undefined || typeof array[index].cat === 'undefined') continue;

        for (let index2 = 0; index2 < array[index].cat.length; index2++) {
          if (array[index].cat[index2] == slug) {
            flag = true;
            break;
          }
        }
        if (flag) {
          i++;
          result.push(array[index]);
        }

        if (i == count && !return_type) {
          break;
        }
      }

      if (result == []) {
        return false;
      }

      return result;
    }

    return this.each(function () {
      var $this = jQuery(this),
        $button = $this.find('.loadmore-button'),
        $filter = $this.find('[class^="filter-butt"]'),
        $items = $this.find('.load-wrap'),
        type = $button.attr('data-type'),
        action = 'loadmore_' + $button.attr('data-action'),
        count = $button.attr('data-count'),
        style = $button.attr('data-style');

      $this.append('<div class="load-items-area"></div>');

      $items.css('min-height', $items.find('article').height());
      
      $button.on('click', function (event, loading) {
        if(typeof loading === undefined || loading === undefined) {
          loading = true
        }
        
        var array = JSON.parse($button.attr('data-array')),
          atts = JSON.parse($button.attr('data-atts')),
          load_items = array.slice(0, count),
          filter_value = '*';
        
        if ($filter.length > 0) {
          var filter_value = $filter.find('.active').attr('data-filter'),
            slug = filter_value.replace('.category-', ''),
            current_count = $items.find(filter_value).length;

          if (filter_value != '*') {
            var cat_full_length = getFromCategory(array, slug, count, true).length,
              cat_length = getFromCategory(array, slug, count, false).length;

            if (current_count < count && cat_full_length != 0) {
              load_items = getFromCategory(array, slug, count - current_count, false);
              loading = true;
            } else if (loading) {
              load_items = getFromCategory(array, slug, count, false);
            }

            if ((loading && cat_full_length - load_items.length <= 0) || (!loading && cat_full_length == 0)) {
              $button.fadeOut();
            } else {
              $button.fadeIn();
            }
          } else {
            $button.fadeIn();
          }

          $items.isotope({
            filter: filter_value
          });
        }

        if (!loading) {
          return false;
        }

        $button.addClass('loading');

        jQuery.ajax({
          url: yprm_ajax.url,
          type: "POST",
          data: {
            action: action,
            array: load_items,
            atts: atts,
            type: type,
            style: style,
            start_index: $this.find('article').length
          },
          success: function (data) {
            var temp_block = $this.find('.load-items-area').append(data);
            array = rebuild_array(array, load_items);

            temp_block.imagesLoaded(function () {

              var items = temp_block.find('article');

              if ($items.hasClass('isotope')) {
                $items.append(items).isotope('appended', items).isotope({
                  filter: filter_value
                }).queue(function (next) {
                  jQuery(window).trigger('resize').trigger('scroll');
                  setTimeout(function () {
                    jQuery(window).trigger('resize').trigger('scroll');
                  }, 500);
                  jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
                    var $el = jQuery(this);

                    $el.vcwaypoint(function () {
                      $el.addClass("wpb_start_animation animated")
                    }, {
                      offset: "85%"
                    });
                  });
                  next();
                });
              } else {
                jQuery(window).trigger('resize').trigger('scroll');
                setTimeout(function () {
                  jQuery(window).trigger('resize').trigger('scroll');
                }, 500);
                $items.append(items).queue(function (next) {
                  jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
                    var $el = jQuery(this);

                    $el.vcwaypoint(function () {
                      $el.addClass("wpb_start_animation animated")
                    }, {
                      offset: "85%"
                    });
                  });
                  next();
                });
              }

            });

            $button.attr('data-array', array).removeClass('loading');
            if (array == '[]') {
              $button.parent().slideUp();
            }
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          }
        });
      });
    });
  };

})(jQuery);
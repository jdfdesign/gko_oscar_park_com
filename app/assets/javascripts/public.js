//= require jquery_ujs
//= require remote_form
//= require jquery.placeholder
//= require jquery.easing

// make console.log safe to use
window.console || (console = {
  log: function() {}
});
var map;

jQuery(function($){
  'use strict';
  var THEME = window.THEME || {};


  THEME.anim = function(){ 
    
    var wrapper = $("#page-wrapper"),
        header= $("#header"),
        image_url = header.data("bg"),
        //intro = $("#intro"),
        logo = $("#logo"),
        intro_text = $("#intro-text");
    
    wrapper.hide();
    //intro.hide();
    logo.hide();
    intro_text.css('opacity', '0')     
    /* Starting Animation on Load */
     $('<img/>').attr('src', image_url).load(function() { 
       header.css("background-image", "url(" + image_url + ")");
       wrapper.fadeIn(1200, function() {
         THEME.textCenter(); 
         //intro.show();
         logo.fadeIn(600, function() {
           intro_text.animate({opacity:'1'}, 600) 
         });
         THEME.gmap();
       });
    });
  }
  THEME.textCenter = function(){
    $('#content-wrapper').css({
      position:'absolute'
    });

    $('#content-wrapper').css({
      left: ($(window).width() - $('#content-wrapper').outerWidth())/2,
      top: ($(window).height() - $('#content-wrapper').outerHeight())/2
    });
  }

  /* ==================================================
  	Fix
  ================================================== */

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  /* ==================================================
  	Placeholder
  ================================================== */

  THEME.placeholder = function(){
    // enable placeholder fix for old browsers
    $('input, textarea').placeholder();
  };
  /* ==================================================
  	Carousel
  ================================================== */

    THEME.carousel = function() {
      // start the carousel if there is more than one image
      // else hide controls
      $('.carousel').each(function(index) {
        var _self = $(this);
        if (_self.find('.item').length > 1) {
          _self.carousel({
            interval: 3000
          });
        } else {
          _self.find('.carousel-control').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
          _self.find('.carousel-indicators').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
        }
      })
    };

  /* ==================================================
    	Navigation
    ================================================== */
    THEME.navigation = function() {
      
      var navbarHeight = $('.navbar').height();
      $(window).bind('scroll', function () {
        var scrollTop = jQuery(window).scrollTop();
        scrollTop >= $(window).height() - navbarHeight ? $(".navbar").addClass("fixed") : $(".navbar").removeClass("fixed");
      });
      
      $('.navbar-nav li').on("click", function(e) {
        var target = $("#" + $(this).attr('id') + "_page"),
            navbarHeight = $('.navbar').height();
        console.log(target);
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() <= 767) {
          $('html, body').stop().animate({
            scrollTop: target.offset().top - navbarHeight
          }, 1500, 'easeInOutExpo');
        } else {
          $('html, body').stop().animate({
            scrollTop: target.offset().top - navbarHeight
          }, 1500, 'easeInOutExpo');
        }

        e.preventDefault();
      })
      
      
    }
  /* ==================================================
    	Scroll to Top
    ================================================== */

    THEME.scrollToTop = function() {
      var didScroll = false;

      var $arrow = $('#back-to-top');

      $arrow.click(function(e) {
        $('body,html').animate({
          scrollTop: "0"
        }, 750, 'easeOutExpo');
        e.preventDefault();
      });

      $(window).scroll(function() {
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          didScroll = false;

          if ($(window).scrollTop() > 1000) {
            $arrow.css('display', 'block');
          } else {
            $arrow.css('display', 'none');
          }
        }
      }, 250);
    };
    
    /* ==================================================
      	Gmap
      ================================================== */

      THEME.gmap = function() {
        var styles = [
      				{ stylers: [{ saturation: -100 }, { gamma: 1 }] },
      				{ elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.business", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.business", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.place_of_worship", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.place_of_worship", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      				{ featureType: "road", elementType: "geometry", stylers: [{ visibility: "simplified" }] },
      				{ featureType: "water", stylers: [{ visibility: "on" }, { saturation: 50 }, { gamma: 0 }, { hue: "#50a5d1" }] },
      				{ featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
      				{ featureType: "road.local", elementType: "labels.text", stylers: [{ weight: 0.5 }, { color: "#333333" }] },
      				{ featureType: "transit.station", elementType: "labels.icon", stylers: [{ gamma: 1 }, { saturation: 50 }] }
      			],
            styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  			var myOptions = {
  				disableDefaultUI: true,
  				zoomControl: true,
  				streetViewControl: true,
  				zoomControlOptions: {
  					style: google.maps.ZoomControlStyle.SMALL,
  					position: google.maps.ControlPosition.LEFT_TOP
  				},
  				mapTypeControlOptions: {
  					mapTypeId: [google.maps.MapTypeId.ROADMAP, 'map_style']
  				},
  				zoom: 17,
  				center: new google.maps.LatLng(17.898187,-62.849759),
  				mapTypeId: google.maps.MapTypeId.ROADMAP,
  				scrollwheel: false
  			}

        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');

  			var marker_1 = new google.maps.Marker({
          position: new google.maps.LatLng(17.898067, -62.849822),
          map: map
        });

        var content_1 = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Buy your Ticket here</h1>'+
              '<div id="bodyContent">'+
              '<p>Buy your parking ticket for OSCARPARK in the shop TOM SHOP.<br/>Opened from 9am to 7pm</p>'+
              '</div>'+
              '</div>';
    
    
        var infowindow_1 = new google.maps.InfoWindow({
          content: content_1
        });
       
        var marker_2 = new google.maps.Marker({
          position: new google.maps.LatLng(17.896401, -62.847956),
          map: map
        });
    
        var content_2 = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">OscarPark</h1>'+
              '<div id="bodyContent">'+
              '<p>OSCARPARK : your very private parking in Gustavia (St.Barths)</p>'+
              '</div>'+
              '</div>';
    
    
        var infowindow_2 = new google.maps.InfoWindow({
          content: content_2
        });

        google.maps.event.addListener(marker_1, 'click', function() {
          infowindow_1.open(map,marker_1);
        });
        google.maps.event.addListener(marker_2, 'click', function() {
          infowindow_2.open(map,marker_2);
        });
      }
/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    
    
    THEME.fix();
    THEME.anim(); 
    THEME.textCenter();
    //THEME.navigation();
    //THEME.scrollToTop();
    THEME.placeholder();
    
    $('.pipe a').attr("data-remote", "true");
    
    
    
    $( window ).resize(function() {
      THEME.textCenter();
      google.maps.event.trigger(map, 'resize');
    });
  });
}); 

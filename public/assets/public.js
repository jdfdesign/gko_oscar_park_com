!function(e,t){var n=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};n()&&e.error("jquery-ujs has already been loaded!");var a;e.rails=a={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,a){var r=e.Event(n);return t.trigger(r,a),r.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var r,i,o,s,u,l,c,d;if(a.fire(n,"ajax:before")){if(s=n.data("cross-domain"),u=s===t?null:s,l=n.data("with-credentials")||null,c=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,n.is("form")){r=n.attr("method"),i=n.attr("action"),o=n.serializeArray();var f=n.data("ujs:submit-button");f&&(o.push(f),n.data("ujs:submit-button",null))}else n.is(a.inputChangeSelector)?(r=n.data("method"),i=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):(r=n.data("method"),i=a.href(n),o=n.data("params")||null);d={type:r||"GET",data:o,dataType:c,beforeSend:function(e,r){return r.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+r.accepts.script),a.fire(n,"ajax:beforeSend",[e,r])},success:function(e,t,a){n.trigger("ajax:success",[e,t,a])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,a){n.trigger("ajax:error",[e,t,a])},xhrFields:{withCredentials:l},crossDomain:u},i&&(d.url=i);var p=a.ajax(d);return n.trigger("ajax:send",p),p}return!1},handleMethod:function(n){var r=a.href(n),i=n.data("method"),o=n.attr("target"),s=e("meta[name=csrf-token]").attr("content"),u=e("meta[name=csrf-param]").attr("content"),l=e('<form method="post" action="'+r+'"></form>'),c='<input name="_method" value="'+i+'" type="hidden" />';u!==t&&s!==t&&(c+='<input name="'+u+'" value="'+s+'" type="hidden" />'),o&&l.attr("target",o),l.hide().append(c).appendTo("body"),l.submit()},disableFormElements:function(t){t.find(a.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(a.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,n=e.data("confirm"),r=!1;return n?(a.fire(e,"confirm")&&(r=a.confirm(n),t=a.fire(e,"confirm:complete",[r])),r&&t):!0},blankInputs:function(t,n,a){var r,i,o=e(),s=n||"input,textarea";return t.find(s).each(function(){r=e(this),i=r.is(":checkbox,:radio")?r.is(":checked"):r.val(),i==!!a&&(o=o.add(r))}),o.length?o:!1},nonBlankInputs:function(e,t){return a.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,a){var r=n.data("events"),i=!0;return r!==t&&r.submit!==t&&e.each(r.submit,function(e,t){return"function"==typeof t.handler?i=t.handler(a):void 0}),i},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return a.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},a.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||a.CSRFProtection(n)}),e(document).delegate(a.linkDisableSelector,"ajax:complete",function(){a.enableElement(e(this))}),e(document).delegate(a.linkClickSelector,"click.rails",function(n){var r=e(this),i=r.data("method"),o=r.data("params");return a.allowAction(r)?(r.is(a.linkDisableSelector)&&a.disableElement(r),r.data("remote")!==t?!n.metaKey&&!n.ctrlKey||i&&"GET"!==i||o?(a.handleRemote(r)===!1&&a.enableElement(r),!1):!0:r.data("method")?(a.handleMethod(r),!1):void 0):a.stopEverything(n)}),e(document).delegate(a.inputChangeSelector,"change.rails",function(t){var n=e(this);return a.allowAction(n)?(a.handleRemote(n),!1):a.stopEverything(t)}),e(document).delegate(a.formSubmitSelector,"submit.rails",function(n){var r=e(this),i=r.data("remote")!==t,o=a.blankInputs(r,a.requiredInputSelector),s=a.nonBlankInputs(r,a.fileInputSelector);return a.allowAction(r)?o&&r.attr("novalidate")==t&&a.fire(r,"ajax:aborted:required",[o])?a.stopEverything(n):i?s?(setTimeout(function(){a.disableFormElements(r)},13),a.fire(r,"ajax:aborted:file",[s])):!e.support.submitBubbles&&e().jquery<"1.7"&&a.callFormSubmitBindings(r,n)===!1?a.stopEverything(n):(a.handleRemote(r),!1):(setTimeout(function(){a.disableFormElements(r)},13),void 0):a.stopEverything(n)}),e(document).delegate(a.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!a.allowAction(n))return a.stopEverything(t);var r=n.attr("name"),i=r?{name:r,value:n.val()}:null;n.closest("form").data("ujs:submit-button",i)}),e(document).delegate(a.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&a.disableFormElements(e(this))}),e(document).delegate(a.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&a.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),jQuery(document).ready(function(){jQuery("input").bind("input propertychange",function(){if(jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),"email"==jQuery(this).attr("id")){var e=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):e.test(jQuery(this).val())?(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow")):(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow"))}else""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("textarea").bind("input propertychange",function(){jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("#contact-form").on("ajax:beforeSend",function(){jQuery("span.error").fadeOut("slow"),jQuery("span.valid").fadeOut("slow"),jQuery("#thanks").hide(),jQuery("#error").hide(),jQuery("#timedout").hide(),jQuery("#state").hide();var e=!1,t=jQuery("#inquiry_name").val();""==t||" "==t?(jQuery("#inquiry_name").after("<span class='error'></span>"),jQuery("#inquiry_name").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_name").after("<span class='valid'></span>"),jQuery("#inquiry_name").parent().find(".valid").fadeIn("slow"));var n=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,a=jQuery("#inquiry_email").val();""==a||" "==a?(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0):n.test(a)?(jQuery("#inquiry_email").after("<span class='valid'></span>"),jQuery("#inquiry_email").parent().find(".valid").fadeIn("slow")):(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0);var r=jQuery("#inquiry_message").val();return""==r||" "==r?(jQuery("#inquiry_message").after("<span class='error'></span>"),jQuery("#inquiry_message").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_message").after("<span class='valid'></span>"),jQuery("#inquiry_message").parent().find(".valid").fadeIn("slow")),1==e?(jQuery("#error").fadeIn("slow"),setTimeout(function(){jQuery("#error").fadeOut("slow")},3e3),!1):void 0}).on("ajax:error",function(e,t,n,a){"timeout"==a?(jQuery("#timedout").fadeIn("slow"),setTimeout(function(){jQuery("#timedout").fadeOut("slow")},3e3)):(jQuery("#state").fadeIn("slow"),jQuery("#state").html("The following error occured: "+a),setTimeout(function(){jQuery("#state").fadeOut("slow")},3e3))}).on("ajax:success",function(){jQuery("span.valid").remove(),jQuery("#thanks").fadeIn("slow"),jQuery("input").val(""),jQuery("textarea").val(""),setTimeout(function(){jQuery("#thanks").fadeOut("slow")},3e3)})}),function(e,t,n){function a(e){var t={},a=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!a.test(n.name)&&(t[n.name]=n.value)}),t}function r(e,a){var r=this,i=n(r);if(r.value==i.attr("placeholder")&&i.hasClass("placeholder"))if(i.data("placeholder-password")){if(i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id")),e===!0)return i[0].value=a;i.focus()}else r.value="",i.removeClass("placeholder"),r==t.activeElement&&r.select()}function i(){var e,t=this,i=n(t),o=this.id;if(""==t.value){if("password"==t.type){if(!i.data("placeholder-textinput")){try{e=i.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(a(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":i,"placeholder-id":o}).bind("focus.placeholder",r),i.data({"placeholder-textinput":e,"placeholder-id":o}).before(e)}i=i.removeAttr("id").hide().prev().attr("id",o).show()}i.addClass("placeholder"),i[0].value=i.attr("placeholder")}else i.removeClass("placeholder")}var o,s,u="placeholder"in t.createElement("input"),l="placeholder"in t.createElement("textarea"),c=n.fn,d=n.valHooks,f=n.propHooks;u&&l?(s=c.placeholder=function(){return this},s.input=s.textarea=!0):(s=c.placeholder=function(){var e=this;return e.filter((u?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":i}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},s.input=u,s.textarea=l,o={get:function(e){var t=n(e),a=t.data("placeholder-password");return a?a[0].value:t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,a){var o=n(e),s=o.data("placeholder-password");return s?s[0].value=a:o.data("placeholder-enabled")?(""==a?(e.value=a,e!=t.activeElement&&i.call(e)):o.hasClass("placeholder")?r.call(e,!0,a)||(e.value=a):e.value=a,o):e.value=a}},u||(d.input=o,f.value=o),l||(d.textarea=o,f.value=o),n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(r);setTimeout(function(){e.each(i)},10)})}),n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,a,r){return jQuery.easing[jQuery.easing.def](e,t,n,a,r)},easeInQuad:function(e,t,n,a,r){return a*(t/=r)*t+n},easeOutQuad:function(e,t,n,a,r){return-a*(t/=r)*(t-2)+n},easeInOutQuad:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t+n:-a/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,a,r){return a*(t/=r)*t*t+n},easeOutCubic:function(e,t,n,a,r){return a*((t=t/r-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t+n:a/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,a,r){return a*(t/=r)*t*t*t+n},easeOutQuart:function(e,t,n,a,r){return-a*((t=t/r-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t*t+n:-a/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,a,r){return a*(t/=r)*t*t*t*t+n},easeOutQuint:function(e,t,n,a,r){return a*((t=t/r-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t*t*t+n:a/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,a,r){return-a*Math.cos(t/r*(Math.PI/2))+a+n},easeOutSine:function(e,t,n,a,r){return a*Math.sin(t/r*(Math.PI/2))+n},easeInOutSine:function(e,t,n,a,r){return-a/2*(Math.cos(Math.PI*t/r)-1)+n},easeInExpo:function(e,t,n,a,r){return 0==t?n:a*Math.pow(2,10*(t/r-1))+n},easeOutExpo:function(e,t,n,a,r){return t==r?n+a:a*(-Math.pow(2,-10*t/r)+1)+n},easeInOutExpo:function(e,t,n,a,r){return 0==t?n:t==r?n+a:(t/=r/2)<1?a/2*Math.pow(2,10*(t-1))+n:a/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,a,r){return-a*(Math.sqrt(1-(t/=r)*t)-1)+n},easeOutCirc:function(e,t,n,a,r){return a*Math.sqrt(1-(t=t/r-1)*t)+n},easeInOutCirc:function(e,t,n,a,r){return(t/=r/2)<1?-a/2*(Math.sqrt(1-t*t)-1)+n:a/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,a,r){var i=1.70158,o=0,s=a;if(0==t)return n;if(1==(t/=r))return n+a;if(o||(o=.3*r),s<Math.abs(a)){s=a;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(a/s);return-(s*Math.pow(2,10*(t-=1))*Math.sin((t*r-i)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,a,r){var i=1.70158,o=0,s=a;if(0==t)return n;if(1==(t/=r))return n+a;if(o||(o=.3*r),s<Math.abs(a)){s=a;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(a/s);return s*Math.pow(2,-10*t)*Math.sin((t*r-i)*2*Math.PI/o)+a+n},easeInOutElastic:function(e,t,n,a,r){var i=1.70158,o=0,s=a;if(0==t)return n;if(2==(t/=r/2))return n+a;if(o||(o=r*.3*1.5),s<Math.abs(a)){s=a;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(a/s);return 1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin((t*r-i)*2*Math.PI/o)+n:.5*s*Math.pow(2,-10*(t-=1))*Math.sin((t*r-i)*2*Math.PI/o)+a+n},easeInBack:function(e,t,n,a,r,i){return void 0==i&&(i=1.70158),a*(t/=r)*t*((i+1)*t-i)+n},easeOutBack:function(e,t,n,a,r,i){return void 0==i&&(i=1.70158),a*((t=t/r-1)*t*((i+1)*t+i)+1)+n},easeInOutBack:function(e,t,n,a,r,i){return void 0==i&&(i=1.70158),(t/=r/2)<1?a/2*t*t*(((i*=1.525)+1)*t-i)+n:a/2*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)+n},easeInBounce:function(e,t,n,a,r){return a-jQuery.easing.easeOutBounce(e,r-t,0,a,r)+n},easeOutBounce:function(e,t,n,a,r){return(t/=r)<1/2.75?a*7.5625*t*t+n:2/2.75>t?a*(7.5625*(t-=1.5/2.75)*t+.75)+n:2.5/2.75>t?a*(7.5625*(t-=2.25/2.75)*t+.9375)+n:a*(7.5625*(t-=2.625/2.75)*t+.984375)+n},easeInOutBounce:function(e,t,n,a,r){return r/2>t?.5*jQuery.easing.easeInBounce(e,2*t,0,a,r)+n:.5*jQuery.easing.easeOutBounce(e,2*t-r,0,a,r)+.5*a+n}}),window.console||(console={log:function(){}}),jQuery(function(e){"use strict";var t=window.THEME||{};t.anim=function(){var n=e("#page-wrapper"),a=e("#header"),r=a.data("bg"),i=e("#logo"),o=e("#intro-text");n.hide(),i.hide(),o.css("opacity","0"),e("<img/>").attr("src",r).load(function(){a.css("background-image","url("+r+")"),n.fadeIn(1200,function(){t.textCenter(),i.fadeIn(600,function(){o.animate({opacity:"1"},600)})})})},t.textCenter=function(){e("#content-wrapper").css({position:"absolute"}),e("#content-wrapper").css({left:(e(window).width()-e("#content-wrapper").outerWidth())/2,top:(e(window).height()-e("#content-wrapper").outerHeight())/2})},t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.placeholder=function(){e("input, textarea").placeholder()},t.carousel=function(){e(".carousel").each(function(){var t=e(this);t.find(".item").length>1?t.carousel({interval:3e3}):(t.find(".carousel-control").each(function(){e(this).css({display:"none"})}),t.find(".carousel-indicators").each(function(){e(this).css({display:"none"})}))})},t.navigation=function(){var t=e(".navbar").height();e(window).bind("scroll",function(){var n=jQuery(window).scrollTop();n>=e(window).height()-t?e(".navbar").addClass("fixed"):e(".navbar").removeClass("fixed")}),e(".navbar-nav li").on("click",function(t){var n=e("#"+e(this).attr("id")+"_page"),a=e(".navbar").height();console.log(n),e(this).parent().find("li").removeClass("active"),e(this).addClass("active"),e(window).width()<=767?e("html, body").stop().animate({scrollTop:n.offset().top-a},1500,"easeInOutExpo"):e("html, body").stop().animate({scrollTop:n.offset().top-a},1500,"easeInOutExpo"),t.preventDefault()})},t.scrollToTop=function(){var t=!1,n=e("#back-to-top");n.click(function(t){e("body,html").animate({scrollTop:"0"},750,"easeOutExpo"),t.preventDefault()}),e(window).scroll(function(){t=!0}),setInterval(function(){t&&(t=!1,e(window).scrollTop()>1e3?n.css("display","block"):n.css("display","none"))},250)},e(document).ready(function(){t.fix(),t.anim(),t.textCenter(),t.placeholder()})});
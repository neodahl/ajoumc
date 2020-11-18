/* GNB control */
(function(){
	var $depth1Menu = $('.depth_1 > li');
	var $depth1MenuAnchor = $('.depth_1 > li > a');
	var $lastAnchors = $('.depth_1 a:last');				
	var $firstAnchor= $('.depth_1 a:first');
	var $gnbBottomBanner = $('.gnb_bottom_banner');
	
	$depth1Menu.on('mouseover', gnbMouseOverHandler);
	$depth1Menu.on('mouseout', gnbMouseOutHandler);
	$depth1MenuAnchor.on('focus', gnbFocusHandler);
	$lastAnchors.on('keydown', gnbKeyDownHandler);
	$firstAnchor.on('keydown', gnbKeyDownHandler02);
	
	function openGnbMenu($target) {
		if(!$target) return;

		$('.gnb').removeClass('is_transparent');
		
		$target
			.addClass('active')
			.children('.depth2').prop({
				'hidden': false
			});
		$target.siblings()

			.removeClass('active')
			.children('.depth2').prop({
				'hidden': true
			});
		$gnbBottomBanner.show();
	}
	
	function closeGnbMenu($target) {
		if(!$target) return;

		$target
			.removeClass('active')
			.children('.depth2').prop({
				'hidden': true
			});
		$gnbBottomBanner.hide();
	}
	
	function gnbMouseOverHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		
		openGnbMenu( $(this) );
	}
	
	function gnbMouseOutHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		
		closeGnbMenu( $(this) );
	}
	
	function gnbFocusHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		var $currMenu = $(e.currentTarget).parent();
		
		openGnbMenu($currMenu)
	}
	
	function gnbKeyDownHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		var keycode = e.keycode || e.which;
		var $currMenuList = $(this).parents('.depth_1 > li'); 
		
		if(!e.shiftKey && keycode == 9) {
			closeGnbMenu($currMenuList);
		}
	}
	
	function gnbKeyDownHandler02(e) {
		e = e || window.event;
		e.stopPropagation();
		var keycode = e.keycode || e.which;
		var $currMenuList = $(this).parents('.depth_1 > li'); 
		
		if(e.shiftKey && keycode == 9) {
			closeGnbMenu($currMenuList);
		}
	}
})();



/* LNB Menu Link control */
(function(){
	var $lnbMenuName = $('[class^="lnb_menu"] > span');
	var $lnbMenuList = $('[class^="lnb_menu"] ul');
	var $lnbMenuAnchors = $('[class^="lnb_menu"] ul a');
	var $lnbMenuLastAnchor = $('[class^="lnb_menu"] ul li:last-child > a');
	var $lnbFirstMenuName = $('[class^="lnb_menu"]:first-of-type > span');
	// SNS Control
	var $lnbShareButton = $('.lnb .sns_share');
	var $lnbShareButtonPrevElement = $lnbShareButton.prev();
	var $lnbShareButtonNextElement = $lnbShareButton.next();
	
	$lnbMenuName.on('mouseover', lnbMouseOverHandler);
	$lnbMenuName.on('mouseout', lnbMouseOutHandler);
	$lnbMenuName.on('focus', lnbFocusHandler);
	$lnbMenuAnchors.on('click', lnbMenuClickHandler);
	$lnbMenuLastAnchor.on('keydown', lnbLastMenuHandler);
	$lnbFirstMenuName.on('keydown', lnbFirstMenuNameHandler);

	// SNS UI Events
	$lnbShareButton.on('focus', function(){
		$(this).children('ul').show();
	});
	$lnbShareButtonPrevElement.on('focus', function(){
		$lnbShareButton.children('ul').hide();
	});
	$lnbShareButtonNextElement.on('focus', function(){
		$lnbShareButton.children('ul').hide();
	});

	// LNB Control functions
	function openLnbMenu($target) {
		$lnbMenuList.removeClass('active');
		$target.siblings('ul').addClass('active');
	}
	
	function closeLnbMenu() {
		$lnbMenuList.removeClass('active');
	}
	
	function lnbMouseOverHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		
		openLnbMenu( $(this) );
	}
	
	function lnbMouseOutHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		
		closeLnbMenu();
	}
	
	function lnbFocusHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		
		openLnbMenu( $(this) );
	}
	
	function lnbLastMenuHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		var keycode = e.keycode || e.which;
		
		if(!e.shiftKey  && keycode == 9) {
			closeLnbMenu();
		} 
	}
	
	function lnbFirstMenuNameHandler(e) {
		e = e || window.event;
		e.stopPropagation();
		var keycode = e.keycode || e.which;
		
		if(e.shiftKey  && keycode == 9) {
			closeLnbMenu();
		} 
	}
	
	function lnbMenuClickHandler(e) {
		e.stopPropagation();
		var anchorText = $(this).text();
		
		closeLnbMenu();
		$(this).parents('ul').siblings('span').text(anchorText);
	}

	

})();


/* Tabs */
(function(){
	var $tabContainer = $('.tabContainer');
	
	$tabContainer.on('click', '.tabButton', tabsClickEvent);
	$tabContainer.on('keydown', '.tabList', tabsKeyEvent);
	
	function tabsClickEvent(e) {
		e = e || window.event;
		e.stopPropagation();
		var currTab = e.currentTarget;
		
		activateTab(currTab);
		activateTabPanel(currTab);
	}
	
	function activateTab(tab) {
		if(!tab) return;
		$(tab)
			.addClass('active')
			.attr({
				'tabindex': '0',
				'aria-selected': 'true'
			})
			.focus()
			.siblings()
				.removeClass('active')
				.attr({
					'tabindex': '-1',
					'aria-selected': 'false'
				})
	}
	
	function activateTabPanel(tab) {
		if(!tab) return;
		
		$('#' + tab.getAttribute('aria-controls'))
			.attr({
				'tabindex': '0'
			})
			.prop({
				'hidden': false
			})
			.addClass('active')
			.siblings('.tabPanel')
				.attr({
					'tabindex': '-1'
				})
				.prop({
					'hidden': true
				})
				.removeClass('active')
	}
	
	function tabsKeyEvent(e) {
		e = e || window.event;
		event.stopPropagation();
		
		var keycode = e.keyCode || e.which;				
		
		switch(keycode) {
			case 37: //left arrow
				if(e.target.previousElementSibling) {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.prev()
							.attr({
								'tabindex': '0'
							})
							.focus()
				} else {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.siblings(':last')
							.attr({
								'tabindex': '0'
							})
							.focus()
				}
				break;
				
			case 39: //right arrow
				if(e.target.nextElementSibling) {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.next()
							.attr({
								'tabindex': '0'
							})
							.focus()
				} else {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.siblings(':first')
							.attr({
								'tabindex': '0'
							})
							.focus()
				}
				break;
			case 32: // spacebar
			case 13: // enter
				e.preventDefault();
				activateTab(e.target);
				activateTabPanel(e.target);
				break;
		}
	}	
})();



/* Accordion - QnA*/
(function(){
	var $AcdnButtons = $('.acdnButton');

	function openAccordionPanel($acdnButton) {
		$acdnButton
			.addClass('active')
			.attr({
				'aria-label': '메뉴 닫기'
			});
		$acdnButton.siblings('.acdnPanel').slideDown(300);
	}

	function closeAccordionPanel($acdnButton) {
		$acdnButton
			.removeClass('active')
			.attr({
				'aria-label': '메뉴 열기'
			});
		$acdnButton.siblings('.acdnPanel').slideUp(300);
	}

	$AcdnButtons.on('click', function(e){
		e = e || window.event;
		e.stopPropagation();
		var $currTarget = $(e.currentTarget); 
	
		if( $currTarget.hasClass('active') ) {
			closeAccordionPanel($currTarget);
		} else {
			openAccordionPanel($currTarget);
		}
	});
})();




/* Input:text only Number */
(function(){
	$('.onlyNum').on('input', inputOnlyNumber);
	function inputOnlyNumber(){
		$(this).val( $(this).val().replace(/\D/g,''));
	}
})();


/* Remodal Popup */
(function(){
	$('.remodal').remodal({ hashTracking: false });
})();
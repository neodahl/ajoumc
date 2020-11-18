/* App Header Controls */
(function() {
	/* Header offcanvas Scrolling */
	var headerHeight = $('.appHeader').outerHeight();
	var presentTop = 0;
	var lastScrollPosition = 0;
	var bodyHeight = $('body').outerHeight();
	var windowHeight = $(window).height();
	
	
	$(window).on('scroll', scrolling);
	

	function scrolling(){
		var bottomBouncingDelta = bodyHeight - (windowHeight + presentTop);
		presentTop = $(this).scrollTop();

		if (presentTop < headerHeight + 20) {
			// close to top
			$('.appHeader').removeClass('offCanvas');	

		} else if(bottomBouncingDelta < 80) {
			//prevent ios bottom border bouncing 
			$('.appHeader').addClass('offCanvas');
							
		} else if(presentTop > lastScrollPosition) {
			//scroll down, header hide
			$('.appHeader').addClass('offCanvas');
			lastScrollPosition = presentTop - 10;

		} else {
			// else, show header
			$('.appHeader').removeClass('offCanvas');
			lastScrollPosition = presentTop + 10;
		}
		
	}
	
	// App Nav Show and Hide
	var $navWrapper = $('.navWrapper');
	var $navMenuContainer = $('.navMenuContainer');
	var $btnNavClose = $('.btnNavClose');
	var navOpenTL = new TimelineMax();
	
	navOpenTL.pause();
	navOpenTL
		.to($navWrapper, 0, {left: 0})
		.to($navWrapper, 0.3, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, 'sync')
		.to($btnNavClose, 0.3, {opacity: 1}, 'sync')
		.to($navMenuContainer, 0.3, {left: 0}, 'sync')

	$('.btnNavOpen').on('click', function(){
		navOpenTL.restart();
	});
	$('.btnNavClose').on('click', function(){
			navOpenTL.reverse();
	});

	
	// App Menu Click Handle
	$('.navMenu').on('click', 'a', clickMenuEvent);
	
	function clickMenuEvent(e) {
		e = e || window.e;
		e.stopPropagation();
		
		var $siblingMenus = $(this).parent().siblings().children('a');
		var $parentSiblingMenus = $($(this).parents('li')[1]).siblings().children('a');
		var $nextDepthContainer = $(this).siblings('ul')
		var $currDepthContainer = $(this).parents('ul')[0];
		var $prevMenu = $($currDepthContainer).siblings('a');
		
		if( $(this).hasClass('hasMenu') ) { //하위 depth 있을때
			e.preventDefault();
			TweenMax.to($nextDepthContainer, 0.3, {left: 0});
			TweenMax.to($(this), 0.5, {
				backgroundColor: '#000',
				opacity: '0',
				zIndex: '-1'
			});
			TweenMax.to($siblingMenus, 0.5, {
				backgroundColor: '#000',
				opacity: '0',
				zIndex: '-1'
			});
		} else if( $(this).hasClass('prevMenu') ) { // 뒤로가기 버튼
			e.preventDefault();
			TweenMax.to( $currDepthContainer, 0.3, {left: '100%'} );
			TweenMax.to( $parentSiblingMenus, 0.5, {
				backgroundColor: '#fff',
				opacity: '1',
				zIndex: '1'
			});
			TweenMax.to($prevMenu, 0.5, {
				backgroundColor: '#fff',
				opacity: '1',
				zIndex: '1'
			});
		} else {
			return;
		}
		
	}
})();



/* Tabs */
(function(){
	var $tabContainer = $('.tabContainer');
	var $tabList = $('.tabList');
	var numberOfButtons = $('.tabButton:last').index()+1;
	var tabListWidth = $('.tabButton').outerWidth() * numberOfButtons;
	var scrollLeftDelta = (tabListWidth - $tabContainer.outerWidth()) / (numberOfButtons-1); // 이동하는 갯수는 탭의 갯수보다 하나 적다.
	var activatedTab = $('.tabButton.active').index();
	
	// 탭 버튼 기능 사용하지 않을시 (snake_case 사용시)
	if($tabContainer.length == 0) {
		$tabContainer = $('.tab_container');
		$tabList = $('.tab_list');
		numberOfButtons = $('.tab_button:last').index()+1;
		tabListWidth = $('.tab_button').outerWidth() * numberOfButtons;
		scrollLeftDelta = (tabListWidth - $tabContainer.outerWidth()) / (numberOfButtons-1);
		activatedTab = $('.tab_button.active').index();
	}
	
	$tabList.animate( { scrollLeft: activatedTab*scrollLeftDelta }, 100); //초기 위치 설정
	
	
	if(!$tabContainer) return;
	
	$tabContainer.on('click', '.tabButton', tabClickEvent);
	
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
				});
		
		var scrollAmount = $(tab).index()*scrollLeftDelta;
		$tabList.animate( { scrollLeft: scrollAmount }, 200);
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
	
	function tabClickEvent(e) {
		e = e || window.event;
		e.stopPropagation();
		var currTab = e.currentTarget;
		
		activateTab(currTab);
		activateTabPanel(currTab);
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





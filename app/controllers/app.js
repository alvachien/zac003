/* global $ */
/* global angular */
(function() {
	"use strict";	
	
	angular.module('hihApp', ["ui.router", "ngAnimate", "hihApp.Login", "hihApp.Utility", 'hihApp.Learn', 'ui.bootstrap', 'ngSanitize', 
		'hihApp.Finance', 'pascalprecht.translate', 'ngJsTree', 'ngTouch', 'selectize', 'chart.js'])
		.run(['$rootScope', '$state', '$stateParams', '$modal', '$timeout', '$log', function ($rootScope,   $state,   $stateParams, $modal, $timeout, $log) {
			 $rootScope.$state = $state;
			 $rootScope.$stateParams = $stateParams;
			    
			 $rootScope.$on('$stateChangeStart', 
		    		function(event, toState, toParams, fromState, fromParams) {
		    			console.log('HIH: state change start, target url is ' + toState.url + "; state is " + toState.name);
		    			
		    			if (toState.name === 'login' || toState.name === 'register') {
		    				if (angular.isDefined($rootScope.isLogin) && $rootScope.isLogin) {
		    					console.log('HIH: state change failed: already login but ask for login page, redirect to home page...');
		    					event.preventDefault();
		    					$state.go("home.welcome");
		    				} 
		    				return;
		    			}  
		    			
		    			if (angular.isDefined($rootScope.isLogin) && $rootScope.isLogin) {
		    				return;
		    			}

		    			console.log('HIH: state change failed: not login, redirect to login page...');
	    		    	event.preventDefault();
	    		    	$state.go("login");
			    	}
			    );
			}
		])

	.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $translateProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        .when('/welcome', '/home')
        .when('/about', '/home/about')
        .when('/userdetail', '/home/userdetail')
        .when('/learn', '/home/learn')
        .when('/learnobject', '/home/learn/object')
        .when('/learnhistory', '/home/learn/history')
        .when('/learnaward', '/home/learn/award')
        .when('/finance', '/home/finance')
		.when('/financeaccount', '/home/finance/account')
		.when('/financedocument', '/home/finance/document')
		.when('/financereport', '/home/finance/report')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/home');

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider
	      
        .state("home", {
        	url: "/home",
        	abstract: true,
        	templateUrl: 'app/views/home.html',
        	controller: 'HomeController',
        	data: {
        		rule: function($rootScope) {
        			if (!angular.isDefined($rootScope.isLogin)) return false;
        		
        			return $rootScope.isLogin;
        		}  
        	},
          
        	onEnter: function($rootScope) {
        		console.log('HIH Home: Entering page!');
        	}
        })        
        .state('home.welcome', {
        	url: '',
        	templateUrl: 'app/views/welcome.html'
        })
		.state('home.userlist', {
        	url: '/userlist',
        	templateUrl: 'app/views/userlist.html',
			controller: 'UserListController'
		})
        .state('home.userdetail', {
        	url: '/userdetail',
        	templateUrl: 'app/views/userdetail.html'
        })
        .state('home.about', {
          url: '/about',
          templateUrl: 'app/views/about.html',
          controller: 'AboutController'
        });
		
		// Translate configurations
		$translateProvider.useStaticFilesLoader({
		    files: [{
		        prefix: 'locales/',
		        suffix: '.json'
		    }]
		});
		// Enable escaping of HTML
  		$translateProvider.useSanitizeValueStrategy('escaped');		
		$translateProvider.registerAvailableLanguageKeys(['en', 'zh'], {
		    'en_US': 'en',
		    'en_UK': 'en',
		    'zh_CN': 'zh',
			'zh-CN': 'zh'
		  })
		  .determinePreferredLanguage()
		  //.preferredLanguage('en')
		  .fallbackLanguage('en');		
	}])
	
	.controller('MainController', ['$scope', '$rootScope', '$log', '$translate', 'utils', function($scope, $rootScope, $log, $translate, utils) {
		$scope.currentTheme = "readable"; // Default theme: lumen
		
		var arCSS = utils.getThemeCSSPath($scope.currentTheme);
		$scope.bootstrapcss = arCSS[0];
		$scope.bootstrap_defaultcss = arCSS[1];
		
		$scope.$on('ThemeChange', function (oEvent, newtheme) {
			$log.info('HIH: Theme has changed!');
			
			if ($scope.currentTheme !== newtheme) {
				$scope.currentTheme = newtheme;
				
				var arCSS = utils.getThemeCSSPath($scope.currentTheme);
				$scope.bootstrapcss = arCSS[0];
				$scope.bootstrap_defaultcss = arCSS[1];
			}
		});
		
		$scope.$on('ShowMessage', function (oEvent, msgHeader, msgDetail, msgType, conf_func) {
			console.log('HIH: ShowMessage event occurred');
			
			if (conf_func && angular.isFunction(conf_func)) {
				window.swal({ title: msgHeader,   
					text: msgDetail,   
					type: msgType || "warning", 
					showCancelButton: true, 
					confirmButtonColor: "#DD6B55", 
					confirmButtonText: "Yes, delete it!", 
					closeOnConfirm: true }, 
					conf_func
					// function() { 
					// 	window.swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
					// }
					);
			} else {
				window.swal(msgHeader, msgDetail, msgType || "error");
			}
		});
		
		$scope.$on('ShowMessageNeedTranslate', function (oEvent, msgHeaderStr, msgDetailStr, msgType, conf_func) {
			console.log('HIH: ShowMessage event occurred');
			
			$translate([msgHeaderStr, msgDetailStr]).then(function (translations) {
				var hdr = translations[msgHeaderStr];
				var dtal = translations[msgDetailStr];

				if (conf_func && angular.isFunction(conf_func)) {
					window.swal({ title: hdr,   
								text: dtal,   
								type: msgType || "warning", 
								showCancelButton: true, 
								confirmButtonColor: "#DD6B55", 
								confirmButtonText: "Yes, delete it!", 
								closeOnConfirm: true }, 
								conf_func
					);
				} else {
					window.swal(hdr, dtal, msgType || "error");
				}
			});
		});
	}])
	
	.controller('HomeController', ['$scope', '$rootScope', '$state', '$http', '$log', '$translate', 'utils', 
		function($scope, $rootScope, $state, $http, $log, $translate, utils) {		
		$scope.CurrentUser = $rootScope.CurrentUser;
		
		// Load the finance setting out
		utils.loadFinanceSettingQ()
			.then(function(response) {
				// Do nothing here~~~
			}, function(reason) {
				$rootScope.$broadcast("ShowMessage", "Error", reason);
			});
		utils.loadFinanceExchangeRateInfoQ()
			.then(function(response) {
				// Do nothing here~~~
			}, function(reason) {
				$rootScope.$broadcast("ShowMessage", "Error", reason);
			});
		
		$scope.displayedCollection = [
			{userobj: 'ID', 		usercont: $scope.CurrentUser.userid},
			{userobj: 'Display As', usercont: $scope.CurrentUser.userdisplayas},
			{userobj: 'Gender',		usercont: utils.genderFormatter($scope.CurrentUser.usergender)},
			{userobj: 'Created On', usercont: $scope.CurrentUser.usercreatedon}
			];
		
		$scope.logout = function() {
			$log.info("HIH: Logout triggerd!");
			utils.sendRequest( { objecttype: 'USERLOGOUT' }, function (data, status, headers, config) {
				
				// Clear the current user information
				$rootScope.isLogin = false;
				$rootScope.CurrentUser = {};
				$scope.CurrentUser = {};
				
				for(var prop in $rootScope) {
				    if($rootScope.hasOwnProperty(prop))
						delete $rootScope[prop];
				}
				
				// Redirect to login page
				$state.go('login');
			}, function(data, status, headers, config) {
				// Throw out error message				
				$rootScope.$broadcast('ShowMessage', 'Error', 'Failed to logout!');
			});
		};
		
		$scope.setTheme = function(theme) {
			$log.info("HIH: Theme change triggerd!");

			var realtheme = "";			
			if (theme && theme.length > 0) {
				// Now replace the CSS
				realtheme = theme;
			} else {
				// Go for default theme
				realtheme = "default";
			}			
			$rootScope.$broadcast('ThemeChange', realtheme);
		};
		
		$scope.setLanguage = function(newLang) {
			$log.info("HIH: Language change triggerd!");
			$translate.use(newLang);
			
		  	// if (newLang === "zh") {
			// 	i18nService.setCurrentLang('zh-CN');					  
			// } else {
			// 	i18nService.setCurrentLang('en');
			// }
		};
	}])

	.controller('UserListController', ['$scope', '$rootScope', '$state', '$http', '$log', 'utils', function($scope, $rootScope, $state, $http, $log, utils) {
		utils.loadUserListQ()
			.then(function(response) {
				// Do nothing
			}, function(reason) {
				$rootScope.$broadcast('ShowMessage', 'Error', reason);
			});
	}])
	
	.controller('MessageBoxController', ['$scope', '$rootScope','$modalInstance', function($scope, $rootScope, $modalInstance) {
		$scope.MessageHeader = $rootScope.MessageHeader;
		$scope.MessageDetail = $rootScope.MessageDetail;
		
		$scope.ok = function () {
		    $modalInstance.close();
		  };
        $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		  
//		$scope.$on("ShowMessage",function (oEvent, msgHeader, msgDetail) {
//			console.log('HIH MessageBox Controller: ShowMessage event occurred');
//			$scope.MessageHeader = msgHeader;
//			$scope.MessageDetail = msgDetail;
//
//			var modalInstance = $modal.open({
//			      animation: true,
//			      templateUrl: 'hihMessageDialog.html',
//			      resolve: {
//			          msgHeader: $scope.msgHeader,
//			          msgDetail: $scope.msgDetail			          
//			        }
//		      });
//		
//			modalInstance.result.then(function () {
//		      //$scope.selected = selectedItem;
//		    }, function () {
//		      $log.info('HIH: Message dialog dismissed at: ' + new Date());
//		    });			
//			
//			$('#dlgMessage').modal('hide');
//			var dlg = $('#dlgMessage');
//			if (dlg)
//				dlg.modal('show');
//		});
	}])	
	
	.controller('AboutController', ['$scope', '$rootScope', function($scope, $rootScope) {
		$scope.myInterval = 5000;
		
		var slides = $scope.slides = [];
		$scope.addSlide = function(url, infotxt) {
		    slides.push({
		    	image: url,
		    	text: infotxt
		    });
		 };
		 
		//$scope.addSlide('app/img/Duoduo2013.jpg', 'Duoduo @ 2013');
		//$scope.addSlide('app/img/JiaotongUniversity.jpg', 'Jiaotong University');
		//$scope.addSlide('app/img/LD.jpg', 'LD @ 2013');
		//$scope.addSlide('app/img/SpeedOfShanghai.jpg', 'Speed of Shanghai');
		//$scope.addSlide('app/img/TheAutumn.jpg', 'The Autumn');
	}])
	;
})();

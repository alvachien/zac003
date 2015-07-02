(function() {
	"use strict";

	angular
			.module('hihApp.Utility', [])

			.factory(
					'utils',
					function($rootScope, $http) {
						
						var rtnObj = {};
						
						rtnObj.findById = function (a, id) {
							for (var i = 0; i < a.length; i++) {
								if (a[i].id == id)
									return a[i];
							}
							return null;
						};
						rtnObj.newRandomKey = function (coll, key, currentKey) {
							var randKey;
							do {
								randKey = coll[Math.floor(coll.length
										* Math.random())][key];
							} while (randKey == currentKey);
							return randKey;
						};
						
						rtnObj.genderFormatter = function(gender) {
							var nGen = parseInt(gender);
							if (nGen === 1) return "Male";
							return "Female";
						};
						rtnObj.dateformatter = function (date) {
							var y = date.getFullYear();
							var m = date.getMonth() + 1;
							var d = date.getDate();
							return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
						};
						rtnObj.datefromdbtoui = function (s) {
//							var dt1 = new Date();
//							if (!s) {}
//							else 
//							{
//								var ss = (s.split('-'));
//								var y = parseInt(ss[0], 10);
//								var m = parseInt(ss[1], 10);
//								var d = parseInt(ss[2], 10);
//								if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
//									dt1 = new Date(y, m - 1, d);
//								} else {
//									dt1 =  new Date();
//								}									
//							}
//							
//							return this.dateformatter(dt1);
						};
						
						rtnObj.dateparser = function(s) {
							if (!s)
								return new Date();
							var ss = (s.split('-'));
							var y = parseInt(ss[0], 10);
							var m = parseInt(ss[1], 10);
							var d = parseInt(ss[2], 10);
							if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
								return new Date(y, m - 1, d);
							} else {
								return new Date();
							}
						};
						
						// User part
						rtnObj.loadUserList = function () {
							if (!$rootScope.isUserListLoad) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETUSERLIST'
												})
										.success(
												function(data, status,
														headers, config) {
													$rootScope.arUserList = data;
													$rootScope.isUserListLoad = true;

													$rootScope
															.$broadcast("UserListLoaded");
												})
										.error(
												function(data, status,
														headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}
							
						};
						
////////////////////////////////////////////////////////////////////						
// Learn part
////////////////////////////////////////////////////////////////////						
						rtnObj.loadLearnObjects = function () {
							if (!$rootScope.isLearnObjectLoad) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETLEARNOBJECTLIST'
												})
										.success(
												function(data, status,
														headers, config) {
													$rootScope.arLearnObject = data;
													$rootScope.isLearnObjectLoad = true;

													$rootScope
															.$broadcast("LearnObjectLoaded");
												})												
											.error(
												function(data, status,
														headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}
						};
						rtnObj.loadLearnHistories = function () {
							if (!$rootScope.isLearnHistoryLoaded) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETLEARNHISTORYLIST'
												})
										.success(
												function(data, status,
														headers, config) {
													$rootScope.arLearnHistory = data;
													$rootScope.isLearnHistoryLoaded = true;

													$rootScope
															.$broadcast("LearnHistoryLoaded");
												}).error(
												function(data, status,
														headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}
						};
						rtnObj.loadLearnAwards = function () {
							if (!$rootScope.isLearnAwardLoaded) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETLEARNAWARDLIST'
												})
										.success(
												function(data, status,
														headers, config) {
													$rootScope.arLearnAward = data;
													$rootScope.isLearnAwardLoaded = true;

													$rootScope
															.$broadcast("LearnAwardLoaded");
												})
										.error(
												function(data, status,
														headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}
						};
						rtnObj.loadLearnCategories = function () {
							if (!$rootScope.isLearnCategoryLoaded) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETLEARNCATEGORYLIST'
												})
										.success(
												function(data, status, headers, config) {
													$rootScope.arLearnCategory = data;
													$rootScope.isLearnCategoryLoaded = true;

													$rootScope.$broadcast("LearnCategoryLoaded");
												})
										 .error(
												function(data, status, headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}
						};

////////////////////////////////////////////////////////////////////
// Finance part
////////////////////////////////////////////////////////////////////
						rtnObj.loadFinanceAccounts = function() {
							if (!$rootScope.isFinanceAccountLoaded) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETFINANCEACCOUNTLIST'
												})
										.success(
												function(data, status, headers, config) {
													$rootScope.arFinanceAccount = data;
													$rootScope.isFinanceAccountLoaded = true;

													$rootScope.$broadcast("FinanceAccountLoaded");
												})
										 .error(
												function(data, status, headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}							
						};
						rtnObj.loadFinanceAccountCategories = function() {
							if (!$rootScope.isFinanceAccountCategoryLoaded) {
								$http
										.post(
												'script/hihsrv.php',
												{
													objecttype : 'GETFINANCEACCOUNTCATEGORYLIST'
												})
										.success(
												function(data, status, headers, config) {
													$rootScope.arFinanceAccountCategory = data;
													$rootScope.isFinanceAccountCategoryLoaded = true;

													$rootScope.$broadcast("FinanceAccountCategoryLoaded");
												})
										 .error(
												function(data, status, headers, config) {
													// called asynchronously if an error occurs or server returns response with an error status.
													$rootScope.$broadcast(
															"ShowMessage",
															"Error",
															data.Message);
												});
							}							
						};
						
////////////////////////////////////////////////////////////////////
// Others
////////////////////////////////////////////////////////////////////
						
						// Util for communicate with backend
						rtnObj.sendRequest = function (reqData, funcSucc, funcErr) {
							$http.post('script/hihsrv.php', reqData)
									.success(
											function(data, status, headers,
													config) {
												funcSucc(data, status,
														headers, config);
											})
									.error(
											function(data, status, headers,
													config) {
												funcErr(data, status,
														headers, config);
											});
						};

						return rtnObj;
					});
})();
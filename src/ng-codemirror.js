var $ngCodeMirror = function (CodeMirror) {
	angular
		.module('ngCodemirror', [])

		.factory('CodeMirror', function () {
			return CodeMirror;
		})

		.directive('ngCodemirror', ['CodeMirror', function (CodeMirror) {
			return {
				require: '?ngModel',
				restrict: 'AE',
				link: function (scope, element, attrs, ngModel) {
					var codeMirrorOptions = (attrs.ngCodemirror || attrs.ngCodemirrorOptions),
					defaults = Object.keys(CodeMirror.defaults),
					options = typeof (codeMirrorOptions) != 'object' ? scope.$eval(codeMirrorOptions) : (codeMirrorOptions),
					codemirror;

					options = angular.extend({ value: element.text }, options);

					if(element[0].tagName === 'TEXTAREA') {
						codemirror = CodeMirror.fromTextArea(element[0], options);
					} else {
						element.html('');

						codemirror = new CodeMirror (function (cmEl) {
							element.append(cmEl);
						}, options);
					};

					scope.$watchCollection(codeMirrorOptions, function (newAttrs, oldAttrs) {
						defaults.forEach(function (key) {
							if(oldAttrs && newAttrs[key] != oldAttrs[key]) {
								codemirror.setOption(key, newAttrs[key]);
								
								if(key === 'lineNumbers') {
									codemirror.refresh();
								}
							}
						});
					}, true);				

					if(attrs.refresh) {
						scope.$watch(attrs.refresh, function (newVal, oldVal) {
							if(newVal !== oldVal) {
								codemirror.refresh();
							}
						});
					}

					if(ngModel) {
						ngModel.$render = function () {
							var value = ngModel.$viewValue || '';

							codemirror.setValue(value);
						};

						codemirror.on('change', function (instance) {
							var value = instance.getValue();

							if(ngModel.$viewValue !== value) {
								scope.$apply(function () {
									ngModel.$setViewValue(value);
								});
							}
						});
					}
				}
			};
		}]);
};

if(!define) var define = undefined;

(function (define, angular, window, $ngCodeMirror) {
	if(!angular) {
		throw new Error ('You should import angular before using this module.');
	}

	if(window.hasOwnProperty('CodeMirror')) {
		return $ngCodeMirror(window.CodeMirror);
	}

	if(define) {
		var NGCODEMIRROR = !window.NGCODEMIRROR ? 'cm/lib/codemirror' : window.NGCODEMIRROR;

		define([NGCODEMIRROR], function (CodeMirror) {
			$ngCodeMirror(CodeMirror);
		});
	}
})(define, angular, window, $ngCodeMirror);
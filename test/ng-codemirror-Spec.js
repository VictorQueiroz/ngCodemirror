describe('ngCodeMirror', function () {
	var CodeMirror, $compile, $rootScope, element, scope;

	/**
	 * https://github.com/angular-ui/ui-codemirror/issues/47
	 */
	var phantom = /PhantomJS/.test(navigator.userAgent);

	beforeEach(module('ngCodemirror'));

	beforeEach(inject(function ($injector) {
		CodeMirror = $injector.get('CodeMirror');
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');

		scope = $rootScope.$new();
	}));

	describe('directives:', function () {
		describe('ngCodemirror directive', function () {
			beforeEach(function () {
				if(phantom) return;

				element = angular.element('<textarea ng-codemirror ng-model="code"></textarea>');
				element = $compile(element)(scope);
			});

			it('should give a valid CodeMirror instance', function () {
				expect(typeof CodeMirror.defaults).toBe('object');
				expect(typeof CodeMirror.fromTextArea).toBe('function');
				expect(CodeMirror).toBeDefined();
			});

			it('should compile the directive', function () {
				if(phantom) return;

				expect(element[0].tagName).toBe('TEXTAREA')
			});
		});
	});
});
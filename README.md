# ngCodeMirror

## Description
Allows you to integrate AngularJS and Codemirror with compatibility for RequireJS 2.x.

## Installation
```sh
bower install ng-codemirror
```

## Integration
```js
var $module = angular.module('app', ['ngCodemirror']);
```

```html
<div class="col-lg-12">
	<div ng-codemirror="{ mode: 'text/javascript', lineNumbers: true }"></div>
</div>
```
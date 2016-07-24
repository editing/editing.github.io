/* global $,monaco:monaco,require:require */

var resolver;

/** @type {monaco} */
var monacoInstance = monaco;
require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var requireMonaco = require(['vs/editor/editor.main'], function () {
	monacoInstance = monaco;
	if (resolver)
		resolver(monaco);
});

/** @type {Promise<monaco>} */
var PromiseMonaco = new Promise((resolve) => {
	resolver = resolve;
	if (monacoInstance)
		resolve(monaco);
});

/* exported */
function Body($scope) {
	function Cloudant(method,path) {
		return $.get({
			method:method,
			headers: { Authorization : "Basic " + btoa($scope.user + ":" + $scope.pass) },
			url: "https://" + $scope.domain + ".cloudant.com" + encodeURI(path)
		});
	}

	$scope.login = function () {
		Cloudant("GET", "/_users/_all_docs?startkey=\"_design/\"&endkey=\"_design/\uFFFF\"").then((data, status) => {
			$scope.status = status;
			$scope.$apply();

			return data;
		}, (req, status, err) => {
			console.error(err);
			$scope.status = status;
			$scope.$apply();
		}).then((data) => {
			PromiseMonaco.then((monaco) => {
				monaco.editor.create(document.getElementById('container'), {
					language: 'json',
					value: JSON.stringify(data)
				});
			});
		});
	};
}
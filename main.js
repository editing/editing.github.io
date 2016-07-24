/* global $,monaco,require */

require.config({ paths: { 'vs': 'monaco-editor/min/vs' } });
var monacoInstance;
var PromiseMonaco = new Promise((resolve) => {
	if (monacoInstance)
		return resolve(monacoInstance);

	return require(['vs/editor/editor.main'], function () {
		monacoInstance = monaco;
		resolve(monacoInstance);
	});
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
					value: data
				});
			});
		});
	};
}
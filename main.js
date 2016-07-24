/* global $,monaco:monaco,require:require */

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var PromiseMonaco = new Promise((resolve) => {
	require(['vs/editor/editor.main'], function () {
		resolve();
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

	/** @type {monaco.editor.IStandaloneCodeEditor} */
	var editor;
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
			if (!editor)
			{
				editor = monaco.editor.create(document.getElementById('container'), { language: 'json' });
				editor.getModel().detectIndentation(false,4);
			}

			return PromiseMonaco.then(data);
		}, (err) => console.error(err)).then((data) => {
			editor.setValue(JSON.stringify(data));
		});
	};
}
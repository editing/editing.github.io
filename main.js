/* global $,angular,require,monaco */

require.config({ paths: { 'vs': 'monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {

	angular.module("app", ["ngMaterial"]).controller("body", ($scope) => {
		function Cloudant(method, path) {
			return $.ajax({
				method: method,
				url: "https://" + $scope.user + ":" + $scope.pass + "@" + $scope.domain + ".cloudant.com" + path
			});
		}

		$scope.login = function () {
			Cloudant("GET", "/_users/_all_docs?startkey='_design/'&endkey='_design/\uFFFF'").then((data, status) => {
				$scope.status = status;
				$scope.$apply();

				var editor = monaco.editor.create(document.getElementById('container'), {
					language: 'json',
					value: data
				});
			}, (req, status, err) => {
				console.error(err);
				$scope.status = status;
				$scope.$apply();
			});
		};
	});

});
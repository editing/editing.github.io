/* global $,monaco */

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
}
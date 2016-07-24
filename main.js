/* global $,monaco */

/* exported */
function Body($scope) {
	function GetCloudant(path) {
		return $.get({
			headers: { Authorization : "Basic " + btoa($scope.user + ":" + $scope.pass) },
			url: "https://" + $scope.domain + ".cloudant.com" + encodeURIComponent(path)
		});
	}

	$scope.login = function () {
		GetCloudant("GET", "/_users/_all_docs?startkey='_design/'&endkey='_design/\uFFFF'").then((data, status) => {
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
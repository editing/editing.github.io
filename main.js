/* global $,monaco:monaco,require:require */

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var PromiseMonaco = new Promise((resolve) => {
	require(['vs/editor/editor.main'], () => resolve());
});

var editor;

/* exported */
function Body($scope,$http,$location) {
	var code = $location.search().code;
	if(!code)
	{
		return window.location.replace("https://github.com/login/oauth/authorize?" + $.param({
			client_id:"ffd870f6f6fdfa493534",
			scope:"repo,read:org",
			redirect_uri:window.location.href
		}));
	}

	if(!sessionStorage.redirect)
		sessionStorage.redirect	= "/";

	history.pushState(null,null,sessionStorage.redirect);
	delete sessionStorage.redirect;

	var githubAccess = new Promise((resolve,reject) => {
		$http({
			method: 'GET',
			url: "https://script.google.com/macros/s/AKfycbxdNleihRMhOxJbvbNdw6iZ8k82YRzVZvU3rE5WcQSKyW3LuWu_/exec?" + $.param({code:code})
		}).then((response) => {
			resolve(response.data);
		},(response) => {
			reject(response);
		});
	}).then((result) => {
		return PromiseMonaco.then(() => result);
	},(error) => console.error(error)).then((result) => {
		if (!editor) {
			editor = monaco.editor.create(document.getElementById('container'), { language: 'json',wrappingColumn:-1 });
			editor.getModel().detectIndentation(false, 4);
		}

		editor.setValue(JSON.stringify(result,null,"\t"));
		
		$scope.credential	= result;
		return $http({
			method:"GET",
			url:"https://api.github.com/user/repos?access_token=" + $scope.credential.access_token
		});
	},(error) => console.error(error)).then((response) => {
		$scope.repos = response.data;
		$scope.$apply();
	});

	$scope.openFile = function(file){
		editor.setValue(JSON.stringify(file,null,"\t"));
	};
	
	$scope.loadBranches = function(repo){
		return $http({
			method:"GET",
			url:"https://api.github.com/repos/" + repo.full_name + "/branches?access_token=" + $scope.credential.access_token
		},(error) => console.error(error)).then((response) => {
			$scope.branches = response.data;
			return $http({
				method:"GET",
				url:"https://api.github.com/repos/" + repo.full_name + "/contents?access_token=" + $scope.credential.access_token
			});
		});
	}
	
	function InitFile(file){
		file.open = () => {
			if(file.type == "dir")
			{
				return Promise.resolve().then(() => {
					if(!file.files)
						return $http({method:"GET",url:file.url}).then((response) => {
							file.files = response.data;
							file.files.forEach((f) => InitFile(f));
						});
				}).then(() => file.opened = !file.opened);
			}
			
			if(file.type == "file")
			{
				return Promise.resolve().then(() => {
					if(!file.content)
						return $http({method:"GET",url:file.download_url}).then((response) => file.content = response.data);
				}).then(() => {
					$scope.focus = file;
					editor.setValue(file.content);
				});
			}
		};
	}
	
	$scope.loadBranch = function(branch){
		return $http({
			method:"GET",
			url:"https://api.github.com/repos/" + $scope.repo.full_name + "/branches/" + branch.name + "?access_token=" + $scope.credential.access_token
		},(error) => console.error(error)).then((response) => {
			$scope.branchData = response.data;
			return $http({
				method:"GET",
				url:"https://api.github.com/repos/" + $scope.repo.full_name + "/contents?access_token=" + $scope.credential.access_token
			});
		},(error) => console.error(error)).then((response) => {
			$scope.files = response.data;
			$scope.files.forEach((file) => InitFile(file));
		});
	}
}

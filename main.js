/* global $,monaco:monaco,require:require,firebase:firebase */

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var PromiseMonaco = new Promise((resolve) => {
	require(['vs/editor/editor.main'], () => resolve());
});

var editor;

/* exported */
function Body($scope,$http) {

	/** @type {monaco.editor.IStandaloneCodeEditor} */
	var provider = new firebase.auth.GithubAuthProvider();
	provider.addScope('read:org');
	provider.addScope('repo');

	firebase.auth().getRedirectResult().then((result) => {
		if(!result || !result.user)
			throw firebase.auth().signInWithRedirect(provider);
		
		if(sessionStorage.redirect)
		{
			history.pushState(null,null,sessionStorage.redirect);
			delete sessionStorage.redirect;
		}
		
		return PromiseMonaco.then(() => result);
	},(error) => {
		console.error(error);
		signInWithRedirect(provider);
	}).then((result) => {
		if (!editor) {
			editor = monaco.editor.create(document.getElementById('container'), { language: 'json',wrappingColumn:-1 });
			editor.getModel().detectIndentation(false, 4);
		}

		editor.setValue(JSON.stringify(result,null,"\t"));
		
		$scope.credential	= result.credential;
		return $http({
			method:"GET",
			url:"https://api.github.com/user/repos?access_token=" + result.credential.accessToken
		});
	},(error) => console.error(error)).then((response) => {
		$scope.repos = response.data;
		$scope.$apply();		
	});
}

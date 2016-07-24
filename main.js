/* global monaco:monaco,require:require,firebase:firebase */

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var PromiseMonaco = new Promise((resolve) => {
	require(['vs/editor/editor.main'], () => resolve());
});

/* exported */
function Body($scope) {

	/** @type {monaco.editor.IStandaloneCodeEditor} */
	var editor;
	$scope.login = function () {
		var provider = new firebase.auth.GithubAuthProvider();
		firebase.auth().signInWithPopup(provider).then((result) => {
			return PromiseMonaco.then(() => result);
		}, (err) => console.error(err)).then((result) => {
			if (!editor) {
				editor = monaco.editor.create(document.getElementById('container'), { language: 'json' });
				editor.getModel().detectIndentation(false, 4);
			}

			editor.setValue(JSON.stringify(result,null,"\t"));
		});
	};
}
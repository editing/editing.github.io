/* global monaco:monaco,require:require,firebase:firebase */

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });
var PromiseMonaco = new Promise((resolve) => {
	require(['vs/editor/editor.main'], () => resolve());
});

var editor;

/* exported */
function Body($scope) {

	/** @type {monaco.editor.IStandaloneCodeEditor} */
	var provider = new firebase.auth.GithubAuthProvider();
	firebase.auth().getRedirectResult().then((credential) => {
		if(!credential || !credential.user)
			signInWithRedirect(provider);
		
		return PromiseMonaco.then(() => credential);
	},(error) => {
		console.error(error);
		signInWithRedirect(provider);
	}).then((result) => {
		if (!editor) {
			editor = monaco.editor.create(document.getElementById('container'), { language: 'json' });
			editor.getModel().detectIndentation(false, 4);
		}

		editor.setValue(JSON.stringify(result,null,"\t"));
	});
}

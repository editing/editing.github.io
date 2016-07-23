/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.5.3(793ede49d53dba79d39e52205f16321278f5183c)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
(function(){var t=["exports","require","vs/languages/razor/common/razorTokenTypes","vs/languages/razor/common/vsxmlTokenTypes","vs/languages/razor/common/vsxml","vs/base/common/objects","vs/editor/common/modes/abstractMode","vs/editor/common/modes/abstractState","vs/languages/razor/common/csharpTokenization","vs/languages/html/common/html","vs/base/common/errors","vs/languages/razor/common/razor","vs/editor/common/modes","vs/platform/instantiation/common/instantiation","vs/editor/common/services/modeService","vs/editor/common/modes/languageConfigurationRegistry","vs/base/common/async","vs/editor/common/services/compatWorkerService"],e=function(e){for(var n=[],i=0,o=e.length;o>i;i++)n[i]=t[e[i]];return n};define(t[2],e([1,0]),function(t,e){"use strict";e.EMBED_CS="support.function.cshtml"}),define(t[3],e([1,0]),function(t,e){"use strict";e.TOKEN_VALUE="support.property-value.constant.other.json",e.TOKEN_KEY="support.type.property-name.json"});var n=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(t[4],e([1,0,5,10,7,3]),function(t,e,i,o,s,r){"use strict";var a='<>"=/',p="	 ",c=i.createKeywordMatcher(["summary","reference","returns","param","loc"]),u=i.createKeywordMatcher(["type","path","name","locid","filename","format","optional"]),h=i.createKeywordMatcher(a.split("")),l=function(t){function e(e,n,i){t.call(this,e),this.state=n,this.parentState=i}return n(e,t),e.prototype.getParentState=function(){return this.parentState},e.prototype.makeClone=function(){return new e(this.getMode(),s.AbstractState.safeClone(this.state),s.AbstractState.safeClone(this.parentState))},e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n)&&s.AbstractState.safeEquals(this.state,n.state)&&s.AbstractState.safeEquals(this.parentState,n.parentState):!1},e.prototype.setState=function(t){this.state=t},e.prototype.postTokenize=function(t,e){return t},e.prototype.tokenize=function(t){var e=this.state.tokenize(t);return void 0!==e.nextState&&this.setState(e.nextState),e.nextState=this,this.postTokenize(e,t)},e}(s.AbstractState);e.EmbeddedState=l;var f=function(t){function e(e,n,i){t.call(this,e,n,i)}return n(e,t),e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n):!1},e.prototype.setState=function(e){t.prototype.setState.call(this,e),this.getParentState().setVSXMLState(e)},e.prototype.postTokenize=function(t,e){return e.eos()&&(t.nextState=this.getParentState()),t},e}(l);e.VSXMLEmbeddedState=f;var y=function(t){function e(e,n,i,o){void 0===o&&(o=""),t.call(this,e),this.name=n,this.parent=i,this.whitespaceTokenType=o}return n(e,t),e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n)&&this.whitespaceTokenType===n.whitespaceTokenType&&this.name===n.name&&s.AbstractState.safeEquals(this.parent,n.parent):!1},e.prototype.tokenize=function(t){return t.setTokenRules(a,p),t.skipWhitespace().length>0?{type:this.whitespaceTokenType}:this.stateTokenize(t)},e.prototype.stateTokenize=function(t){throw o.notImplemented()},e}(s.AbstractState);e.VSXMLState=y;var g=function(t){function e(e,n){t.call(this,e,"string",n,r.TOKEN_VALUE)}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null)},e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n):!1},e.prototype.stateTokenize=function(t){for(;!t.eos();){var e=t.nextToken();if('"'===e)return{type:r.TOKEN_VALUE,nextState:this.parent}}return{type:r.TOKEN_VALUE,nextState:this.parent}},e}(y);e.VSXMLString=g;var d=function(t){function e(e,n){t.call(this,e,"expression",n,"vs")}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null)},e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n):!1},e.prototype.stateTokenize=function(t){var e=t.nextToken(),n=this.whitespaceTokenType;return">"===e?{type:"punctuation.vs",nextState:this.parent}:'"'===e?{type:r.TOKEN_VALUE,nextState:new g(this.getMode(),this)}:(c(e)?n="tag.vs":u(e)?n=r.TOKEN_KEY:h(e)&&(n="punctuation.vs"),{type:n,nextState:this})},e}(y);e.VSXMLTag=d;var S=function(t){function e(e,n){t.call(this,e,"expression",n,"vs")}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null)},e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n):!1},e.prototype.stateTokenize=function(t){var e=t.nextToken();return"<"===e?{type:"punctuation.vs",nextState:new d(this.getMode(),this)}:{type:this.whitespaceTokenType,nextState:this}},e}(y);e.VSXMLExpression=S}),define(t[8],e([1,0,5,9,4,7,6,2]),function(t,e,i,o,s,r,a,p){"use strict";var c=o.htmlTokenTypes,u="+-*%&|^~!=<>/?;:.,",h="+-*/%&|^~!=<>(){}[]\"'\\/?;:.,",l="	 ",f=function(){for(var t=[{tokenType:"punctuation.bracket.cs",open:"{",close:"}"},{tokenType:"punctuation.array.cs",open:"[",close:"]"},{tokenType:"punctuation.parenthesis.cs",open:"(",close:")"}],e=Object.create(null),n=0;n<t.length;n++){var i=t[n];e[i.open]={tokenType:i.tokenType},e[i.close]={tokenType:i.tokenType}}return{stringIsBracket:function(t){return!!e[t]},tokenTypeFromString:function(t){return e[t].tokenType}}}(),y=i.createKeywordMatcher(["abstract","as","async","await","base","bool","break","by","byte","case","catch","char","checked","class","const","continue","decimal","default","delegate","do","double","descending","explicit","event","extern","else","enum","false","finally","fixed","float","for","foreach","from","goto","group","if","implicit","in","int","interface","internal","into","is","lock","long","nameof","new","null","namespace","object","operator","out","override","orderby","params","private","protected","public","readonly","ref","return","switch","struct","sbyte","sealed","short","sizeof","stackalloc","static","string","select","this","throw","true","try","typeof","uint","ulong","unchecked","unsafe","ushort","using","var","virtual","volatile","void","when","while","where","yield","model","inject"]),g=function(t){return u.indexOf(t)>-1},d=function(t){function e(e,n,i){t.call(this,e),this.name=n,this.parent=i}return n(e,t),e.prototype.equals=function(n){if(!t.prototype.equals.call(this,n))return!1;var i=n;return n instanceof e&&this.getMode()===i.getMode()&&this.name===i.name&&(null===this.parent&&null===i.parent||null!==this.parent&&this.parent.equals(i.parent))},e.prototype.tokenize=function(t){return t.setTokenRules(h,l),t.skipWhitespace().length>0?{type:""}:this.stateTokenize(t)},e.prototype.stateTokenize=function(t){throw new Error("To be implemented")},e}(r.AbstractState);e.CSState=d;var S=function(t){function e(e,n,i){t.call(this,e,"string",n),this.isAtBeginning=!0,this.punctuation=i}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null,this.punctuation)},e.prototype.equals=function(e){return t.prototype.equals.call(this,e)&&this.punctuation===e.punctuation},e.prototype.tokenize=function(t){var e=this.isAtBeginning?1:0;for(this.isAtBeginning=!1;!t.eos();){var n=t.next();if("\\"===n)return 0===e?t.eos()?{type:"string.escape.cs"}:(t.next(),t.eos()?{type:"string.escape.cs",nextState:this.parent}:{type:"string.escape.cs"}):(t.goBack(1),{type:"string.cs"});if(n===this.punctuation)break;e+=1}return{type:"string.cs",nextState:this.parent}},e}(d),m=function(t){function e(e,n){t.call(this,e,"verbatimstring",n)}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null)},e.prototype.tokenize=function(t){for(;!t.eos();){var e=t.next();if('"'===e){if(t.eos()||'"'!==t.peek())return{type:"string.cs",nextState:this.parent};t.next()}}return{type:"string.cs"}},e}(d),v=function(t){function e(e,n,i){t.call(this,e,"number",n),this.firstDigit=i}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null,this.firstDigit)},e.prototype.tokenize=function(t){var e=this.firstDigit,n=10,i=!1,o=!1;if("0"===e&&!t.eos()){if(e=t.peek(),"x"===e)n=16;else{if("."!==e)return{type:"number.cs",nextState:this.parent};n=10}t.next()}for(;!t.eos();)if(e=t.peek(),a.isDigit(e,n))t.next();else{if(10!==n)break;if("."!==e||o||i){if("e"!==e.toLowerCase()||o){if("f"===e.toLowerCase()||"d"===e.toLowerCase()){t.next();break}break}o=!0,t.next(),t.eos()||"-"!==t.peek()||t.next()}else i=!0,t.next()}var s="number";return 16===n&&(s+=".hex"),{type:s+".cs",nextState:this.parent}},e}(d),k=function(t){function e(e,n,i){t.call(this,e,"comment",n),this.commentChar=i}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null,this.commentChar)},e.prototype.tokenize=function(t){for(;!t.eos();){var e=t.next();if("*"===e&&!t.eos()&&!t.peekWhitespace()&&t.peek()===this.commentChar)return t.next(),{type:"comment.cs",nextState:this.parent}}return{type:"comment.cs"}},e}(d);e.CSComment=k;var T=function(t){function e(e,n,i,o,r,a,p,c){t.call(this,e,"expression",n),this.level=i,this.plevel=o,this.razorMode=r,this.expression=a,this.vsState=new s.VSXMLExpression(e,null),this.firstToken=p,this.firstTokenWasKeyword=c}return n(e,t),e.prototype.setVSXMLState=function(t){this.vsState=t},e.prototype.makeClone=function(){var t=new e(this.getMode(),this.parent?this.parent.clone():null,this.level,this.plevel,this.razorMode,this.expression,this.firstToken,this.firstTokenWasKeyword);return null!==this.vsState&&t.setVSXMLState(this.vsState.clone()),t},e.prototype.equals=function(n){return t.prototype.equals.call(this,n)&&n instanceof e&&(null===this.vsState&&null===n.vsState||null!==this.vsState&&this.vsState.equals(n.vsState))},e.prototype.stateTokenize=function(t){if(a.isDigit(t.peek(),10))return this.firstToken=!1,{nextState:new v(this.getMode(),this,t.next())};var e=t.nextToken(),n=!this.firstTokenWasKeyword,i=this.level<=0&&this.plevel<=0&&t.eos()?this.parent:void 0;if(t.eos()&&(this.firstTokenWasKeyword=!1),y(e))return this.level<=0&&(this.expression=!1),this.firstToken&&(this.firstTokenWasKeyword=!0),{type:"keyword.cs"};if(this.firstToken=!1,this.razorMode&&"<"===e&&n&&!t.eos()&&/[_:!\/\w]/.test(t.peek()))return{nextState:new x(this.getMode(),this,o.States.Content)};if(this.razorMode&&this.expression&&this.level<=0&&this.plevel<=0&&!t.eos()&&(/^(\.|\[|\(|\{\w+)$/.test(t.peekToken())||(i=this.parent)),"/"===e){if(!t.eos()&&!t.peekWhitespace())switch(t.peekToken()){case"/":if(t.nextToken(),!t.eos()&&"/"===t.peekToken()){if(t.nextToken(),t.eos())return{type:"comment.vs"};if("/"!==t.peekToken())return{type:"comment.vs",nextState:new s.VSXMLEmbeddedState(this.getMode(),this.vsState,this)}}return t.advanceToEOS(),{type:"comment.cs"};case"*":return t.nextToken(),{nextState:new k(this.getMode(),this,"/")}}return{type:"punctuation.cs",nextState:i}}if("@"===e&&!t.eos())switch(t.peekToken()){case'"':return t.nextToken(),{nextState:new m(this.getMode(),this)};case"*":return t.nextToken(),{nextState:new k(this.getMode(),this,"@")}}if(/@?\w+/.test(e))return{type:"ident.cs",nextState:i};if('"'===e||"'"===e)return{nextState:new S(this.getMode(),this,e)};if(f.stringIsBracket(e)){var r={type:f.tokenTypeFromString(e),nextState:i};return this.razorMode&&("{"===e&&(this.expression=!1,this.level++,1===this.level&&(r.type=p.EMBED_CS,r.nextState=void 0)),"}"===e&&(this.level--,this.level<=0&&(r.type=p.EMBED_CS,r.nextState=this.parent)),this.expression&&("("===e&&(this.plevel++,1===this.plevel&&(r.type=p.EMBED_CS,r.nextState=void 0)),")"===e&&(this.plevel--,this.expression&&this.plevel<=0&&(r.type=p.EMBED_CS,r.nextState=this.parent)),"["===e&&(this.plevel++,r.nextState=void 0),"]"===e&&this.plevel--)),r}return g(e)?{type:"punctuation.cs",nextState:i}:this.razorMode&&this.expression&&this.plevel<=0?{type:"",nextState:this.parent}:{type:"",nextState:i}},e}(d);e.CSStatement=T;var x=function(t){function e(e,n,i){t.call(this,e,"number",n),this.state=i}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.parent?this.parent.clone():null,this.state)},e.prototype.nextName=function(t){return t.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/)},e.prototype.nextAttrValue=function(t){return t.advanceIfRegExp(/^('|').*?\1/)},e.prototype.tokenize=function(t){switch(this.state){case o.States.WithinComment:if(t.advanceUntil("-->",!1).length>0)return{type:c.COMMENT};if(t.advanceIfString("-->").length>0)return this.state=o.States.Content,{type:c.DELIM_COMMENT,nextState:this.parent};break;case o.States.WithinDoctype:if(t.advanceUntil(">",!1).length>0)return{type:c.DOCTYPE};if(t.advanceIfString(">").length>0)return this.state=o.States.Content,{type:c.DELIM_DOCTYPE,nextState:this.parent};break;case o.States.Content:return t.advanceIfString("!--").length>0?(this.state=o.States.WithinComment,{type:c.DELIM_COMMENT}):t.advanceIfRegExp(/!DOCTYPE/i).length>0?(this.state=o.States.WithinDoctype,{type:c.DELIM_DOCTYPE}):t.advanceIfString("/").length>0?(this.state=o.States.OpeningEndTag,{type:c.DELIM_END}):(this.state=o.States.OpeningStartTag,{type:c.DELIM_START});case o.States.OpeningEndTag:var e=this.nextName(t);return e.length>0?{type:c.getTag(e)}:t.advanceIfString(">").length>0?(this.state=o.States.Content,{type:c.DELIM_END,nextState:this.parent}):(t.advanceUntil(">",!1),{type:""});case o.States.OpeningStartTag:var e=this.nextName(t);if(e.length>0)return this.state=o.States.WithinTag,{type:c.getTag(e)};break;case o.States.WithinTag:if(t.skipWhitespace().length>0)return{type:""};var n=this.nextName(t);return n.length>0?(this.state=o.States.AttributeName,{type:c.ATTRIB_NAME}):t.advanceIfRegExp(/^\/?>/).length>0?(this.state=o.States.Content,{type:c.DELIM_START,nextState:this.parent}):(t.next(),{type:""});case o.States.AttributeName:return t.skipWhitespace().length>0||t.eos()?{type:""}:"="===t.peek()?(t.next(),this.state=o.States.AttributeValue,{type:""}):(this.state=o.States.WithinTag,this.tokenize(t));case o.States.AttributeValue:if(t.skipWhitespace().length>0||t.eos())return{type:""};var i=this.nextAttrValue(t);return i.length>0?(this.state=o.States.WithinTag,{type:c.ATTRIB_VALUE}):(this.state=o.States.WithinTag,this.tokenize(t))}return t.next(),this.state=o.States.Content,{type:"",nextState:this.parent}},e}(d)});var i=this&&this.__decorate||function(t,e,n,i){var o,s=arguments.length,r=3>s?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(3>s?o(r):s>3?o(e,n,r):o(e,n))||r);return s>3&&r&&Object.defineProperty(e,n,r),r},o=this&&this.__param||function(t,e){return function(n,i){e(n,i,t)}};define(t[11],e([1,0,12,9,8,6,2,13,14,15,16,17]),function(t,e,s,r,a,p,c,u,h,l,f,y){"use strict";var g=function(t){function e(e,n,i,o,s,r,a){t.call(this,e,n,i,o,s,r,a)}return n(e,t),e.prototype.makeClone=function(){return new e(this.getMode(),this.kind,this.lastTagName,this.lastAttributeName,this.embeddedContentType,this.attributeValueQuote,this.attributeValue)},e.prototype.equals=function(n){return n instanceof e?t.prototype.equals.call(this,n):!1},e.prototype.tokenize=function(e){if(!e.eos()&&"@"===e.peek()){if(e.next(),!e.eos()&&"*"===e.peek())return{nextState:new a.CSComment(this.getMode(),this,"@")};if(e.eos()||"@"!==e.peek())return{type:c.EMBED_CS,nextState:new a.CSStatement(this.getMode(),this,0,0,!0,!0,!0,!1)}}return t.prototype.tokenize.call(this,e)},e}(r.State),d=function(t){function e(e,n,i,o){t.call(this,e,n,i,o)}return n(e,t),e.prototype._registerSupports=function(){var t=this;s.SuggestRegistry.register(this.getId(),{triggerCharacters:[".",":","<",'"',"=","/"],shouldAutotriggerSuggest:!0,provideCompletionItems:function(e,n,i){return f.wireCancellationToken(i,t._provideCompletionItems(e.uri,n))}},!0),s.DocumentHighlightProviderRegistry.register(this.getId(),{provideDocumentHighlights:function(e,n,i){return f.wireCancellationToken(i,t._provideDocumentHighlights(e.uri,n))}},!0),s.LinkProviderRegistry.register(this.getId(),{provideLinks:function(e,n){return f.wireCancellationToken(n,t._provideLinks(e.uri))}},!0),l.LanguageConfigurationRegistry.register(this.getId(),e.LANG_CONFIG)},e.prototype._createModeWorkerManager=function(t,e){return new p.ModeWorkerManager(t,"vs/languages/razor/common/razorWorker","RAZORWorker","vs/languages/html/common/htmlWorker",e)},e.prototype.getInitialState=function(){return new g(this,r.States.Content,"","","","","")},e.prototype.getLeavingNestedModeData=function(e,n){var i=t.prototype.getLeavingNestedModeData.call(this,e,n);return i&&(i.stateAfterNestedMode=new g(this,r.States.Content,"","","","","")),i},e.LANG_CONFIG={wordPattern:p.createWordRegExp("#?%"),comments:{blockComment:["<!--","-->"]},brackets:[["<!--","-->"],["{","}"],["(",")"]],__electricCharacterSupport:{embeddedElectricCharacters:["*","}","]",")"]},autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:'"',close:'"'},{open:"'",close:"'"}],onEnterRules:[{beforeText:new RegExp("<(?!(?:"+r.EMPTY_ELEMENTS.join("|")+"))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),afterText:/^<\/(\w[\w\d]*)\s*>$/i,action:{indentAction:s.IndentAction.IndentOutdent}},{beforeText:new RegExp("<(?!(?:"+r.EMPTY_ELEMENTS.join("|")+"))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),action:{indentAction:s.IndentAction.Indent}}]},e=i([o(1,u.IInstantiationService),o(2,h.IModeService),o(3,y.ICompatWorkerService)],e)}(r.HTMLMode);e.RAZORMode=d})}).call(this);
//# sourceMappingURL=../../../../../min-maps/vs/languages/razor/common/razor.js.map
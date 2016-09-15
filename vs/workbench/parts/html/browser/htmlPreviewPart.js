/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},__decorate=this&&this.__decorate||function(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s},__param=this&&this.__param||function(e,t){return function(i,o){t(i,o,e)}};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/base/common/lifecycle","vs/workbench/browser/parts/editor/baseEditor","vs/platform/telemetry/common/telemetry","vs/platform/workspace/common/workspace","vs/workbench/services/editor/common/editorService","vs/workbench/common/editor/textEditorModel","vs/workbench/parts/html/common/htmlInput","vs/workbench/services/themes/common/themeService","vs/platform/opener/common/opener","./webview"],function(e,t,i,o,n,r,s,c,h,a,p,d,l,m){"use strict";var _=function(e){function t(i,o,r,s,c){e.call(this,t.ID,i),this._modelChangeSubscription=n.empty,this._themeChangeSubscription=n.empty,this._editorService=o,this._themeService=r,this._openerService=s,this._baseUrl=c.toResource("/")}return __extends(t,e),t.prototype.dispose=function(){this._webview.dispose(),this._themeChangeSubscription.dispose(),this._modelChangeSubscription.dispose(),this._model=void 0,e.prototype.dispose.call(this)},t.prototype.createEditor=function(e){this._container=document.createElement("div"),this._container.style.paddingLeft="20px",e.getHTMLElement().appendChild(this._container)},Object.defineProperty(t.prototype,"webview",{get:function(){var e=this;return this._webview||(this._webview=new m["default"](this._container,document.querySelector(".monaco-editor-background"),function(t){return e._openerService.open(t)}),this._webview.baseUrl=this._baseUrl&&this._baseUrl.toString(!0)),this._webview},enumerable:!0,configurable:!0}),t.prototype.changePosition=function(t){this._doSetVisible(!1),this._doSetVisible(!0),e.prototype.changePosition.call(this,t)},t.prototype.setEditorVisible=function(t,i){this._doSetVisible(t),e.prototype.setEditorVisible.call(this,t,i)},t.prototype._doSetVisible=function(e){var t=this;e?(this._themeChangeSubscription=this._themeService.onDidThemeChange(function(e){return t.webview.style(e)}),this.webview.style(this._themeService.getTheme()),this._hasValidModel()&&(this._modelChangeSubscription=this._model.onDidChangeContent(function(){return t.webview.contents=t._model.getLinesContent()}),this.webview.contents=this._model.getLinesContent())):(this._themeChangeSubscription.dispose(),this._modelChangeSubscription.dispose(),this._webview.dispose(),this._webview=void 0)},t.prototype._hasValidModel=function(){return this._model&&!this._model.isDisposed()},t.prototype.layout=function(e){var t=e.width,i=e.height;this._container.style.width=Math.max(t-20,0)+"px",this._container.style.height=i+"px"},t.prototype.focus=function(){this.webview.focus()},t.prototype.setInput=function(t,n){var r=this;return this.input===t&&this._hasValidModel()?o.TPromise.as(void 0):(this._model=void 0,this._modelChangeSubscription.dispose(),t instanceof p.HtmlInput?e.prototype.setInput.call(this,t,n).then(function(){return r._editorService.resolveEditorModel({resource:t.getResource()}).then(function(e){return e instanceof a.BaseTextEditorModel&&(r._model=e.textEditorModel),r._model?(r._modelChangeSubscription=r._model.onDidChangeContent(function(){return r.webview.contents=r._model.getLinesContent()}),void(r.webview.contents=r._model.getLinesContent())):o.TPromise.wrapError(i.localize("html.voidInput","Invalid editor input."))})}):o.TPromise.wrapError("Invalid input"))},t.ID="workbench.editor.htmlPreviewPart",t=__decorate([__param(0,s.ITelemetryService),__param(1,h.IWorkbenchEditorService),__param(2,d.IThemeService),__param(3,l.IOpenerService),__param(4,c.IWorkspaceContextService)],t)}(r.BaseEditor);t.HtmlPreviewPart=_});
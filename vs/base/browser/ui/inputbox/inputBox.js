var __extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)};define(["require","exports","vs/nls","vs/base/browser/browser","vs/base/browser/dom","vs/base/browser/htmlContentRenderer","vs/base/browser/ui/aria/aria","vs/base/browser/ui/actionbar/actionbar","vs/base/browser/ui/contextview/contextview","vs/base/common/event","vs/base/browser/ui/widget","vs/css!./inputBox"],function(t,e,i,s,n,o,r,a,h,l,u){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var p=n.emmet;!function(t){t[t.INFO=1]="INFO",t[t.WARNING=2]="WARNING",t[t.ERROR=3]="ERROR"}(e.MessageType||(e.MessageType={}));var c=e.MessageType,d=function(t){function e(e,i,o){var r=this;t.call(this),this.state="idle",this._onDidChange=this._register(new l.Emitter),this.onDidChange=this._onDidChange.event,this._onDidHeightChange=this._register(new l.Emitter),this.onDidHeightChange=this._onDidHeightChange.event,this.contextViewProvider=i,this.options=o||Object.create(null),this.message=null,this.cachedHeight=null,this.placeholder=this.options.placeholder||"",this.ariaLabel=this.options.ariaLabel||"",this.options.validationOptions&&(this.validation=this.options.validationOptions.validation,this.showValidationMessage=this.options.validationOptions.showMessage||!1),this.element=n.append(e,p(".monaco-inputbox.idle"));var h=this.options.flexibleHeight?"textarea":"input",u=n.append(this.element,p(".wrapper"));this.input=n.append(u,p(h+".input")),this.input.setAttribute("autocorrect","off"),this.input.setAttribute("autocapitalize","off"),this.input.setAttribute("spellcheck","false"),this.onfocus(this.input,function(){return n.addClass(r.element,"synthetic-focus")}),this.onblur(this.input,function(){return n.removeClass(r.element,"synthetic-focus")}),this.options.flexibleHeight?this.mirror=n.append(u,p("div.mirror")):(this.input.type=this.options.type||"text",this.input.setAttribute("wrap","off")),this.ariaLabel&&this.input.setAttribute("aria-label",this.ariaLabel),this.placeholder&&(this.input.setAttribute("placeholder",this.placeholder),this.input.title=this.placeholder),this.oninput(this.input,function(){return r.onValueChange()}),this.onblur(this.input,function(){return r.onBlur()}),this.onfocus(this.input,function(){return r.onFocus()}),this.placeholder&&s.isIE11orEarlier&&(this.onclick(this.input,function(t){n.EventHelper.stop(t,!0),r.input.focus()}),s.isIE9&&this.onkeyup(this.input,function(){return r.onValueChange()})),setTimeout(function(){return r.updateMirror()},0),this.options.actions&&(this.actionbar=this._register(new a.ActionBar(this.element)),this.actionbar.push(this.options.actions,{icon:!0,label:!1}))}return __extends(e,t),e.prototype.onBlur=function(){this._hideMessage()},e.prototype.onFocus=function(){this._showMessage()},e.prototype.setPlaceHolder=function(t){this.input&&this.input.setAttribute("placeholder",t)},e.prototype.setAriaLabel=function(t){this.ariaLabel=t,this.input&&(t?this.input.setAttribute("aria-label",this.ariaLabel):this.input.removeAttribute("aria-label"))},e.prototype.setContextViewProvider=function(t){this.contextViewProvider=t},Object.defineProperty(e.prototype,"inputElement",{get:function(){return this.input},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this.input.value},set:function(t){this.input.value!==t&&(this.input.value=t,this.onValueChange())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return null===this.cachedHeight?n.getTotalHeight(this.element):this.cachedHeight},enumerable:!0,configurable:!0}),e.prototype.focus=function(){this.input.focus()},e.prototype.blur=function(){this.input.blur()},e.prototype.hasFocus=function(){return document.activeElement===this.input},e.prototype.select=function(t){void 0===t&&(t=null),this.input.select(),t&&this.input.setSelectionRange(t.start,t.end)},e.prototype.enable=function(){this.input.removeAttribute("disabled")},e.prototype.disable=function(){this.input.disabled=!0,this._hideMessage()},e.prototype.setEnabled=function(t){t?this.enable():this.disable()},Object.defineProperty(e.prototype,"width",{get:function(){return n.getTotalWidth(this.input)},set:function(t){this.input.style.width=t+"px"},enumerable:!0,configurable:!0}),e.prototype.showMessage=function(t,e){this.message=t,n.removeClass(this.element,"idle"),n.removeClass(this.element,"info"),n.removeClass(this.element,"warning"),n.removeClass(this.element,"error"),n.addClass(this.element,this.classForType(t.type));var s;s=t.type===c.ERROR?i.localize("alertErrorMessage","Error: {0}",t.content):t.type===c.WARNING?i.localize("alertWarningMessage","Warning: {0}",t.content):i.localize("alertInfoMessage","Info: {0}",t.content),r.alert(s),(this.hasFocus()||e)&&this._showMessage()},e.prototype.hideMessage=function(){this.message=null,n.removeClass(this.element,"info"),n.removeClass(this.element,"warning"),n.removeClass(this.element,"error"),n.addClass(this.element,"idle"),this._hideMessage()},e.prototype.isInputValid=function(){return!!this.validation&&!this.validation(this.value)},e.prototype.validate=function(){var t=null;return this.validation&&(t=this.validation(this.value),t?(this.inputElement.setAttribute("aria-invalid","true"),this.showMessage(t)):(this.inputElement.removeAttribute("aria-invalid"),this.hideMessage())),!t},e.prototype.classForType=function(t){switch(t){case c.INFO:return"info";case c.WARNING:return"warning";default:return"error"}},e.prototype._showMessage=function(){var t=this;if(this.contextViewProvider&&this.message){var e,i=function(){return e.style.width=n.getTotalWidth(t.element)+"px"};this.state="open",this.contextViewProvider.showContextView({getAnchor:function(){return t.element},anchorAlignment:h.AnchorAlignment.RIGHT,render:function(s){e=n.append(s,p(".monaco-inputbox-container")),i();var r={tagName:"span",className:"monaco-inputbox-message"};t.message.formatContent?r.formattedText=t.message.content:r.text=t.message.content;var a=o.renderHtml(r);return n.addClass(a,t.classForType(t.message.type)),n.append(e,a),null},layout:i})}},e.prototype._hideMessage=function(){this.contextViewProvider&&"open"===this.state&&(this.state="idle",this.contextViewProvider.hideContextView())},e.prototype.onValueChange=function(){this._onDidChange.fire(this.value),this.validate(),this.updateMirror(),"open"===this.state&&this.contextViewProvider.layout()},e.prototype.updateMirror=function(){if(this.mirror){var t=this.value||this.placeholder,e=t.charCodeAt(t.length-1),i=10===e?" ":"";this.mirror.textContent=t+i,this.layout()}},e.prototype.layout=function(){if(this.mirror){var t=this.cachedHeight;this.cachedHeight=n.getTotalHeight(this.mirror),t!==this.cachedHeight&&(this.input.style.height=this.cachedHeight+"px",this._onDidHeightChange.fire(this.cachedHeight))}},e.prototype.dispose=function(){this._hideMessage(),this.element=null,this.input=null,this.contextViewProvider=null,this.message=null,this.placeholder=null,this.ariaLabel=null,this.validation=null,this.showValidationMessage=null,this.state=null,this.actionbar=null,t.prototype.dispose.call(this)},e}(u.Widget);e.InputBox=d});
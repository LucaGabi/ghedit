var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","vs/base/common/lifecycle"],function(e,t,n){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var r=function(e){function t(t,n){e.call(this),this.referenceDomElement=t,this.changeCallback=n,this.measureReferenceDomElementToken=-1,this.width=-1,this.height=-1,this.measureReferenceDomElement(!1)}return __extends(t,e),t.prototype.dispose=function(){this.stopObserving(),e.prototype.dispose.call(this)},t.prototype.getWidth=function(){return this.width},t.prototype.getHeight=function(){return this.height},t.prototype.startObserving=function(){var e=this;this.measureReferenceDomElementToken===-1&&(this.measureReferenceDomElementToken=setInterval(function(){return e.measureReferenceDomElement(!0)},100))},t.prototype.stopObserving=function(){this.measureReferenceDomElementToken!==-1&&(clearInterval(this.measureReferenceDomElementToken),this.measureReferenceDomElementToken=-1)},t.prototype.observe=function(e){this.measureReferenceDomElement(!0,e)},t.prototype.measureReferenceDomElement=function(e,t){var n=0,r=0;t?(n=t.width,r=t.height):this.referenceDomElement&&(n=this.referenceDomElement.clientWidth,r=this.referenceDomElement.clientHeight),n=Math.max(5,n),r=Math.max(5,r),this.width===n&&this.height===r||(this.width=n,this.height=r,e&&this.changeCallback())},t}(n.Disposable);t.ElementSizeObserver=r});
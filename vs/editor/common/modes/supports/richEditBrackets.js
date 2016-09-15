define(["require","exports","vs/base/common/strings","vs/editor/common/core/range"],function(e,n,t,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function c(e,n){var t={};return function(r){var c=e(r);return t.hasOwnProperty(c)||(t[c]=n(r)),t[c]}}function o(e){var n="("+e.map(t.escapeRegExpCharacters).join(")|(")+")";return t.createRegExp(n,!0,!1,!1,!1)}function a(e){for(var n="",t=e.length-1;t>=0;t--)n+=e.charAt(t);return n}var i=function(){function e(e,n){var t=this;this.brackets=n.map(function(n){return{modeId:e,open:n[0],close:n[1],forwardRegex:u({open:n[0],close:n[1]}),reversedRegex:s({open:n[0],close:n[1]})}}),this.forwardRegex=f(this.brackets),this.reversedRegex=h(this.brackets),this.textIsBracket={},this.textIsOpenBracket={},this.maxBracketLength=0,this.brackets.forEach(function(e){t.textIsBracket[e.open]=e,t.textIsBracket[e.close]=e,t.textIsOpenBracket[e.open]=!0,t.textIsOpenBracket[e.close]=!1,t.maxBracketLength=Math.max(t.maxBracketLength,e.open.length),t.maxBracketLength=Math.max(t.maxBracketLength,e.close.length)})}return e}();n.RichEditBrackets=i;var u=c(function(e){return e.open+";"+e.close},function(e){return o([e.open,e.close])}),s=c(function(e){return e.open+";"+e.close},function(e){return o([a(e.open),a(e.close)])}),f=c(function(e){return e.map(function(e){return e.open+";"+e.close}).join(";")},function(e){var n=[];return e.forEach(function(e){n.push(e.open),n.push(e.close)}),o(n)}),h=c(function(e){return e.map(function(e){return e.open+";"+e.close}).join(";")},function(e){var n=[];return e.forEach(function(e){n.push(a(e.open)),n.push(a(e.close))}),o(n)}),p=function(){function e(){}return e._findPrevBracketInText=function(e,n,t,c){var o=t.match(e);if(!o)return null;var a=t.length-o.index,i=o[0].length,u=c+a;return new r.Range(n,u-i+1,n,u+1)},e.findPrevBracketInToken=function(e,n,t,r,c){for(var o="",a=c-1;a>=r;a--)o+=t.charAt(a);return this._findPrevBracketInText(e,n,o,r)},e.findNextBracketInText=function(e,n,t,c){var o=t.match(e);if(!o)return null;var a=o.index,i=o[0].length,u=c+a;return new r.Range(n,u+1,n,u+1+i)},e.findNextBracketInToken=function(e,n,t,r,c){var o=t.substring(r,c);return this.findNextBracketInText(e,n,o,r)},e}();n.BracketsUtils=p});
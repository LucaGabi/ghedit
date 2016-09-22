define(["require","exports","vs/base/common/filters","vs/base/common/async"],function(e,r,t,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function n(e){if(e){var r=t.fuzzyContiguousFilter,i=[];return i.push({currentWord:e.currentWord,suggestions:e.suggestions.filter(function(t){return!!r(e.currentWord,t.label)}),incomplete:e.incomplete}),i}}var o=function(){function e(e,r){this._editorWorkerService=e,this._configurationService=r}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filter",{get:function(){return t.matchesPrefix},enumerable:!0,configurable:!0}),e.prototype.provideCompletionItems=function(e,r,t){var n=this._configurationService.getConfiguration("editor");return!n||n.wordBasedSuggestions?i.wireCancellationToken(t,this._editorWorkerService.textualSuggest(e.uri,r)):[]},e}();r.TextualSuggestSupport=o,r.filterSuggestions=n});
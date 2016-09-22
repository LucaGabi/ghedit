var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","vs/base/common/event","./extHostTypes","vs/base/common/glob","./extHost.protocol"],function(e,t,n,o,i,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var s=function(){function e(e,t,r,s,a){var c=this;this._onDidCreate=new n.Emitter,this._onDidChange=new n.Emitter,this._onDidDelete=new n.Emitter,this._config=0,r||(this._config+=1),s||(this._config+=2),a||(this._config+=4);var f=e(function(e){if(!r)for(var n=0,o=e.created;n<o.length;n++){var f=o[n];i.match(t,f.fsPath)&&c._onDidCreate.fire(f)}if(!s)for(var h=0,u=e.changed;h<u.length;h++){var p=u[h];i.match(t,p.fsPath)&&c._onDidChange.fire(p)}if(!a)for(var l=0,d=e.deleted;l<d.length;l++){var g=d[l];i.match(t,g.fsPath)&&c._onDidDelete.fire(g)}});this._disposable=o.Disposable.from(this._onDidCreate,this._onDidChange,this._onDidDelete,f)}return Object.defineProperty(e.prototype,"ignoreCreateEvents",{get:function(){return Boolean(1&this._config)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ignoreChangeEvents",{get:function(){return Boolean(2&this._config)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ignoreDeleteEvents",{get:function(){return Boolean(4&this._config)},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){this._disposable.dispose()},Object.defineProperty(e.prototype,"onDidCreate",{get:function(){return this._onDidCreate.event},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onDidChange",{get:function(){return this._onDidChange.event},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onDidDelete",{get:function(){return this._onDidDelete.event},enumerable:!0,configurable:!0}),e}();t.FileSystemWatcher=s;var a=function(e){function t(){e.call(this),this._emitter=new n.Emitter}return __extends(t,e),t.prototype.createFileSystemWatcher=function(e,t,n,o){return new s(this._emitter.event,e,t,n,o)},t.prototype.$onFileEvent=function(e){this._emitter.fire(e)},t}(r.ExtHostFileSystemEventServiceShape);t.ExtHostFileSystemEventService=a});
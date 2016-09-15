define(["require","exports","vs/base/common/errors","vs/base/common/marshalling","vs/base/common/winjs.base","vs/base/common/worker/workerProtocol","vs/base/common/platform"],function(e,s,o,r,t,i,n){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function a(e){n.isWeb&&(p||(p=!0,console.warn("Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq")),console.warn(e.message))}var p=!1;s.logOnceWebWorkerWarning=a;var u=function(){function e(e,s){var o=this;this._lastMessageId=0,this._promises={},this._messagesQueue=[],this._processQueueTimeout=-1,this._waitingForWorkerReply=!1,this._worker=e.create("vs/base/common/worker/workerServer",function(e){return o._onSerializedMessage(e)},function(e){var s=o._promises[1];delete o._promises[1],s.error(e)});var r=null,t=window.require;"function"==typeof t.getConfig?r=t.getConfig():"undefined"!=typeof window.requirejs&&(r=window.requirejs.s.contexts._.config),this.onModuleLoaded=this._sendMessage(i.MessageType.INITIALIZE,{id:this._worker.getId(),moduleId:s,loaderConfiguration:r})}return e.prototype.request=function(e,s){var o=this;if("$"===e.charAt(0))throw new Error("Illegal requestName: "+e);var r,i=!1;return new t.TPromise(function(t,n,a){o.onModuleLoaded.then(function(){i||(r=o._sendMessage(e,s).then(t,n,a))},n,a)},function(){r?r.cancel():i=!0})},e.prototype.dispose=function(){var e=Object.keys(this._promises);if(e.length>0){console.warn("Terminating a worker with "+e.length+" pending promises:"),console.warn(this._promises);for(var s in this._promises)e.hasOwnProperty(s)&&this._promises[s].error("Worker forcefully terminated")}this._worker.dispose()},e.prototype._sendMessage=function(e,s){var o,r,i,n=this,a={id:++this._lastMessageId,type:e,timestamp:Date.now(),payload:s},p=new t.TPromise(function(e,s,t){o=e,r=s,i=t},function(){n._removeMessage(a.id)});return this._promises[a.id]={complete:o,error:r,progress:i,type:e,payload:s},this._enqueueMessage(a),p},e.prototype._enqueueMessage=function(e){var s,o=-1;for(s=this._messagesQueue.length-1;s>=0;s--)if(this._messagesQueue[s].timestamp<=e.timestamp){o=s;break}this._messagesQueue.splice(o+1,0,e),this._processMessagesQueue()},e.prototype._removeMessage=function(e){for(var s=0,o=this._messagesQueue.length;s<o;s++)if(this._messagesQueue[s].id===e)return this._promises.hasOwnProperty(String(e))&&delete this._promises[String(e)],this._messagesQueue.splice(s,1),void this._processMessagesQueue()},e.prototype._processMessagesQueue=function(){var e=this;if(this._processQueueTimeout!==-1&&(clearTimeout(this._processQueueTimeout),this._processQueueTimeout=-1),0!==this._messagesQueue.length&&!this._waitingForWorkerReply){var s=this._messagesQueue[0].timestamp-(new Date).getTime();s=Math.max(0,s),this._processQueueTimeout=setTimeout(function(){if(e._processQueueTimeout=-1,0!==e._messagesQueue.length){e._waitingForWorkerReply=!0;var s=e._messagesQueue.shift();e._postMessage(s)}},s)}},e.prototype._postMessage=function(e){this._worker.postMessage(r.stringify(e))},e.prototype._onSerializedMessage=function(e){var s=null;try{s=r.parse(e)}catch(o){}s&&this._onmessage(s)},e.prototype._onmessage=function(e){if(e.monacoWorker&&(!e.from||e.from===this._worker.getId())){switch(e.type){case i.MessageType.REPLY:var s=e;if(this._waitingForWorkerReply=!1,!this._promises.hasOwnProperty(String(s.id)))return void this._onError("Received unexpected message from Worker:",e);switch(s.action){case i.ReplyType.COMPLETE:this._promises[s.id].complete(s.payload),delete this._promises[s.id];break;case i.ReplyType.ERROR:this._onError("Main Thread sent to worker the following message:",{type:this._promises[s.id].type,payload:this._promises[s.id].payload}),this._onError("And the worker replied with an error:",s.payload),o.onUnexpectedError(s.payload),this._promises[s.id].error(s.payload),delete this._promises[s.id];break;case i.ReplyType.PROGRESS:this._promises[s.id].progress(s.payload)}break;case i.MessageType.PRINT:var r=e;this._consoleLog(r.level,r.payload);break;default:this._onError("Received unexpected message from worker:",e)}this._processMessagesQueue()}},e.prototype._consoleLog=function(e,s){switch(e){case i.PrintType.LOG:console.log(s);break;case i.PrintType.DEBUG:console.info(s);break;case i.PrintType.INFO:console.info(s);break;case i.PrintType.WARN:console.warn(s);break;case i.PrintType.ERROR:console.error(s);break;default:this._onError("Received unexpected message from Worker:",s)}},e.prototype._onError=function(e,s){console.error(e),console.info(s)},e}();s.WorkerClient=u});
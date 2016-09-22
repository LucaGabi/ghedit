/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,i){var r,c=arguments.length,a=c<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(a=(c<3?r(a):c>3?r(t,n,a):r(t,n))||a);return c>3&&a&&Object.defineProperty(t,n,a),a},__param=this&&this.__param||function(e,t){return function(n,i){t(n,i,e)}};define(["require","exports","vs/nls","vs/base/common/actions","vs/workbench/parts/terminal/electron-browser/terminal","vs/base/browser/ui/actionbar/actionbar"],function(e,t,n,i,r,c){"use strict";var a=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.toggle()},t.ID="workbench.action.terminal.toggleTerminal",t.LABEL=n.localize("workbench.action.terminal.toggleTerminal","Toggle Integrated Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.ToggleTerminalAction=a;var o=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i,this["class"]="terminal-action kill"}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.close()},t.ID="workbench.action.terminal.kill",t.LABEL=n.localize("workbench.action.terminal.kill","Terminal: Kill the Active Terminal Instance"),t.PANEL_LABEL=n.localize("workbench.action.terminal.kill.short","Kill Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.KillTerminalAction=o;var l=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.copySelection()},t.ID="workbench.action.terminal.copySelection",t.LABEL=n.localize("workbench.action.terminal.copySelection","Terminal: Copy Selection"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.CopyTerminalSelectionAction=l;var s=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i,this["class"]="terminal-action new"}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.createNew()},t.ID="workbench.action.terminal.new",t.LABEL=n.localize("workbench.action.terminal.new","Terminal: Create New Integrated Terminal"),t.PANEL_LABEL=n.localize("workbench.action.terminal.new.short","New Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.CreateNewTerminalAction=s;var m=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.focus()},t.ID="workbench.action.terminal.focus",t.LABEL=n.localize("workbench.action.terminal.focus","Terminal: Focus Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.FocusTerminalAction=m;var u=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.focusNext()},t.ID="workbench.action.terminal.focusNext",t.LABEL=n.localize("workbench.action.terminal.focusNext","Terminal: Focus Next Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.FocusNextTerminalAction=u;var h=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.focusPrevious()},t.ID="workbench.action.terminal.focusPrevious",t.LABEL=n.localize("workbench.action.terminal.focusPrevious","Terminal: Focus Previous Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.FocusPreviousTerminalAction=h;var _=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.paste()},t.ID="workbench.action.terminal.paste",t.LABEL=n.localize("workbench.action.terminal.paste","Terminal: Paste into Active Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.TerminalPasteAction=_;var p=function(e){function t(t,n,i){e.call(this,t,n),this.terminalService=i}return __extends(t,e),t.prototype.run=function(e){return this.terminalService.runSelectedText()},t.ID="workbench.action.terminal.runSelectedText",t.LABEL=n.localize("workbench.action.terminal.runSelectedText","Terminal: Run Selected Text In Active Terminal"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.RunSelectedTextInTerminalAction=p;var v=function(e){function t(n,i,r){e.call(this,t.ID,t.LABEL),this.terminalService=r,this["class"]="terminal-action switch-terminal-instance"}return __extends(t,e),t.prototype.run=function(e){var t=parseInt(e.split(":")[0],10)-1;return this.terminalService.setActiveTerminal(t)},t.ID="workbench.action.terminal.switchTerminalInstance",t.LABEL=n.localize("workbench.action.terminal.switchTerminalInstance","Terminal: Switch Terminal Instance"),t=__decorate([__param(2,r.ITerminalService)],t)}(i.Action);t.SwitchTerminalInstanceAction=v;var T=function(e){function t(t,n){e.call(this,null,t,n.getTerminalInstanceTitles(),n.getActiveTerminalIndex()),this.terminalService=n,this.toDispose.push(this.terminalService.onInstancesChanged(this.updateItems,this)),this.toDispose.push(this.terminalService.onActiveInstanceChanged(this.updateItems,this)),this.toDispose.push(this.terminalService.onInstanceTitleChanged(this.updateItems,this))}return __extends(t,e),t.prototype.updateItems=function(){this.setOptions(this.terminalService.getTerminalInstanceTitles(),this.terminalService.getActiveTerminalIndex())},t=__decorate([__param(1,r.ITerminalService)],t)}(c.SelectActionItem);t.SwitchTerminalInstanceActionItem=T});
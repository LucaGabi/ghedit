/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/platform/instantiation/common/instantiation"],function(n,e,i){"use strict";function t(n,e,i){return n.replace(r,function(n,t){return e&&t.length>0&&"_"!==t[0]?n:i&&i.hasOwnProperty(t)?i[t]:n})}e.VIEWLET_ID="workbench.view.debug",e.REPL_ID="workbench.panel.repl",e.DEBUG_SERVICE_ID="debugService",e.CONTEXT_IN_DEBUG_MODE="inDebugMode",e.EDITOR_CONTRIBUTION_ID="editor.contrib.debug",function(n){n[n.Disabled=0]="Disabled",n[n.Inactive=1]="Inactive",n[n.Initializing=2]="Initializing",n[n.Stopped=3]="Stopped",n[n.Running=4]="Running",n[n.RunningNoDebug=5]="RunningNoDebug"}(e.State||(e.State={}));e.State;e.IDebugService=i.createDecorator(e.DEBUG_SERVICE_ID);var r=/{([^}]+)}/g;e.formatPII=t});
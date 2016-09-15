/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,i){function t(){this.constructor=e}for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o]);e.prototype=null===i?Object.create(i):(t.prototype=i.prototype,new t)},__decorate=this&&this.__decorate||function(e,i,t,o){var n,r=arguments.length,s=r<3?i:null===o?o=Object.getOwnPropertyDescriptor(i,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,i,t,o);else for(var d=e.length-1;d>=0;d--)(n=e[d])&&(s=(r<3?n(s):r>3?n(i,t,s):n(i,t))||s);return r>3&&s&&Object.defineProperty(i,t,s),s},__param=this&&this.__param||function(e,i){return function(t,o){i(t,o,e)}};define(["require","exports","vs/base/common/async","vs/base/common/eventEmitter","vs/base/common/lifecycle","vs/base/common/objects","vs/base/browser/dom","vs/base/browser/styleMutator","vs/base/browser/ui/sash/sash","vs/platform/instantiation/common/instantiation","vs/platform/keybinding/common/keybinding","vs/platform/instantiation/common/serviceCollection","vs/editor/common/config/defaultConfig","vs/editor/common/core/range","vs/editor/common/editorCommon","vs/editor/common/services/editorWorkerService","vs/editor/common/viewLayout/viewLineParts","vs/editor/common/viewLayout/viewLineRenderer","vs/editor/browser/widget/codeEditorWidget","vs/editor/common/core/viewLineToken","vs/editor/browser/config/configuration","vs/editor/common/viewModel/viewModel","vs/css!./media/diffEditor"],function(e,i,t,o,n,r,s,d,a,h,l,u,f,m,c,g,p,_,E,v,y,w){"use strict";function L(e){return e.modifiedEndLineNumber>0}function b(e){return e.originalEndLineNumber>0}function S(e,i,t,o,n,r){return{range:new m.Range(e,i,t,o),options:{className:n,isWholeLine:r}}}function D(){var e=document.createElement("div");return e.className="diagonal-fill",e}var N=function(){function e(){this._zones=[],this._zonesMap={},this._decorations=[]}return e.prototype.getForeignViewZones=function(e){var i=this;return e.filter(function(e){return!i._zonesMap[String(e.id)]})},e.prototype.clean=function(e){var i=this;this._zones.length>0&&e.changeViewZones(function(e){for(var t=0,o=i._zones.length;t<o;t++)e.removeZone(i._zones[t])}),this._zones=[],this._zonesMap={},this._decorations.length>0&&e.changeDecorations(function(e){e.deltaDecorations(i._decorations,[])}),this._decorations=[]},e.prototype.apply=function(e,i,t){var o,n,r=this;e.changeViewZones(function(e){for(o=0,n=r._zones.length;o<n;o++)e.removeZone(r._zones[o]);for(r._zones=[],r._zonesMap={},o=0,n=t.zones.length;o<n;o++){t.zones[o].suppressMouseDown=!0;var i=e.addZone(t.zones[o]);r._zones.push(i),r._zonesMap[String(i)]=!0}}),this._decorations=e.deltaDecorations(this._decorations,t.decorations),i&&i.setZones(t.overviewZones)},e}(),C=0,I=function(e){function i(o,n,r,d,a){var h=this;e.call(this),this._editorWorkerService=r,this._keybindingService=d,this.id=++C,this._domElement=o,n=n||{},this._theme=n.theme||f.DefaultConfig.editor.theme,this._renderSideBySide=!0,"undefined"!=typeof n.renderSideBySide&&(this._renderSideBySide=n.renderSideBySide),this._ignoreTrimWhitespace=!0,"undefined"!=typeof n.ignoreTrimWhitespace&&(this._ignoreTrimWhitespace=n.ignoreTrimWhitespace),this._originalIsEditable=!1,"undefined"!=typeof n.originalEditable&&(this._originalIsEditable=Boolean(n.originalEditable)),this._updateDecorationsRunner=new t.RunOnceScheduler(function(){return h._updateDecorations()},0),this._toDispose=[],this._toDispose.push(this._updateDecorationsRunner),this._containerDomElement=document.createElement("div"),this._containerDomElement.className=i._getClassName(this._theme,this._renderSideBySide),this._containerDomElement.style.position="relative",this._containerDomElement.style.height="100%",this._domElement.appendChild(this._containerDomElement),this._overviewViewportDomElement=document.createElement("div"),this._overviewViewportDomElement.className="diffViewport",this._overviewViewportDomElement.style.position="absolute",this._overviewDomElement=document.createElement("div"),this._overviewDomElement.className="diffOverview",this._overviewDomElement.style.position="absolute",this._overviewDomElement.style.height="100%",this._overviewDomElement.appendChild(this._overviewViewportDomElement),this._toDispose.push(s.addDisposableListener(this._overviewDomElement,"mousedown",function(e){h.modifiedEditor.delegateVerticalScrollbarMouseDown(e)})),this._containerDomElement.appendChild(this._overviewDomElement),this._createLeftHandSide(),this._createRightHandSide(),this._beginUpdateDecorationsTimeout=-1,this._currentlyChangingViewZones=!1,this._diffComputationToken=0,this._originalEditorState=new N,this._modifiedEditorState=new N,this._isVisible=!0,this._isHandlingScrollEvent=!1,this._width=0,this._height=0,this._lineChanges=null,this._createLeftHandSideEditor(n,a),this._createRightHandSideEditor(n,a),n.automaticLayout&&(this._measureDomElementToken=window.setInterval(function(){return h._measureDomElement(!1)},100)),this._enableSplitViewResizing=!0,"undefined"!=typeof n.enableSplitViewResizing&&(this._enableSplitViewResizing=n.enableSplitViewResizing),this._renderSideBySide?this._setStrategy(new M(this._createDataSource(),this._enableSplitViewResizing)):this._setStrategy(new W(this._createDataSource(),this._enableSplitViewResizing))}return __extends(i,e),i.prototype.onDidChangeModelRawContent=function(e){return this.addListener2(c.EventType.ModelRawContentChanged,e)},i.prototype.onDidChangeModelContent=function(e){return this.addListener2(c.EventType.ModelContentChanged2,e)},i.prototype.onDidChangeModelMode=function(e){return this.addListener2(c.EventType.ModelModeChanged,e)},i.prototype.onDidChangeModelOptions=function(e){return this.addListener2(c.EventType.ModelOptionsChanged,e)},i.prototype.onDidChangeConfiguration=function(e){return this.addListener2(c.EventType.ConfigurationChanged,e)},i.prototype.onDidChangeCursorPosition=function(e){return this.addListener2(c.EventType.CursorPositionChanged,e)},i.prototype.onDidChangeCursorSelection=function(e){return this.addListener2(c.EventType.CursorSelectionChanged,e)},i.prototype.onDidDispose=function(e){return this.addListener2(c.EventType.Disposed,e)},i.prototype.onDidUpdateDiff=function(e){return this.addListener2(c.EventType.DiffUpdated,e)},Object.defineProperty(i.prototype,"ignoreTrimWhitespace",{get:function(){return this._ignoreTrimWhitespace},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"renderSideBySide",{get:function(){return this._renderSideBySide},enumerable:!0,configurable:!0}),i._getClassName=function(e,i){var t="monaco-diff-editor monaco-editor-background ";return i&&(t+="side-by-side "),t+=e},i.prototype._recreateOverviewRulers=function(){this._originalOverviewRuler&&(this._overviewDomElement.removeChild(this._originalOverviewRuler.getDomNode()),this._originalOverviewRuler.dispose()),this._originalOverviewRuler=this.originalEditor.getView().createOverviewRuler("original diffOverviewRuler",4,Number.MAX_VALUE),this._overviewDomElement.appendChild(this._originalOverviewRuler.getDomNode()),this._modifiedOverviewRuler&&(this._overviewDomElement.removeChild(this._modifiedOverviewRuler.getDomNode()),this._modifiedOverviewRuler.dispose()),this._modifiedOverviewRuler=this.modifiedEditor.getView().createOverviewRuler("modified diffOverviewRuler",4,Number.MAX_VALUE),this._overviewDomElement.appendChild(this._modifiedOverviewRuler.getDomNode()),this._layoutOverviewRulers()},i.prototype._createLeftHandSide=function(){this._originalDomNode=document.createElement("div"),this._originalDomNode.className="editor original",this._originalDomNode.style.position="absolute",this._originalDomNode.style.height="100%",this._containerDomElement.appendChild(this._originalDomNode)},i.prototype._createRightHandSide=function(){this._modifiedDomNode=document.createElement("div"),this._modifiedDomNode.className="editor modified",this._modifiedDomNode.style.position="absolute",this._modifiedDomNode.style.height="100%",this._containerDomElement.appendChild(this._modifiedDomNode)},i.prototype._createLeftHandSideEditor=function(e,i){var t=this;i=i.createChild(new u.ServiceCollection([l.IKeybindingService,this._keybindingService.createScoped(this._originalDomNode)])),this.originalEditor=i.createInstance(E.CodeEditorWidget,this._originalDomNode,this._adjustOptionsForLeftHandSide(e,this._originalIsEditable)),this._toDispose.push(this.originalEditor.addBulkListener2(function(e){return t._onOriginalEditorEvents(e)})),this._toDispose.push(this.addEmitter2(this.originalEditor))},i.prototype._createRightHandSideEditor=function(e,i){var t=this;this.modifiedEditor=i.createInstance(E.CodeEditorWidget,this._modifiedDomNode,this._adjustOptionsForRightHandSide(e)),this._toDispose.push(this.modifiedEditor.addBulkListener2(function(e){return t._onModifiedEditorEvents(e)})),this._toDispose.push(this.addEmitter2(this.modifiedEditor))},i.prototype.destroy=function(){this.dispose()},i.prototype.dispose=function(){this._toDispose=n.dispose(this._toDispose),window.clearInterval(this._measureDomElementToken),this._cleanViewZonesAndDecorations(),this._originalOverviewRuler.dispose(),this._modifiedOverviewRuler.dispose(),this.originalEditor.destroy(),this.modifiedEditor.destroy(),this._strategy.dispose(),this.emit(c.EventType.Disposed),e.prototype.dispose.call(this)},i.prototype.getId=function(){return this.getEditorType()+":"+this.id},i.prototype.getEditorType=function(){return c.EditorType.IDiffEditor},i.prototype.getLineChanges=function(){return this._lineChanges},i.prototype.getOriginalEditor=function(){return this.originalEditor},i.prototype.getModifiedEditor=function(){return this.modifiedEditor},i.prototype.updateOptions=function(e){this._theme=e&&e.theme?e.theme:this._theme;var t=!1;"undefined"!=typeof e.renderSideBySide&&this._renderSideBySide!==e.renderSideBySide&&(this._renderSideBySide=e.renderSideBySide,t=!0),"undefined"!=typeof e.ignoreTrimWhitespace&&this._ignoreTrimWhitespace!==e.ignoreTrimWhitespace&&(this._ignoreTrimWhitespace=e.ignoreTrimWhitespace,this._beginUpdateDecorations()),"undefined"!=typeof e.originalEditable&&(this._originalIsEditable=Boolean(e.originalEditable)),this._containerDomElement.className=i._getClassName(this._theme,this._renderSideBySide),this.modifiedEditor.updateOptions(this._adjustOptionsForRightHandSide(e)),this.originalEditor.updateOptions(this._adjustOptionsForLeftHandSide(e,this._originalIsEditable)),"undefined"!=typeof e.enableSplitViewResizing&&(this._enableSplitViewResizing=e.enableSplitViewResizing),this._strategy.setEnableSplitViewResizing(this._enableSplitViewResizing),t&&(this._renderSideBySide?this._setStrategy(new M(this._createDataSource(),this._enableSplitViewResizing)):this._setStrategy(new W(this._createDataSource(),this._enableSplitViewResizing)))},i.prototype.getValue=function(e){return void 0===e&&(e=null),this.modifiedEditor.getValue(e)},i.prototype.getModel=function(){return{original:this.originalEditor.getModel(),modified:this.modifiedEditor.getModel()}},i.prototype.setModel=function(e){if(e&&(!e.original||!e.modified))throw new Error(e.original?"DiffEditorWidget.setModel: Modified model is null":"DiffEditorWidget.setModel: Original model is null");this._cleanViewZonesAndDecorations(),this.originalEditor.setModel(e?e.original:null),this.modifiedEditor.setModel(e?e.modified:null),this._updateDecorationsRunner.cancel(),e&&(this.originalEditor.setScrollTop(0),this.modifiedEditor.setScrollTop(0)),this._lineChanges=null,this._diffComputationToken++,e?(this._recreateOverviewRulers(),this._beginUpdateDecorations()):this._lineChanges=null,this._layoutOverviewViewport()},i.prototype.getDomNode=function(){return this._domElement},i.prototype.getVisibleColumnFromPosition=function(e){return this.modifiedEditor.getVisibleColumnFromPosition(e)},i.prototype.getPosition=function(){return this.modifiedEditor.getPosition()},i.prototype.setPosition=function(e,i,t,o){this.modifiedEditor.setPosition(e,i,t,o)},i.prototype.revealLine=function(e){this.modifiedEditor.revealLine(e)},i.prototype.revealLineInCenter=function(e){this.modifiedEditor.revealLineInCenter(e)},i.prototype.revealLineInCenterIfOutsideViewport=function(e){this.modifiedEditor.revealLineInCenterIfOutsideViewport(e)},i.prototype.revealPosition=function(e,i,t){void 0===i&&(i=!1),void 0===t&&(t=!1),this.modifiedEditor.revealPosition(e,i,t)},i.prototype.revealPositionInCenter=function(e){this.modifiedEditor.revealPositionInCenter(e)},i.prototype.revealPositionInCenterIfOutsideViewport=function(e){this.modifiedEditor.revealPositionInCenterIfOutsideViewport(e)},i.prototype.getSelection=function(){return this.modifiedEditor.getSelection()},i.prototype.getSelections=function(){return this.modifiedEditor.getSelections()},i.prototype.setSelection=function(e,i,t,o){this.modifiedEditor.setSelection(e,i,t,o)},i.prototype.setSelections=function(e){this.modifiedEditor.setSelections(e)},i.prototype.revealLines=function(e,i){this.modifiedEditor.revealLines(e,i)},i.prototype.revealLinesInCenter=function(e,i){this.modifiedEditor.revealLinesInCenter(e,i)},i.prototype.revealLinesInCenterIfOutsideViewport=function(e,i){this.modifiedEditor.revealLinesInCenterIfOutsideViewport(e,i)},i.prototype.revealRange=function(e,i,t){void 0===i&&(i=!1),void 0===t&&(t=!0),this.modifiedEditor.revealRange(e,i,t)},i.prototype.revealRangeInCenter=function(e){this.modifiedEditor.revealRangeInCenter(e)},i.prototype.revealRangeInCenterIfOutsideViewport=function(e){this.modifiedEditor.revealRangeInCenterIfOutsideViewport(e)},i.prototype.addAction=function(e){this.modifiedEditor.addAction(e)},i.prototype.getActions=function(){return this.modifiedEditor.getActions()},i.prototype.getAction=function(e){return this.modifiedEditor.getAction(e)},i.prototype.saveViewState=function(){var e=this.originalEditor.saveViewState(),i=this.modifiedEditor.saveViewState();return{original:e,modified:i}},i.prototype.restoreViewState=function(e){var i=e;if(i.original&&i.original){var t=i;this.originalEditor.restoreViewState(t.original),this.modifiedEditor.restoreViewState(t.modified)}},i.prototype.layout=function(e){this._measureDomElement(!1,e)},i.prototype.focus=function(){this.modifiedEditor.focus()},i.prototype.isFocused=function(){return this.originalEditor.isFocused()||this.modifiedEditor.isFocused()},i.prototype.onVisible=function(){this._isVisible=!0,this.originalEditor.onVisible(),this.modifiedEditor.onVisible(),this._beginUpdateDecorations()},i.prototype.onHide=function(){this._isVisible=!1,this.originalEditor.onHide(),this.modifiedEditor.onHide(),this._cleanViewZonesAndDecorations()},i.prototype.trigger=function(e,i,t){this.modifiedEditor.trigger(e,i,t)},i.prototype.changeDecorations=function(e){return this.modifiedEditor.changeDecorations(e)},i.prototype._measureDomElement=function(e,i){return i=i||{width:this._containerDomElement.clientWidth,height:this._containerDomElement.clientHeight},i.width<=0?(this._width=0,void(this._height=0)):void((e||i.width!==this._width||i.height!==this._height)&&(this._width=i.width,this._height=i.height,this._doLayout()))},i.prototype._layoutOverviewRulers=function(){var e=i.ENTIRE_DIFF_OVERVIEW_WIDTH-2*i.ONE_OVERVIEW_WIDTH,t=this.modifiedEditor.getLayoutInfo();t&&(this._originalOverviewRuler.setLayout(new c.OverviewRulerPosition({top:0,width:i.ONE_OVERVIEW_WIDTH,right:e+i.ONE_OVERVIEW_WIDTH,height:this._height})),this._modifiedOverviewRuler.setLayout(new c.OverviewRulerPosition({top:0,right:0,width:i.ONE_OVERVIEW_WIDTH,height:this._height})))},i.prototype._recomputeIfNecessary=function(e){for(var t=this,o=!1,n=0;!o&&n<e.length;n++){var r=e[n].getType();o=o||r===c.EventType.ModelRawContentChanged||r===c.EventType.ModelModeChanged}o&&this._isVisible&&(this._beginUpdateDecorationsTimeout!==-1&&(window.clearTimeout(this._beginUpdateDecorationsTimeout),this._beginUpdateDecorationsTimeout=-1),this._beginUpdateDecorationsTimeout=window.setTimeout(function(){return t._beginUpdateDecorations()},i.UPDATE_DIFF_DECORATIONS_DELAY))},i.prototype._onOriginalEditorEvents=function(e){for(var i=0;i<e.length;i++){var t=e[i].getType(),o=e[i].getData();if("scroll"===t&&this._onOriginalEditorScroll(o),t===c.EventType.ViewZonesChanged&&this._onViewZonesChanged(),t===c.EventType.ConfigurationChanged){var n=this.originalEditor.getConfiguration().wrappingInfo.isViewportWrapping;n&&this.originalEditor.updateOptions({wrappingColumn:-1})}}this._recomputeIfNecessary(e)},i.prototype._onModifiedEditorEvents=function(e){for(var i=0;i<e.length;i++){var t=e[i].getType(),o=e[i].getData();if("scroll"===t&&(this._onModifiedEditorScroll(o),this._layoutOverviewViewport()),"viewLayoutChanged"===t&&this._layoutOverviewViewport(),t===c.EventType.ViewZonesChanged&&this._onViewZonesChanged(),t===c.EventType.ConfigurationChanged){var n=o,r=this.modifiedEditor.getConfiguration().wrappingInfo.isViewportWrapping;r&&this.modifiedEditor.updateOptions({wrappingColumn:-1}),n.fontInfo&&this.modifiedEditor.getModel()&&this._onViewZonesChanged()}}this._recomputeIfNecessary(e)},i.prototype._onViewZonesChanged=function(){this._currentlyChangingViewZones||this._updateDecorationsRunner.schedule()},i.prototype._beginUpdateDecorations=function(){var e=this;if(this._beginUpdateDecorationsTimeout=-1,this.modifiedEditor.getModel()){this._diffComputationToken++;var i=this._diffComputationToken,t=this.originalEditor.getModel(),o=this.modifiedEditor.getModel();this._editorWorkerService.computeDiff(t.uri,o.uri,this._ignoreTrimWhitespace).then(function(n){i===e._diffComputationToken&&t===e.originalEditor.getModel()&&o===e.modifiedEditor.getModel()&&(e._lineChanges=n,e._updateDecorationsRunner.schedule(),e.emit(c.EventType.DiffUpdated,{}))},function(n){i===e._diffComputationToken&&t===e.originalEditor.getModel()&&o===e.modifiedEditor.getModel()&&(e._lineChanges=null,e._updateDecorationsRunner.schedule())})}},i.prototype._cleanViewZonesAndDecorations=function(){this._originalEditorState.clean(this.originalEditor),this._modifiedEditorState.clean(this.modifiedEditor)},i.prototype._updateDecorations=function(){var e=this._lineChanges||[],i=this._originalEditorState.getForeignViewZones(this.originalEditor.getWhitespaces()),t=this._modifiedEditorState.getForeignViewZones(this.modifiedEditor.getWhitespaces()),o=this._strategy.getEditorsDiffDecorations(e,this._ignoreTrimWhitespace,i,t,this.originalEditor,this.modifiedEditor);try{this._currentlyChangingViewZones=!0,this._originalEditorState.apply(this.originalEditor,this._originalOverviewRuler,o.original),this._modifiedEditorState.apply(this.modifiedEditor,this._modifiedOverviewRuler,o.modified)}finally{this._currentlyChangingViewZones=!1}},i.prototype._adjustOptionsForSubEditor=function(e){var i=r.clone(e||{});return i.wrappingColumn=-1,i.automaticLayout=!1,i.scrollbar=i.scrollbar||{},i.scrollbar.vertical="visible",i.folding=!1,i.referenceInfos=!1,i},i.prototype._adjustOptionsForLeftHandSide=function(e,i){var t=this._adjustOptionsForSubEditor(e);return t.readOnly=!i,t.overviewRulerLanes=1,t.theme=this._theme+" original-in-monaco-diff-editor",t},i.prototype._adjustOptionsForRightHandSide=function(e){var t=this._adjustOptionsForSubEditor(e);return t.revealHorizontalRightPadding=f.DefaultConfig.editor.revealHorizontalRightPadding+i.ENTIRE_DIFF_OVERVIEW_WIDTH,t.scrollbar.verticalHasArrows=!1,t.theme=this._theme+" modified-in-monaco-diff-editor",t},i.prototype._onOriginalEditorScroll=function(e){(e.scrollTopChanged||e.scrollLeftChanged)&&(this._isHandlingScrollEvent||(this._isHandlingScrollEvent=!0,this.modifiedEditor.setScrollPosition({scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}),this._isHandlingScrollEvent=!1))},i.prototype._onModifiedEditorScroll=function(e){(e.scrollTopChanged||e.scrollLeftChanged)&&(this._isHandlingScrollEvent||(this._isHandlingScrollEvent=!0,this.originalEditor.setScrollPosition({scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}),this._isHandlingScrollEvent=!1))},i.prototype._doLayout=function(){var e=this._strategy.layout();this._originalDomNode.style.width=e+"px",this._originalDomNode.style.left="0px",this._modifiedDomNode.style.width=this._width-e+"px",this._modifiedDomNode.style.left=e+"px",this._overviewDomElement.style.top="0px",this._overviewDomElement.style.width=i.ENTIRE_DIFF_OVERVIEW_WIDTH+"px",this._overviewDomElement.style.left=this._width-i.ENTIRE_DIFF_OVERVIEW_WIDTH+"px",this._overviewViewportDomElement.style.width=i.ENTIRE_DIFF_OVERVIEW_WIDTH+"px",this._overviewViewportDomElement.style.height="30px",this.originalEditor.layout({width:e,height:this._height}),this.modifiedEditor.layout({width:this._width-e-i.ENTIRE_DIFF_OVERVIEW_WIDTH,height:this._height}),(this._originalOverviewRuler||this._modifiedOverviewRuler)&&this._layoutOverviewRulers(),this._layoutOverviewViewport()},i.prototype._layoutOverviewViewport=function(){var e=this._computeOverviewViewport();e?(d.StyleMutator.setTop(this._overviewViewportDomElement,e.top),d.StyleMutator.setHeight(this._overviewViewportDomElement,e.height)):(d.StyleMutator.setTop(this._overviewViewportDomElement,0),d.StyleMutator.setHeight(this._overviewViewportDomElement,0))},i.prototype._computeOverviewViewport=function(){var e=this.modifiedEditor.getLayoutInfo();if(!e)return null;var i=this.modifiedEditor.getScrollTop(),t=this.modifiedEditor.getScrollHeight(),o=Math.max(0,e.contentHeight),n=Math.max(0,o-0),r=t>0?n/t:0,s=Math.max(1,Math.floor(e.contentHeight*r)),d=Math.floor(i*r);return{height:s,top:d}},i.prototype._createDataSource=function(){var e=this;return{getWidth:function(){return e._width},getHeight:function(){return e._height},getContainerDomNode:function(){return e._containerDomElement},relayoutEditors:function(){e._doLayout()},getOriginalEditor:function(){return e.originalEditor},getModifiedEditor:function(){return e.modifiedEditor}}},i.prototype._setStrategy=function(e){this._strategy&&this._strategy.dispose(),this._strategy=e,this._lineChanges&&this._updateDecorations(),this._measureDomElement(!0)},i.prototype._getLineChangeAtOrBeforeLineNumber=function(e,i){if(0===this._lineChanges.length||e<i(this._lineChanges[0]))return null;for(var t=0,o=this._lineChanges.length-1;t<o;){var n=Math.floor((t+o)/2),r=i(this._lineChanges[n]),s=n+1<=o?i(this._lineChanges[n+1]):Number.MAX_VALUE;e<r?o=n-1:e>=s?t=n+1:(t=n,o=n)}return this._lineChanges[t]},i.prototype._getEquivalentLineForOriginalLineNumber=function(e){var i=this._getLineChangeAtOrBeforeLineNumber(e,function(e){return e.originalStartLineNumber});if(!i)return e;var t=i.originalStartLineNumber+(i.originalEndLineNumber>0?-1:0),o=i.modifiedStartLineNumber+(i.modifiedEndLineNumber>0?-1:0),n=i.originalEndLineNumber>0?i.originalEndLineNumber-i.originalStartLineNumber+1:0,r=i.modifiedEndLineNumber>0?i.modifiedEndLineNumber-i.modifiedStartLineNumber+1:0,s=e-t;return s<=n?o+Math.min(s,r):o+r-n+s},i.prototype._getEquivalentLineForModifiedLineNumber=function(e){var i=this._getLineChangeAtOrBeforeLineNumber(e,function(e){return e.modifiedStartLineNumber});if(!i)return e;var t=i.originalStartLineNumber+(i.originalEndLineNumber>0?-1:0),o=i.modifiedStartLineNumber+(i.modifiedEndLineNumber>0?-1:0),n=i.originalEndLineNumber>0?i.originalEndLineNumber-i.originalStartLineNumber+1:0,r=i.modifiedEndLineNumber>0?i.modifiedEndLineNumber-i.modifiedStartLineNumber+1:0,s=e-o;return s<=r?t+Math.min(s,n):t+n-r+s},i.prototype.getDiffLineInformationForOriginal=function(e){return this._lineChanges?{equivalentLineNumber:this._getEquivalentLineForOriginalLineNumber(e)}:null},i.prototype.getDiffLineInformationForModified=function(e){return this._lineChanges?{equivalentLineNumber:this._getEquivalentLineForModifiedLineNumber(e)}:null},i.ONE_OVERVIEW_WIDTH=15,i.ENTIRE_DIFF_OVERVIEW_WIDTH=30,i.UPDATE_DIFF_DECORATIONS_DELAY=200,i=__decorate([__param(2,g.IEditorWorkerService),__param(3,l.IKeybindingService),__param(4,h.IInstantiationService)],i)}(o.EventEmitter);i.DiffEditorWidget=I;var V=function(){function e(e){this._dataSource=e}return e.prototype.getEditorsDiffDecorations=function(e,i,t,o,n,r){o=o.sort(function(e,i){return e.afterLineNumber-i.afterLineNumber}),t=t.sort(function(e,i){return e.afterLineNumber-i.afterLineNumber});var s=this._getViewZones(e,t,o,n,r),d=this._getOriginalEditorDecorations(e,i,n,r),a=this._getModifiedEditorDecorations(e,i,n,r);return{original:{decorations:d.decorations,overviewZones:d.overviewZones,zones:s.original},modified:{decorations:a.decorations,overviewZones:a.overviewZones,zones:s.modified}}},e.prototype._getViewZones=function(e,i,t,o,n){return null},e.prototype._getOriginalEditorDecorations=function(e,i,t,o){return null},e.prototype._getModifiedEditorDecorations=function(e,i,t,o){return null},e}(),O=function(){function e(e){this._source=e,this._index=-1,this.advance()}return e.prototype.advance=function(){this._index++,this._index<this._source.length?this.current=this._source[this._index]:this.current=null},e}(),R=function(){function e(e,i,t){this.lineChanges=e,this.originalForeignVZ=i,this.modifiedForeignVZ=t}return e.prototype.getViewZones=function(){var e,i,t,o,n,r,s,d={original:[],modified:[]},a=0,h=0,l=0,u=0,f=0,m=0,c=0,g=function(e,i){return e.afterLineNumber-i.afterLineNumber},p=function(e,i){if(null===i.domNode&&e.length>0){var t=e[e.length-1];if(t.afterLineNumber===i.afterLineNumber&&null===t.domNode)return void(t.heightInLines+=i.heightInLines)}e.push(i)},_=new O(this.modifiedForeignVZ),E=new O(this.originalForeignVZ);for(e=0,i=this.lineChanges.length;e<=i;e++){for(t=e<i?this.lineChanges[e]:null,null!==t?(l=t.originalStartLineNumber+(t.originalEndLineNumber>0?-1:0),u=t.modifiedStartLineNumber+(t.modifiedEndLineNumber>0?-1:0),h=t.originalEndLineNumber>0?t.originalEndLineNumber-t.originalStartLineNumber+1:0,a=t.modifiedEndLineNumber>0?t.modifiedEndLineNumber-t.modifiedStartLineNumber+1:0,f=Math.max(t.originalStartLineNumber,t.originalEndLineNumber),m=Math.max(t.modifiedStartLineNumber,t.modifiedEndLineNumber)):(l+=1e7+h,u+=1e7+a,f=l,m=u),o=[],n=[];_.current&&_.current.afterLineNumber<=m;)c=_.current.afterLineNumber<=u?l-u+_.current.afterLineNumber:f,o.push({afterLineNumber:c,heightInLines:_.current.heightInLines,domNode:null}),_.advance();for(;E.current&&E.current.afterLineNumber<=f;)c=E.current.afterLineNumber<=l?u-l+E.current.afterLineNumber:m,n.push({afterLineNumber:c,heightInLines:E.current.heightInLines,domNode:null}),E.advance();if(null!==t&&L(t)){var v=this._produceOriginalFromDiff(t,h,a);v&&o.push(v)}if(null!==t&&b(t)){var v=this._produceModifiedFromDiff(t,h,a);v&&n.push(v)}for(r=0,s=0,o=o.sort(g),n=n.sort(g);r<o.length&&s<n.length;){var y=o[r],w=n[s],S=y.afterLineNumber-l,N=w.afterLineNumber-u;S<N?(p(d.original,y),r++):N<S?(p(d.modified,w),s++):y.shouldNotShrink?(p(d.original,y),r++):w.shouldNotShrink?(p(d.modified,w),s++):y.heightInLines>=w.heightInLines?(y.heightInLines-=w.heightInLines,s++):(w.heightInLines-=y.heightInLines,r++)}for(;r<o.length;)p(d.original,o[r]),r++;for(;s<n.length;)p(d.modified,n[s]),s++}var C=function(e){e.domNode||(e.domNode=D())};return d.original.forEach(C),d.modified.forEach(C),d},e}(),M=function(e){function i(i,t){var o=this;e.call(this,i),this._disableSash=t===!1,this._sashRatio=null,this._sashPosition=null,this._sash=new a.Sash(this._dataSource.getContainerDomNode(),this),this._disableSash&&this._sash.disable(),this._sash.addListener2("start",function(){return o.onSashDragStart()}),this._sash.addListener2("change",function(e){return o.onSashDrag(e)}),this._sash.addListener2("end",function(){return o.onSashDragEnd()}),this._sash.addListener2("reset",function(){return o.onSashReset()})}return __extends(i,e),i.prototype.dispose=function(){this._sash.dispose()},i.prototype.setEnableSplitViewResizing=function(e){var i=e===!1;this._disableSash!==i&&(this._disableSash=i,this._disableSash?this._sash.disable():this._sash.enable())},i.prototype.layout=function(e){void 0===e&&(e=this._sashRatio);var t=this._dataSource.getWidth(),o=t-I.ENTIRE_DIFF_OVERVIEW_WIDTH,n=Math.floor((e||.5)*o),r=Math.floor(.5*o);return n=this._disableSash?r:n||r,o>2*i.MINIMUM_EDITOR_WIDTH?(n<i.MINIMUM_EDITOR_WIDTH&&(n=i.MINIMUM_EDITOR_WIDTH),n>o-i.MINIMUM_EDITOR_WIDTH&&(n=o-i.MINIMUM_EDITOR_WIDTH)):n=r,this._sashPosition!==n&&(this._sashPosition=n,this._sash.layout()),this._sashPosition},i.prototype.onSashDragStart=function(){this._startSashPosition=this._sashPosition},i.prototype.onSashDrag=function(e){var i=this._dataSource.getWidth(),t=i-I.ENTIRE_DIFF_OVERVIEW_WIDTH,o=this.layout((this._startSashPosition+(e.currentX-e.startX))/t);this._sashRatio=o/t,this._dataSource.relayoutEditors()},i.prototype.onSashDragEnd=function(){this._sash.layout()},i.prototype.onSashReset=function(){this._sashRatio=.5,this._dataSource.relayoutEditors(),this._sash.layout()},i.prototype.getVerticalSashTop=function(e){return 0},i.prototype.getVerticalSashLeft=function(e){return this._sashPosition},i.prototype.getVerticalSashHeight=function(e){return this._dataSource.getHeight()},i.prototype._getViewZones=function(e,i,t,o,n){var r=new T(e,i,t);return r.getViewZones()},i.prototype._getOriginalEditorDecorations=function(e,i,t,o){var n,r,s,d,a,h,l,u,f,m={decorations:[],overviewZones:[]},g=t.getModel();for(n=0,r=e.length;n<r;n++)if(a=e[n],b(a)&&(m.decorations.push(S(a.originalStartLineNumber,1,a.originalEndLineNumber,Number.MAX_VALUE,"line-delete",!0)),L(a)&&a.charChanges||m.decorations.push(S(a.originalStartLineNumber,1,a.originalEndLineNumber,Number.MAX_VALUE,"char-delete",!0)),m.overviewZones.push(new c.OverviewRulerZone(a.originalStartLineNumber,a.originalEndLineNumber,c.OverviewRulerLane.Full,0,"rgba(255, 0, 0, 0.4)","rgba(255, 0, 0, 0.4)")),a.charChanges))for(s=0,d=a.charChanges.length;s<d;s++)if(h=a.charChanges[s],b(h))if(i)for(l=h.originalStartLineNumber;l<=h.originalEndLineNumber;l++)u=l===h.originalStartLineNumber?h.originalStartColumn:g.getLineFirstNonWhitespaceColumn(l),f=l===h.originalEndLineNumber?h.originalEndColumn:g.getLineLastNonWhitespaceColumn(l),m.decorations.push(S(l,u,l,f,"char-delete",!1));else m.decorations.push(S(h.originalStartLineNumber,h.originalStartColumn,h.originalEndLineNumber,h.originalEndColumn,"char-delete",!1));return m},i.prototype._getModifiedEditorDecorations=function(e,i,t,o){var n,r,s,d,a,h,l,u,f,m={decorations:[],overviewZones:[]},g=o.getModel();for(n=0,r=e.length;n<r;n++)if(a=e[n],L(a)&&(m.decorations.push(S(a.modifiedStartLineNumber,1,a.modifiedEndLineNumber,Number.MAX_VALUE,"line-insert",!0)),b(a)&&a.charChanges||m.decorations.push(S(a.modifiedStartLineNumber,1,a.modifiedEndLineNumber,Number.MAX_VALUE,"char-insert",!0)),m.overviewZones.push(new c.OverviewRulerZone(a.modifiedStartLineNumber,a.modifiedEndLineNumber,c.OverviewRulerLane.Full,0,"rgba(155, 185, 85, 0.4)","rgba(155, 185, 85, 0.4)")),a.charChanges))for(s=0,d=a.charChanges.length;s<d;s++)if(h=a.charChanges[s],L(h))if(i)for(l=h.modifiedStartLineNumber;l<=h.modifiedEndLineNumber;l++)u=l===h.modifiedStartLineNumber?h.modifiedStartColumn:g.getLineFirstNonWhitespaceColumn(l),f=l===h.modifiedEndLineNumber?h.modifiedEndColumn:g.getLineLastNonWhitespaceColumn(l),m.decorations.push(S(l,u,l,f,"char-insert",!1));else m.decorations.push(S(h.modifiedStartLineNumber,h.modifiedStartColumn,h.modifiedEndLineNumber,h.modifiedEndColumn,"char-insert",!1));return m},i.MINIMUM_EDITOR_WIDTH=100,i}(V),T=function(e){function i(i,t,o){e.call(this,i,t,o)}return __extends(i,e),i.prototype._produceOriginalFromDiff=function(e,i,t){return t>i?{afterLineNumber:Math.max(e.originalStartLineNumber,e.originalEndLineNumber),heightInLines:t-i,domNode:null}:null},i.prototype._produceModifiedFromDiff=function(e,i,t){return i>t?{afterLineNumber:Math.max(e.modifiedStartLineNumber,e.modifiedEndLineNumber),heightInLines:i-t,domNode:null}:null},i}(R),W=function(e){function i(i,t){var o=this;e.call(this,i),this.decorationsLeft=i.getOriginalEditor().getLayoutInfo().decorationsLeft,this.toDispose=[],this.toDispose.push(i.getOriginalEditor().onDidLayoutChange(function(e){o.decorationsLeft!==e.decorationsLeft&&(o.decorationsLeft=e.decorationsLeft,i.relayoutEditors())}))}return __extends(i,e),i.prototype.dispose=function(){this.toDispose=n.dispose(this.toDispose);
},i.prototype.setEnableSplitViewResizing=function(e){},i.prototype._getViewZones=function(e,i,t,o,n){var r=new F(e,i,t,o,n);return r.getViewZones()},i.prototype._getOriginalEditorDecorations=function(e,i,t,o){var n,r,s,d={decorations:[],overviewZones:[]};for(n=0,r=e.length;n<r;n++)s=e[n],b(s)&&d.overviewZones.push(new c.OverviewRulerZone(s.originalStartLineNumber,s.originalEndLineNumber,c.OverviewRulerLane.Full,0,"rgba(255, 0, 0, 0.4)","rgba(255, 0, 0, 0.4)"));return d},i.prototype._getModifiedEditorDecorations=function(e,i,t,o){var n,r,s,d,a,h,l,u,f,m={decorations:[],overviewZones:[]},g=o.getModel();for(n=0,r=e.length;n<r;n++)if(s=e[n],L(s))if(m.decorations.push(S(s.modifiedStartLineNumber,1,s.modifiedEndLineNumber,Number.MAX_VALUE,"line-insert",!0)),m.overviewZones.push(new c.OverviewRulerZone(s.modifiedStartLineNumber,s.modifiedEndLineNumber,c.OverviewRulerLane.Full,0,"rgba(155, 185, 85, 0.4)","rgba(155, 185, 85, 0.4)")),s.charChanges){for(d=0,a=s.charChanges.length;d<a;d++)if(h=s.charChanges[d],L(h))if(i)for(l=h.modifiedStartLineNumber;l<=h.modifiedEndLineNumber;l++)u=l===h.modifiedStartLineNumber?h.modifiedStartColumn:g.getLineFirstNonWhitespaceColumn(l),f=l===h.modifiedEndLineNumber?h.modifiedEndColumn:g.getLineLastNonWhitespaceColumn(l),m.decorations.push(S(l,u,l,f,"char-insert",!1));else m.decorations.push(S(h.modifiedStartLineNumber,h.modifiedStartColumn,h.modifiedEndLineNumber,h.modifiedEndColumn,"char-insert",!1))}else m.decorations.push(S(s.modifiedStartLineNumber,1,s.modifiedEndLineNumber,Number.MAX_VALUE,"char-insert",!0));return m},i.prototype.layout=function(){return Math.max(5,this.decorationsLeft)},i}(V),F=function(e){function i(i,t,o,n,r){e.call(this,i,t,o),this.originalModel=n.getModel(),this.modifiedEditorConfiguration=r.getConfiguration(),this.modifiedEditorTabSize=r.getModel().getOptions().tabSize}return __extends(i,e),i.prototype._produceOriginalFromDiff=function(e,i,t){return{afterLineNumber:Math.max(e.originalStartLineNumber,e.originalEndLineNumber),heightInLines:t,domNode:document.createElement("div")}},i.prototype._produceModifiedFromDiff=function(e,i,t){var o,n,r,s=[];if(e.charChanges)for(o=0,n=e.charChanges.length;o<n;o++)r=e.charChanges[o],b(r)&&s.push(new w.InlineDecoration(new m.Range(r.originalStartLineNumber,r.originalStartColumn,r.originalEndLineNumber,r.originalEndColumn),"char-delete"));var d,a=[];for(d=e.originalStartLineNumber;d<=e.originalEndLineNumber;d++)a=a.concat(this.renderOriginalLine(d-e.originalStartLineNumber,this.originalModel,this.modifiedEditorConfiguration,this.modifiedEditorTabSize,d,s));var h=document.createElement("div");return h.className="view-lines line-delete",h.innerHTML=a.join(""),y.Configuration.applyFontInfoSlow(h,this.modifiedEditorConfiguration.fontInfo),{shouldNotShrink:!0,afterLineNumber:0===e.modifiedEndLineNumber?e.modifiedStartLineNumber:e.modifiedStartLineNumber-1,heightInLines:i,domNode:h}},i.prototype.renderOriginalLine=function(e,i,t,o,n,r){var s=i.getLineContent(n),d=new v.ViewLineTokens([new v.ViewLineToken(0,"")],0,s.length),a=p.createLineParts(n,1,s,o,d,r,t.viewInfo.renderWhitespace),h=_.renderLine(new _.RenderLineInput(s,o,t.fontInfo.spaceWidth,t.viewInfo.stopRenderingLineAfter,t.viewInfo.renderWhitespace,t.viewInfo.renderControlCharacters,a.getParts())),l=[];return l.push('<div class="view-line'),0===r.length&&l.push(" char-delete"),l.push('" style="top:'),l.push(String(e*t.lineHeight)),l.push('px;width:1000000px;">'),l=l.concat(h.output),l.push("</div>"),l},i}(R)});
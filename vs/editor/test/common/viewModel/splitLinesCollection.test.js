define(["require", "exports", 'assert', 'vs/editor/common/core/position', 'vs/editor/common/viewModel/characterHardWrappingLineMapper', 'vs/editor/common/viewModel/prefixSumComputer', 'vs/editor/common/viewModel/splitLinesCollection', 'vs/editor/test/common/mocks/mockConfiguration', 'vs/editor/common/model/model', 'vs/editor/common/editorCommon'], function (require, exports, assert, position_1, characterHardWrappingLineMapper_1, prefixSumComputer_1, splitLinesCollection_1, mockConfiguration_1, model_1, editorCommon) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    suite('Editor ViewModel - SplitLinesCollection', function () {
        test('SplitLine', function () {
            var model1 = createModel('My First LineMy Second LineAnd another one');
            var line1 = createSplitLine([13, 14, 15], '');
            assert.equal(line1.getOutputLineCount(), 3);
            assert.equal(line1.getOutputLineContent(model1, 1, 0), 'My First Line');
            assert.equal(line1.getOutputLineContent(model1, 1, 1), 'My Second Line');
            assert.equal(line1.getOutputLineContent(model1, 1, 2), 'And another one');
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 0), 14);
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 1), 15);
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 2), 16);
            for (var col = 1; col <= 14; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(0, col), col, 'getInputColumnOfOutputPosition(0, ' + col + ')');
            }
            for (var col = 1; col <= 15; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(1, col), 13 + col, 'getInputColumnOfOutputPosition(1, ' + col + ')');
            }
            for (var col = 1; col <= 16; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(2, col), 13 + 14 + col, 'getInputColumnOfOutputPosition(2, ' + col + ')');
            }
            for (var col = 1; col <= 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(0, col), 'getOutputPositionOfInputPosition(' + col + ')');
            }
            for (var col = 1 + 13; col <= 14 + 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(1, col - 13), 'getOutputPositionOfInputPosition(' + col + ')');
            }
            for (var col = 1 + 13 + 14; col <= 15 + 14 + 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(2, col - 13 - 14), 'getOutputPositionOfInputPosition(' + col + ')');
            }
            model1 = createModel('My First LineMy Second LineAnd another one');
            line1 = createSplitLine([13, 14, 15], '\t');
            assert.equal(line1.getOutputLineCount(), 3);
            assert.equal(line1.getOutputLineContent(model1, 1, 0), 'My First Line');
            assert.equal(line1.getOutputLineContent(model1, 1, 1), '\tMy Second Line');
            assert.equal(line1.getOutputLineContent(model1, 1, 2), '\tAnd another one');
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 0), 14);
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 1), 16);
            assert.equal(line1.getOutputLineMaxColumn(model1, 1, 2), 17);
            for (var col = 1; col <= 14; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(0, col), col, 'getInputColumnOfOutputPosition(0, ' + col + ')');
            }
            for (var col = 1; col <= 1; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(1, 1), 13 + col, 'getInputColumnOfOutputPosition(1, ' + col + ')');
            }
            for (var col = 2; col <= 16; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(1, col), 13 + col - 1, 'getInputColumnOfOutputPosition(1, ' + col + ')');
            }
            for (var col = 1; col <= 1; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(2, col), 13 + 14 + col, 'getInputColumnOfOutputPosition(2, ' + col + ')');
            }
            for (var col = 2; col <= 17; col++) {
                assert.equal(line1.getInputColumnOfOutputPosition(2, col), 13 + 14 + col - 1, 'getInputColumnOfOutputPosition(2, ' + col + ')');
            }
            for (var col = 1; col <= 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(0, col), 'getOutputPositionOfInputPosition(' + col + ')');
            }
            for (var col = 1 + 13; col <= 14 + 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(1, 1 + col - 13), 'getOutputPositionOfInputPosition(' + col + ')');
            }
            for (var col = 1 + 13 + 14; col <= 15 + 14 + 13; col++) {
                assert.deepEqual(line1.getOutputPositionOfInputPosition(0, col), pos(2, 1 + col - 13 - 14), 'getOutputPositionOfInputPosition(' + col + ')');
            }
        });
        test('issue #3662', function () {
            var config = new mockConfiguration_1.MockConfiguration({});
            var hardWrappingLineMapperFactory = new characterHardWrappingLineMapper_1.CharacterHardWrappingLineMapperFactory(config.editor.wordWrapBreakBeforeCharacters, config.editor.wordWrapBreakAfterCharacters, config.editor.wordWrapBreakObtrusiveCharacters);
            var model = new model_1.Model([
                'int main() {',
                '\tprintf("Hello world!");',
                '}',
                'int main() {',
                '\tprintf("Hello world!");',
                '}',
            ].join('\n'), model_1.Model.DEFAULT_CREATION_OPTIONS, null);
            var linesCollection = new splitLinesCollection_1.SplitLinesCollection(model, hardWrappingLineMapperFactory, model.getOptions().tabSize, config.editor.wrappingInfo.wrappingColumn, config.editor.typicalFullwidthCharacterWidth / config.editor.typicalHalfwidthCharacterWidth, editorCommon.wrappingIndentFromString(config.editor.wrappingIndent));
            linesCollection.setHiddenAreas([{
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 3,
                    endColumn: 1
                }, {
                    startLineNumber: 5,
                    startColumn: 1,
                    endLineNumber: 6,
                    endColumn: 1
                }], function (eventType, payload) { });
            var viewLineCount = linesCollection.getOutputLineCount();
            assert.equal(viewLineCount, 1, 'getOutputLineCount()');
            var modelLineCount = model.getLineCount();
            for (var lineNumber = 0; lineNumber <= modelLineCount + 1; lineNumber++) {
                var lineMinColumn = (lineNumber >= 1 && lineNumber <= modelLineCount) ? model.getLineMinColumn(lineNumber) : 1;
                var lineMaxColumn = (lineNumber >= 1 && lineNumber <= modelLineCount) ? model.getLineMaxColumn(lineNumber) : 1;
                for (var column = lineMinColumn - 1; column <= lineMaxColumn + 1; column++) {
                    var viewPosition = linesCollection.convertInputPositionToOutputPosition(lineNumber, column);
                    // validate view position
                    var viewLineNumber = viewPosition.lineNumber;
                    var viewColumn = viewPosition.column;
                    if (viewLineNumber < 1) {
                        viewLineNumber = 1;
                    }
                    var lineCount = linesCollection.getOutputLineCount();
                    if (viewLineNumber > lineCount) {
                        viewLineNumber = lineCount;
                    }
                    var viewMinColumn = linesCollection.getOutputLineMinColumn(viewLineNumber);
                    var viewMaxColumn = linesCollection.getOutputLineMaxColumn(viewLineNumber);
                    if (viewColumn < viewMinColumn) {
                        viewColumn = viewMinColumn;
                    }
                    if (viewColumn > viewMaxColumn) {
                        viewColumn = viewMaxColumn;
                    }
                    var validViewPosition = new position_1.Position(viewLineNumber, viewColumn);
                    assert.equal(viewPosition.toString(), validViewPosition.toString(), 'model->view for ' + lineNumber + ', ' + column);
                }
            }
            for (var lineNumber = 0; lineNumber <= viewLineCount + 1; lineNumber++) {
                var lineMinColumn = linesCollection.getOutputLineMinColumn(lineNumber);
                var lineMaxColumn = linesCollection.getOutputLineMaxColumn(lineNumber);
                for (var column = lineMinColumn - 1; column <= lineMaxColumn + 1; column++) {
                    var modelPosition = linesCollection.convertOutputPositionToInputPosition(lineNumber, column);
                    var validModelPosition = model.validatePosition(modelPosition);
                    assert.equal(modelPosition.toString(), validModelPosition.toString(), 'view->model for ' + lineNumber + ', ' + column);
                }
            }
            linesCollection.dispose();
            model.dispose();
            config.dispose();
        });
    });
    function pos(lineNumber, column) {
        return new position_1.Position(lineNumber, column);
    }
    function createSplitLine(splitLengths, wrappedLinesPrefix, isVisible) {
        if (isVisible === void 0) { isVisible = true; }
        return new splitLinesCollection_1.SplitLine(createLineMapping(splitLengths, wrappedLinesPrefix), isVisible);
    }
    function createLineMapping(breakingLengths, wrappedLinesPrefix) {
        return new characterHardWrappingLineMapper_1.CharacterHardWrappingLineMapping(new prefixSumComputer_1.PrefixSumComputer(breakingLengths), wrappedLinesPrefix);
    }
    function createModel(text) {
        return {
            getLineTokens: function (lineNumber, inaccurateTokensAcceptable) {
                return null;
            },
            getLineContent: function (lineNumber) {
                return text;
            },
            getLineMinColumn: function (lineNumber) {
                return 1;
            },
            getLineMaxColumn: function (lineNumber) {
                return text.length + 1;
            }
        };
    }
});
//# sourceMappingURL=splitLinesCollection.test.js.map
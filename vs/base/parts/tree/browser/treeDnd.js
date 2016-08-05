define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ElementsDragAndDropData = (function () {
        function ElementsDragAndDropData(elements) {
            this.elements = elements;
        }
        ElementsDragAndDropData.prototype.update = function (event) {
            // no-op
        };
        ElementsDragAndDropData.prototype.getData = function () {
            return this.elements;
        };
        return ElementsDragAndDropData;
    }());
    exports.ElementsDragAndDropData = ElementsDragAndDropData;
    var ExternalElementsDragAndDropData = (function () {
        function ExternalElementsDragAndDropData(elements) {
            this.elements = elements;
        }
        ExternalElementsDragAndDropData.prototype.update = function (event) {
            // no-op
        };
        ExternalElementsDragAndDropData.prototype.getData = function () {
            return this.elements;
        };
        return ExternalElementsDragAndDropData;
    }());
    exports.ExternalElementsDragAndDropData = ExternalElementsDragAndDropData;
    var DesktopDragAndDropData = (function () {
        function DesktopDragAndDropData() {
            this.types = [];
            this.files = [];
        }
        DesktopDragAndDropData.prototype.update = function (event) {
            if (event.dataTransfer.types) {
                this.types = [];
                Array.prototype.push.apply(this.types, event.dataTransfer.types);
            }
            if (event.dataTransfer.files) {
                this.files = [];
                Array.prototype.push.apply(this.files, event.dataTransfer.files);
                this.files = this.files.filter(function (f) { return f.size || f.type; });
            }
        };
        DesktopDragAndDropData.prototype.getData = function () {
            return {
                types: this.types,
                files: this.files
            };
        };
        return DesktopDragAndDropData;
    }());
    exports.DesktopDragAndDropData = DesktopDragAndDropData;
});
//# sourceMappingURL=treeDnd.js.map
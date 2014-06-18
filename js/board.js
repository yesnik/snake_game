var Board = function (boardId, config) {
    'use strict';
    var options = $.extend({
        widthPx: 10,
        heightPx: 10,
        rows: 10,
        cols: 10
    }, config);
    if (boardId === undefined) {
        throw ({message: "board_id is required in Board class constructor"});
    }

    this.widthPx = options.widthPx;
    this.heightPx = options.heightPx;
    this.rows = options.rows;
    this.cols = options.cols;
    this.boardId = boardId;
};
Board.prototype = {
    create: function () {
        'use strict';
        var boardHtml = this.getBoardHtml(),
            board_el = $('#' + this.boardId);
        if (board_el.length === 0) {
            throw ({message: 'Element with id #' + this.boardId + ' was not found on page.'});
        }
        board_el.html(boardHtml);
    },
    getBoardHtml: function () {
        'use strict';
        var i, html = '';
        for (i = 0; i < this.rows; i += 1) {
            html += '<li>';
            html += this.getRowHtml();
            html += '</li>';
        }
        return html;
    },
    getRowHtml: function () {
        'use strict';
        var i, html = '';
        for (i = 0; i < this.cols; i += 1) {
            html += '<div></div>';
        }
        return html;
    }
};

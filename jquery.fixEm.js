(function ($) {

    $.fn.fixEm = function (options) {

        var settings = $.extend({
            'fixedHeader' : true,
            'fixedColumn': false,
            'scrollX': true,
            'scrollY':true,
            'width':parseInt($(window).width() * .75) + 'px',
            'height': parseInt($(window).height() * .75) + 'px',
            'numColumns': 1,
            'resizable':false
        }, options);
       
        var $mainTable = $(this);
        this.wrap('<div id="mainWrap" style="width:' + settings.width + ';height:' + settings.height + ';" />');
        var $mainWrap = $('#mainWrap');
        var $stickyColWrap = $('<div id="stickyColWrap"style="position: absolute;top: auto;left: ' + $mainTable.offset().left + 'px;overflow: hidden;z-index:998" />');
        var $fixedHeaderWrap = $('<div id="fixedHeaderWrap" style="position: absolute;top: ' + $mainTable.offset().top + 'px;overflow: hidden;z-index:998" />');
        var $apexWrap = $('<div id="apexWrap" style="position: absolute;top: ' + $mainTable.offset().top + 'px;overflow: hidden;left: ' + $mainTable.offset().left + 'px;z-index:999"/>');
        var $mainTableWrap = $('<div id="mainTableWrap" style="overflow-x: '+(settings.scrollX ? 'scroll' : 'visible')+';overflow-y: '+(settings.scrollY ? 'scroll':'visible')+';width:' + (settings.scrollX ? settings.width : ($mainTable.width() + 'px')) + ';height:' + (settings.scrollY ? settings.height : ($mainTable.height() + 'px')) + ';position: absolute;top: auto;"/>');
   
        $mainWrap.append($stickyColWrap);
        $mainTableWrap.append($mainTable);
        $mainWrap.append($mainTableWrap);

       
        if (settings.fixedColumn) {
            var $colTable = $('<table class="'+$mainTable.attr('class')+'" id="colTable" />');
            var $colTableBody = $('<tbody id="colTableBody" />');
            var $colTableHead = $('<thead id="colTableHead" />');

            //append elements to column table
            $colTable.append($colTableHead);
            $colTable.append($colTableBody);

            //append column table to wrapper div
            $stickyColWrap.append($colTable);

            var colThSelector = '';
            for (var x = 1; x <= settings.numColumns; x++) {

                colThSelector += 'th:nth-child(' + x + ')';
                if (x < settings.numColumns)
                    colThSelector += ', ';
            }
            console.log(colThSelector);
            var $colThs = $mainTable.find('thead').find(colThSelector);
            //create a new tr element and append the Resource heading
            $colTableHead.append($colThs);
            $colTableHead.find('th').wrapAll('<tr />');


           

            var $mainTableBody = $mainTable.find('tbody');
            var colTdSelector = '';
            for (var x = 1; x <= settings.numColumns; x++) {

                colTdSelector += 'td:nth-child(' + x + ')';
                if (x < settings.numColumns)
                    colTdSelector += ', ';
            }

            $.each($mainTableBody.find('tr'), function (index, tr) {
                var $row = $(tr).clone();
                $row.html('');
                if ($row.css('background') == '') {
                    if ($('body').css('background-color') == "rgba(0, 0, 0, 0)")
                        $row.css('background', "white");
                    else
                        $row.css('background', $('body').css('background-color'));
                }
                $row.append($(tr).find(colTdSelector).clone());
                $colTableBody.append($row);
            });

            $.each($mainTableBody.find('tr'), function (index, tr) {
                $(tr).find(colTdSelector).remove();
            });

            $stickyColWrap.height($mainTableWrap.height() - 18);
            $stickyColWrap.css('border-bottom', $mainTable.css('border'));
            $mainTableWrap.offset({ left: $stickyColWrap.width() + $(this).offset().left });
        }

        if (settings.fixedHeader) {
            var $fixedHeaderTable = $mainTable.clone();
            $fixedHeaderTable.find('tbody').remove();
           
           $fixedHeaderWrap.append($fixedHeaderTable);
           $mainWrap.append($fixedHeaderWrap);
           $fixedHeaderWrap.offset({ left: $(this).offset().left });
           $fixedHeaderWrap.width($mainTableWrap.width() - 17);
          
        }

        if (settings.fixedHeader && settings.fixedColumn) {
            $apexTable = $mainTable.clone();
            $apexTable.html('');            
            $apexTable.append($colTableHead.clone());
            $apexTable.css('width', $colTable.width());
           
            $apexWrap.append($apexTable);
           // $apexWrap.offset({ left: $colTable.offset().left, top: $colTable.offset().top });

            $mainWrap.append($apexWrap);
        }

        $mainTableWrap.scroll(function () {
            $stickyColWrap.scrollTop($(this).scrollTop());
            $fixedHeaderWrap.scrollLeft($(this).scrollLeft());
        });

        if (settings.resizable) {
            $(window).resize(function () {
                $fixedHeaderWrap.width($('#mainTableWrap').width() - 17);
                $stickyColWrap.height($('#mainTableWrap').height() - 18);
            });
        }

    };


}(jQuery));
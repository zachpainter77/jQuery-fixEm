jQuery-fixEm
============

jQuery plugin to fix table headers and or table columns while scrolling table vertically or horizontally

This is a standard jquery plugin.... To use the plugin you need to first create your table with tbody and thead elemnts and 
then call the function on the selected jquery element..

default options:

{
            'fixedHeader' : true,
            'fixedColumn': false,
            'scrollX': true,
            'scrollY':true,
            'width':parseInt($(window).width() * .75) + 'px',
            'height': parseInt($(window).height() * .75) + 'px',
            'numColumns': 1,
            'resizable':false
}


you can change these options by passing an options object to the function...

example:

$('#myTableId').fixEm({ fixedHeader: false, scrollY: false });

Enjoy..

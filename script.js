var TileJSONs = [
    'http://a.tiles.mapbox.com/v3/moasth.map-pzgtnf9m.jsonp',
    'http://a.tiles.mapbox.com/v3/moasth.map-czvq0pvt.jsonp',
    'http://a.tiles.mapbox.com/v3/moasth.chateaux.jsonp'];

var $content = $("#content");
$content.mCustomScrollbar({
    theme: 'dark-2',
    scrollButtons: {
        enable: true
    },
    advanced: {
        updateOnContentResize: true
    }
});
$content.resizable({
    maxWidth: 650,
    minWidth: 400,
    handles: 'w',
    resize: function() {
        $(this).css("right", 0);
        $(this).css("left", "auto");
    }
});

$('#map').mapbox(TileJSONs, function(map, tiledata) {

    // Assign readable names to all layers
    map.getLayerAt(0).named('base');
    map.getLayerAt(1).named('base2');
    map.getLayerAt(2).named('chateaux');

    // Don't composite base layer with other layers
    map.getLayer('base').composite(true);
    map.getLayer('base2').composite(true);
    map.getLayer('chateaux').composite(true);

    // Disable all overlay layers by default
    //map.disableLayer('chateaux');

    // Commenté pour afficher les châteaux dès le chargement de la page
    map.getLayer('chateaux').disable();
    //

    // Set initial latitude, longitude and zoom level
    /*map.setCenterZoom({
        lat: 48.583,
        lon: 7.750
    }, 8);*/
    map.setZoomRange(5, 12);
    map.setPanLimits([{
        lat: 35.3073,
        lon: -19.6518
    }, {
        lat: 59.5726,
        lon: 34.0933
    }]);

    // Set minimum and maximum zoom levels
    //map.setZoomRange(0, 15);

    // Enable share control
    mapbox.share().map(map).add();

    $('[data-control="switcher"] a').switchLayer();
});
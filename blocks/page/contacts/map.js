$(function() {
    var styles = [{
            stylers: [
                { hue: '#c7d4e0' },
                { saturation: -20 }
            ]
        },{
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                { lightness: 100 },
                { visibility: 'simplified' }
            ]
        },{
            featureType: 'road',
            elementType: 'labels',
            stylers: [
                { visibility: 'off' }
            ]
        }
    ];
    var styledMap = new google.maps.StyledMapType(styles, {name: 'autograph map'});
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'autograph_map']
        },
        center: new google.maps.LatLng(56.0615591, 37.861788),
        disableDefaultUI: true,
        zoomControl: true,
        zoom: 15
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(56.0615591, 37.858788),
        map: map,
        icon: 'static/i/icon-point.png'
    });

    map.mapTypes.set('autograph_map', styledMap);
    map.setMapTypeId('autograph_map');
});

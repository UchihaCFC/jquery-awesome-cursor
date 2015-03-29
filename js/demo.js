$(window).load(function() {
  var drawing = false,
    backToTopTemplate;

  $.fn.awesomeCursor.defaults.color = 'white';

  $(document).on('mouseup', function(ev) {
    drawing = false;
  });

  $('canvas').awesomeCursor('pencil', {
    color: 'black',
    hotspot: $('select[name="hotspot"]').val()
  });

  $('#demo-link').awesomeCursor('external-link');

  // Demo sections initial cursors
  $('#iconPanel .panel-body').awesomeCursor('pencil');
  $('#colorPanel .panel-body').awesomeCursor('pencil', {
    color: 'red'
  });
  $('#sizePanel .panel-body').awesomeCursor('pencil', {
    size: 32
  });
  $('#hotspotPanel .panel-body').awesomeCursor('pencil', {
    hotspot: 'bottom left'
  });
  $('#flipPanel .panel-body').awesomeCursor('pencil', {
    flip: 'horizontal'
  });
  $('#rotatePanel .panel-body').awesomeCursor('pencil', {
    rotate: 45
  });
  $('#outlinePanel .panel-body').awesomeCursor('pencil', {
    outline: 'black'
  });

  // Icon demo
  $('#try-icon').on('keyup', 'input', function(ev) {
    if ($(this).val()) {
      $(this).parents('.panel-body').awesomeCursor($(this).val());
    }
  });

  $('#try-icon').on('change', function(ev) {
    trackDemoUsage('icon');
  });

  // Demo forms
  $('form.try').on('change keyup', 'select, input', function(ev) {
    var opts = {},
      $form = $(this).parents('form');

    opts[$form.data('property')] = $(this).val();

    if ($form.parents('.panel-body').find('canvas').length) {
      $form.parents('.panel-body').find('canvas').awesomeCursor('pencil', $.extend(opts, {
        color: 'black'
      }));
    } else {
      $form.parents('.panel-body').awesomeCursor('pencil', opts);
    }

    if (ev.type === 'change') {
      trackDemoUsage($(this).parents('form').data('property'));
    }
  });

  // Icon name demo suggestions
  $('.suggestion').on('click', function(ev) {
    ev.preventDefault();
    $(this).closest('.panel-body').find('input[type="text"]')
      .val($(this).text())
      .trigger('keyup');

    trackDemoUsage('icon (suggested icons)');
  });

  $('form').on('submit', function(ev) {
    ev.preventDefault();
  });

  // Hotspot demo canvas drawing
  $('canvas').on('mousedown', function(ev) {
    drawing = true;
  }).on('mousedown mousemove', function(ev) {
    if (!drawing) {
      return;
    }

    var context = this.getContext('2d'),
      x = ev.pageX - $(this).offset().left,
      y = ev.pageY - $(this).offset().top;

    context.fillRect(x - 2.5, y -2.5, 5, 5);
  }).on('mouseout', function(ev) {
    drawing = false;

    trackDemoUsage('hotspot (canvas draw)');
  });

  // Hotspot demo clear button
  $('.clear-canvas').click(function() {
    var $canvas = $(this).siblings('canvas'),
      context = $canvas[0].getContext('2d');

    context.clearRect(0, 0, $canvas.width(), $canvas.height());

    trackDemoUsage('hotspot (canvas clear)');
  });

  // Examples section
  $('#example1').awesomeCursor('paper-plane', {
    color: '#2cb2da'
  });

  $('#example2').awesomeCursor('paint-brush', {
    color: '#34db33',
    size: 32
  });

  $('#example3').awesomeCursor('ban', {
    color: 'red',
    size: 24,
    hotspot: 'center'
  });

  $('#example4').awesomeCursor('fighter-jet', {
    color: 'hotpink',
    size: 24,
    flip: 'horizontal'
  });

  $('#example5').awesomeCursor('hand-o-up', {
    color: 'skyblue',
    size: 24,
    rotate: 45
  });

  $('#example6').awesomeCursor('pencil', {
    color: 'limegreen',
    size: 32,
    outline: 'brown'
  });

  $('#iframe').ready(function(e) {
    $('#iframe').contents().find('img').awesomeCursor('map-marker', {
      color: 'maroon',
      size: 32,
      hotspot: 'center bottom'
    });
  });

  backToTopTemplate = $('<a />', {
    class: 'text-muted pull-right back-to-top',
    href: '#',
    'data-ga-category': 'buttons',
    'data-ga-label': 'navigation',
    'data-ga-value': 'back-to-top',
    text: ' Back to top'
  }).prepend($('<i />', {
    class: 'fa fa-angle-up',
  }));

  $('section').append(backToTopTemplate.clone());


  // Analytics
  $('[data-ga-category][data-ga-label]').click(function(ev) {
    var data = $(this).data(),
      value = data.gaValue ? parseInt(data.gaValue, 10) : null;

    ga('send', 'event', data.gaCategory, 'click', data.gaLabel, value);
  });

  function trackDemoUsage(label) {
    ga('send', 'event', 'demo', 'interaction', label);
  }

  // Google Maps
  (function initialize() {
    var map = new google.maps.Map($('#google-maps')[0], {
      center: { lat: 37.544494, lng: 138.276398 },
      zoom: 8
    });

    google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
      $('#google-maps').find('div').awesomeCursor('location-arrow', {
        size: 22,
        color: 'orange',
        flip: 'horizontal'
      });
    });
  })();
});

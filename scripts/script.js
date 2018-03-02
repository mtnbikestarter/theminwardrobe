$(document).ready(function() {
  enlargeCard()
  fadeOutText()
  resetCards()
  typeWriter("Simplify your life with functional, affordable clothing that doesn't go out of style.", 0)
})

function enlargeCard() {
  $('.product-card').click(function() {
    $(this).css('animation', 'enlargeAndCenter 1s linear 0s')
    $(this).css('animation-fill-mode', 'forwards')
    $(this).removeClass('not-selected')
    $(this).addClass('selected-card')

    fadeOutTextOverallImage()
    toggleFullText($(this))
    blurNonSelectedCards()
  })
}

function resetCards() {
  $(document).click(function(e) {
      if ($('.selected-card').width() > 301 && !$(e.target).closest('.product-card').hasClass('selected-card')) {
        $('.selected-card').css('animation', 'resetCard 1s linear 0s')
        $('.selected-card').css('animation-fill-mode', 'forwards')
        setTimeout(function() {
          $('.selected-card').removeClass('selected-card')
          $('.product-card:not(.not-selected)').addClass('not-selected')
        }, 200)
        $('.not-selected').each(function() {
          $(this).css('animation', 'easeOutBlur 1s linear 0s')
          $(this).css('animation-fill-mode', 'forwards')
          $(this).css('pointer-events', 'auto')
        })
      }
  });
}


function blurNonSelectedCards() {
  // console.log('called');
  $('.not-selected').each(function() {
    console.log('called blur non selected');
    $(this).css('filter', 'blur(75px)')
    $(this).css('pointer-events', 'none')
  })
}



function enlargeCardOnFadedTextClick(card) {
  card.css('animation', 'enlargeAndCenter 1s linear 0s')
  card.css('animation-fill-mode', 'forwards')
}

function toggleFullText(card) {
  card.find('.full-description').css('display', 'flex')
  card.find('.partial-description').css('display', 'none')
}

function typeWriter(text, n) {
  if (n < (text.length)) {
    $('.intro-text').html(text.substring(0, n+1));
    n++;
    setTimeout(function() {
      typeWriter(text, n)
    }, 75);
  }
}

function fadeOutTextOverallImage() {
  var $el, $ps, $up, totalHeight;

  totalHeight = 0
  $el = $(".sidebar-box .button")
  $p  = $el.parent();
  $up = $p.parent();
  $ps = $up.find("p:not('.read-more')");

  // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
  $ps.each(function() {
    totalHeight += $('p.item-description').outerHeight();
  });

  $up.css({
      // Set height to prevent instant jumpdown when max height is removed
      "height": $up.height(),
      "max-height": 9999
    }).animate({
      "height": totalHeight
    });

  // fade out read-more
  $p.fadeOut();

  // prevent jump-down
  return false;
}

function fadeOutText() {
  var $el, $ps, $up, totalHeight;

  $(".sidebar-box").click(function() {
    // console.log($(this).closest('.product-card'));
    var card = $(this).closest('.product-card')
    toggleFullText(card)
    enlargeCardOnFadedTextClick(card)

    totalHeight = 0
    $el = $(".sidebar-box .button")
    $p  = $el.parent();
    $up = $p.parent();
    $ps = $up.find("p:not('.read-more')");

    // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
    $ps.each(function() {
      totalHeight += $('p.item-description').outerHeight();
    });

    $up.css({
        // Set height to prevent instant jumpdown when max height is removed
        "height": $up.height(),
        "max-height": 9999
      }).animate({
        "height": totalHeight
      });

    // fade out read-more
    $p.fadeOut();

    // prevent jump-down
    return false;

  });
}

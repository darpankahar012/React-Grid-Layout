function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};



$('#Resources').owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: false,
    responsive: {
        0: {
            items: 1,
            dots: true,
            autoPlay: true,
        },
        480: {
            items: 2,
            autoPlay: true,
            dots: true,

        },
        768: {
            items: 2,
            dots: true,
            autoPlay: true,
        },
        992: {
            items: 3,
            dots: true,
            autoPlay: true,
        },
        1100: {
            items: 4,
            autoPlay: false,
            touchDrag: false,
            mouseDrag: false
        }
    },
})



//  Client Say Script Start Here


$('.tio').owlCarousel({
    loop: true,
    smartSpeed: 1000,
    responsiveClass: true,
    nav: true,
    dots: true,
    dotsContainer: ".tio-doimg",
    autoplay: false,
    autoplaySpeed: 1000,
    margin: 20,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        768: {
            items: 1
        },
        1024: {
            items: 1,
        },
        1100: {
            items: 1
        }
    }
});


// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#carousel-example-generic"]')
    .not('[href="#carousel-example-generic"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
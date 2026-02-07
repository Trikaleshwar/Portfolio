$(document).ready(function() {
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.custom-navbar').addClass('navbar-scrolled');
        } else {
            $('.custom-navbar').removeClass('navbar-scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Active navigation link highlighting
    $(window).scroll(function() {
        let current = '';
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            if ($(window).scrollTop() >= (sectionTop - 200)) {
                current = $(this).attr('id');
            }
        });

        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + current + '"]').addClass('active');
    });

    // Auto-close mobile navbar when clicking links
    $('.navbar-nav .nav-link').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Scroll animations
    function checkScroll() {
        $('.scroll-animate').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Initialize scroll animations
    $('.skill-card, .project-card, .card').addClass('scroll-animate');
    $(window).scroll(checkScroll);
    checkScroll(); // Check on page load

    // Contact form handling
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        const name = $(this).find('input[type="text"]').val().trim();
        const email = $(this).find('input[type="email"]').val().trim();
        const message = $(this).find('textarea').val().trim();
        
        // Validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'warning');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'warning');
            return;
        }
        
        // Simulate form submission
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.text();
        $submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...').prop('disabled', true);
        
        setTimeout(() => {
            showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
            $(this)[0].reset();
            $submitBtn.text(originalText).prop('disabled', false);
        }, 2000);
    });

    // Alert function using Bootstrap alerts
    function showAlert(message, type) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
                 style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        $('body').append(alertHtml);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            $('.alert').alert('close');
        }, 5000);
    }

    // Typing animation for hero text
    function typeWriter($element, text, speed = 100) {
        let i = 0;
        const tempDiv = $('<div>').html(text);
        const plainText = tempDiv.text();
        $element.text('');
        
        function type() {
            if (i < plainText.length) {
                $element.text($element.text() + plainText.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                // Restore original HTML after typing is complete
                $element.html(text);
            }
        }
        type();
    }

    // Initialize typing animation
    $(window).on('load', function() {
        const $heroTitle = $('.hero-section h1');
        if ($heroTitle.length) {
            const originalText = $heroTitle.html();
            setTimeout(() => {
                typeWriter($heroTitle, originalText, 80);
            }, 1000);
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('transform', `translateY(${scrolled * 0.3}px)`);
    });

    // Card hover effects
    $('.skill-card, .project-card').hover(
        function() {
            $(this).addClass('shadow-lg').removeClass('shadow-sm');
        },
        function() {
            $(this).addClass('shadow-sm').removeClass('shadow-lg');
        }
    );

    // Button ripple effect
    $('.btn').click(function(e) {
        const $btn = $(this);
        const offset = $btn.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        const size = Math.max($btn.outerWidth(), $btn.outerHeight());
        
        const $ripple = $('<span class="ripple">').css({
            width: size + 'px',
            height: size + 'px',
            left: (x - size / 2) + 'px',
            top: (y - size / 2) + 'px'
        });
        
        $btn.css('position', 'relative').append($ripple);
        
        setTimeout(() => {
            $ripple.remove();
        }, 600);
    });

    // Initialize tooltips (if using Bootstrap tooltips)
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Initialize popovers (if using Bootstrap popovers)
    $('[data-bs-toggle="popover"]').popover();

    // Loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
        $('.loading').each(function(index) {
            $(this).delay(index * 100).queue(function() {
                $(this).addClass('loaded').dequeue();
            });
        });
    });

    // Counter animation for stats
    function animateCounters() {
        $('.card h3').each(function() {
            const $counter = $(this);
            const target = parseInt($counter.text().replace(/\D/g, ''));
            const suffix = $counter.text().replace(/\d/g, '');
            
            if (target && !$counter.hasClass('counted')) {
                $counter.addClass('counted');
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    step: function() {
                        $counter.text(Math.floor(this.count) + suffix);
                    },
                    complete: function() {
                        $counter.text(target + suffix);
                    }
                });
            }
        });
    }

    // Trigger counter animation when about section is visible
    $(window).scroll(function() {
        const aboutSection = $('#about');
        const aboutTop = aboutSection.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();
        
        if (windowBottom > aboutTop + 100) {
            animateCounters();
        }
    });

    // Smooth reveal for sections
    $(window).scroll(function() {
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > sectionTop + 100) {
                $(this).addClass('section-visible');
            }
        });
    });

    // Add section visibility styles
    $('<style>').text(`
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-section {
            opacity: 1;
            transform: translateY(0);
        }
    `).appendTo('head');

    // Initialize first section as visible
    $('.hero-section').addClass('section-visible');

    // Trigger initial scroll events
    $(window).trigger('scroll');
});
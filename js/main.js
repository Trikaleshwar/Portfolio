$(document).ready(function() {
    
    // Mobile Navigation Toggle
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('.hamburger').removeClass('active');
        $('.nav-menu').removeClass('active');
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').css({
                'background': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.1)'
            });
        } else {
            $('.navbar').css({
                'background': 'rgba(255, 255, 255, 0.95)',
                'box-shadow': 'none'
            });
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

    // Animate elements on scroll
    $('.skill-card, .project-card, .stat').css({
        'opacity': '0',
        'transform': 'translateY(20px)',
        'transition': 'opacity 0.6s ease, transform 0.6s ease'
    });

    $(window).scroll(function() {
        $('.skill-card, .project-card, .stat').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    });

    // Contact form handling
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        const name = $(this).find('input[type="text"]').val();
        const email = $(this).find('input[type="email"]').val();
        const message = $(this).find('textarea').val();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const $submitBtn = $(this).find('.btn');
        const originalText = $submitBtn.text();
        $submitBtn.text('Sending...').prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            $(this)[0].reset();
            $submitBtn.text(originalText).prop('disabled', false);
        }, 2000);
    });

    // Typing animation for hero text
    function typeWriter($element, text, speed = 100) {
        let i = 0;
        $element.html('');
        
        function type() {
            if (i < text.length) {
                $element.html($element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation when page loads
    $(window).on('load', function() {
        const $heroTitle = $('.hero-text h1');
        if ($heroTitle.length) {
            const originalText = $heroTitle.text();
            setTimeout(() => {
                typeWriter($heroTitle, originalText, 80);
            }, 1000);
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero').css('transform', `translateY(${scrolled * 0.5}px)`);
    });

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Smooth reveal animation for sections
    $('.section-title, .about-text, .contact-info').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'opacity 0.8s ease, transform 0.8s ease'
    });

    $(window).scroll(function() {
        $('.section-title, .about-text, .contact-info').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();

            if (viewportBottom > elementTop + 100) {
                $(this).addClass('revealed');
            }
        });
    });

    // Add CSS for reveal animation
    $('<style>').text(`
        .section-title.revealed, .about-text.revealed, .contact-info.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: #6366f1;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        body.loaded {
            overflow-x: hidden;
        }
    `).appendTo('head');

    // Add hover effects for project cards
    $('.project-card').hover(
        function() {
            $(this).css('transform', 'translateY(-15px) scale(1.02)');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // Add click effects for buttons
    $('.btn').click(function(e) {
        const $btn = $(this);
        const offset = $btn.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        const size = Math.max($btn.outerWidth(), $btn.outerHeight());
        
        const $ripple = $('<span>').css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            left: (x - size / 2) + 'px',
            top: (y - size / 2) + 'px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });
        
        $btn.css({
            position: 'relative',
            overflow: 'hidden'
        }).append($ripple);
        
        setTimeout(() => {
            $ripple.remove();
        }, 600);
    });

    // Add ripple animation
    $('<style>').text(`
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `).appendTo('head');

    // Trigger scroll events on page load
    $(window).trigger('scroll');
});

// Additional jQuery animations and effects
$(document).ready(function() {
    
    // Fade in sections on scroll
    $(window).scroll(function() {
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            const windowTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (windowTop + windowHeight > sectionTop + 100) {
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
        
        .hero {
            opacity: 1;
            transform: translateY(0);
        }
    `).appendTo('head');

    // Initialize first section as visible
    $('.hero').addClass('section-visible');
});
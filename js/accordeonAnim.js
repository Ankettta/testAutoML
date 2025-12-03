
function initAccordions() {
    document.addEventListener('DOMContentLoaded', function() {
        const accordionTriggers = document.querySelectorAll('.accordion__trigger');

        accordionTriggers.forEach(trigger => {
            
            const content = trigger.nextElementSibling;
            if (content) {
                content.style.overflow = 'hidden';
                content.style.transition = '0.4s ease-in-out';
                content.style.maxHeight = '0';
            }

            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
             
                accordionTriggers.forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                    const tContent = t.nextElementSibling;
                    if (tContent) tContent.style.maxHeight = '0';
                });

                if (!isExpanded) {
                    trigger.setAttribute('aria-expanded', 'true');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        });
    });
}
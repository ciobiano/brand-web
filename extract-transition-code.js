const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to clou.ch...');
  await page.goto('https://www.clou.ch/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Extract transition-related JavaScript code
  const transitionCode = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    let transitionScript = '';
    
    scripts.forEach(script => {
      const content = script.textContent;
      if (content && (
        content.includes('transitionTrigger') || 
        content.includes('transition-trigger') ||
        content.includes('transition') ||
        content.includes('exitDurationMS') ||
        content.includes('introDurationMS')
      )) {
        transitionScript += '\n\n=== SCRIPT SECTION ===\n';
        transitionScript += content;
      }
    });
    
    return transitionScript;
  });
  
  console.log('=== TRANSITION JAVASCRIPT CODE ===');
  console.log(transitionCode);
  
  // Get the CSS for transition elements
  const transitionCSS = await page.evaluate(() => {
    const transitionElements = document.querySelectorAll('[class*="transition"]');
    const css = [];
    
    transitionElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      css.push({
        className: el.className,
        styles: {
          position: styles.position,
          top: styles.top,
          left: styles.left,
          width: styles.width,
          height: styles.height,
          zIndex: styles.zIndex,
          display: styles.display,
          opacity: styles.opacity,
          transform: styles.transform,
          background: styles.background,
          backgroundColor: styles.backgroundColor
        }
      });
    });
    
    return css;
  });
  
  console.log('\n=== TRANSITION ELEMENT STYLES ===');
  console.log(JSON.stringify(transitionCSS, null, 2));
  
  // Now let's trigger a navigation and observe the animation
  console.log('\n=== TRIGGERING NAVIGATION ANIMATION ===');
  
  // Set up animation monitoring
  await page.evaluate(() => {
    window.animationEvents = [];
    
    // Monitor the transition element
    const transitionEl = document.querySelector('.transition');
    if (transitionEl) {
      // Create a MutationObserver to watch for style changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            window.animationEvents.push({
              timestamp: Date.now(),
              element: '.transition',
              display: transitionEl.style.display,
              opacity: transitionEl.style.opacity,
              transform: transitionEl.style.transform
            });
          }
        });
      });
      
      observer.observe(transitionEl, {
        attributes: true,
        attributeFilter: ['style']
      });
      
      // Also watch transition-color
      const colorEl = document.querySelector('.transition-color');
      if (colorEl) {
        const colorObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              window.animationEvents.push({
                timestamp: Date.now(),
                element: '.transition-color',
                transform: colorEl.style.transform,
                opacity: colorEl.style.opacity
              });
            }
          });
        });
        
        colorObserver.observe(colorEl, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    }
  });
  
  // Click a navigation link
  try {
    await page.click('a[href="/projekte"]');
    await page.waitForTimeout(2000); // Wait for animation to complete
    
    // Get recorded animation events
    const animationEvents = await page.evaluate(() => window.animationEvents || []);
    console.log('\n=== ANIMATION EVENTS ===');
    console.log(JSON.stringify(animationEvents, null, 2));
    
  } catch (error) {
    console.log('Error triggering animation:', error.message);
  }
  
  await page.waitForTimeout(5000);
  await browser.close();
})();

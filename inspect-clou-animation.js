const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down actions to observe animations
  });
  
  const page = await browser.newPage();
  
  // Go to the website
  console.log('Navigating to clou.ch...');
  await page.goto('https://www.clou.ch/');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000); // Give extra time for animations to initialize
  
  // Log initial page structure
  console.log('=== INITIAL PAGE STRUCTURE ===');
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log('Body structure (first 500 chars):', bodyHTML.substring(0, 500));
  
  // Check for navigation elements
  const navElements = await page.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('nav a, .nav a, [data-nav] a, header a'));
    return navLinks.map(link => ({
      text: link.textContent.trim(),
      href: link.href,
      classes: link.className,
      dataset: Object.assign({}, link.dataset)
    }));
  });
  
  console.log('=== NAVIGATION ELEMENTS ===');
  console.log(navElements);
  
  // Check for any animation-related CSS classes or data attributes
  const animationElements = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    const animationRelated = [];
    
    allElements.forEach(el => {
      const classes = el.className;
      const dataset = Object.assign({}, el.dataset);
      
      // Look for animation-related keywords
      if (typeof classes === 'string' && (
        classes.includes('transition') || 
        classes.includes('animate') || 
        classes.includes('loader') || 
        classes.includes('overlay') ||
        classes.includes('gsap') ||
        classes.includes('fade') ||
        classes.includes('slide')
      )) {
        animationRelated.push({
          tagName: el.tagName,
          classes: classes,
          dataset: dataset,
          id: el.id
        });
      }
    });
    
    return animationRelated;
  });
  
  console.log('=== ANIMATION-RELATED ELEMENTS ===');
  console.log(animationElements);
  
  // Check for JavaScript libraries loaded
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(script => ({
      src: script.src,
      content: script.textContent ? script.textContent.substring(0, 100) : ''
    }));
  });
  
  console.log('=== LOADED SCRIPTS ===');
  scripts.forEach(script => {
    if (script.src) {
      console.log('External script:', script.src);
    } else if (script.content) {
      console.log('Inline script preview:', script.content);
    }
  });
  
  // Check CSS for animation properties
  const cssAnimations = await page.evaluate(() => {
    const stylesheets = Array.from(document.styleSheets);
    const animationRules = [];
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach(rule => {
          if (rule.style && (
            rule.style.transition ||
            rule.style.animation ||
            rule.style.transform ||
            rule.selectorText?.includes('transition') ||
            rule.selectorText?.includes('animate')
          )) {
            animationRules.push({
              selector: rule.selectorText,
              transition: rule.style.transition,
              animation: rule.style.animation,
              transform: rule.style.transform
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
    });
    
    return animationRules;
  });
  
  console.log('=== CSS ANIMATION RULES ===');
  console.log(cssAnimations);
  
  // Try to click on navigation links and observe behavior
  if (navElements.length > 0) {
    console.log('\n=== TESTING NAVIGATION CLICK ===');
    
    // Set up listeners for DOM changes and network requests
    page.on('domcontentloaded', () => console.log('DOM Content Loaded'));
    page.on('load', () => console.log('Page Load Complete'));
    page.on('request', request => {
      if (request.resourceType() === 'document') {
        console.log('Navigation request:', request.url());
      }
    });
    
    // Find a navigation link to test
    const testLink = navElements.find(link => 
      link.text && 
      !link.href.includes('#') && 
      !link.href.includes('mailto:') && 
      !link.href.includes('tel:')
    );
    
    if (testLink) {
      console.log(`Attempting to click on: "${testLink.text}" (${testLink.href})`);
      
      // Monitor for any overlay or loader elements that might appear
      const checkForOverlay = async () => {
        return await page.evaluate(() => {
          const overlays = Array.from(document.querySelectorAll('*')).filter(el => {
            const style = window.getComputedStyle(el);
            return (
              style.position === 'fixed' || 
              style.position === 'absolute'
            ) && (
              style.zIndex > 100 ||
              el.className.includes('overlay') ||
              el.className.includes('loader') ||
              el.className.includes('transition')
            );
          });
          
          return overlays.map(el => ({
            tagName: el.tagName,
            classes: el.className,
            styles: {
              position: window.getComputedStyle(el).position,
              zIndex: window.getComputedStyle(el).zIndex,
              opacity: window.getComputedStyle(el).opacity,
              transform: window.getComputedStyle(el).transform
            }
          }));
        });
      };
      
      const beforeClick = await checkForOverlay();
      console.log('Before click - overlay elements:', beforeClick);
      
      try {
        // Click the navigation link
        await page.click(`a[href="${testLink.href.replace(window.location.origin, '')}"]`);
        
        // Wait a moment and check for overlay changes
        await page.waitForTimeout(500);
        const afterClick = await checkForOverlay();
        console.log('After click - overlay elements:', afterClick);
        
        // Wait for potential navigation
        await page.waitForTimeout(2000);
        
      } catch (error) {
        console.log('Error clicking link:', error.message);
      }
    }
  }
  
  console.log('\n=== INSPECTION COMPLETE ===');
  console.log('Browser will stay open for manual inspection...');
  
  // Keep browser open for manual inspection
  await page.waitForTimeout(30000);
  
  await browser.close();
})();

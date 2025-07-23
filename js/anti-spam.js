/**
 * Anti-Spam Protection for Newsletter Forms
 * Provides invisible spam protection without affecting user experience
 */

class AntiSpamProtection {
  constructor() {
    this.minFormTime = 1000; // 1 second minimum (more reasonable)
    this.maxFormTime = 600000; // 10 minutes maximum
    this.userInteracted = false;
    this.focusedOnEmail = false;
    this.typedInForm = false;
    this.rateLimitKey = 'newsletter_last_submission';
    this.rateLimitTime = 300000; // 5 minutes
    this.debugMode = true; // Enable debugging

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupProtection());
    } else {
      this.setupProtection();
    }
  }

  setupProtection() {
    const forms = document.querySelectorAll('.anti-spam-form');
    forms.forEach(form => this.protectForm(form));
  }

  protectForm(form) {
    // Record form start time
    const startTime = Date.now();
    form.setAttribute('data-form-start-time', startTime);

    // Track user interactions
    this.trackUserInteraction(form);

    // Add form submission handler
    form.addEventListener('submit', (e) => this.validateSubmission(e, form, startTime));

    // Track legitimate user behavior
    this.trackLegitimateUser();
  }

  trackUserInteraction(form) {
    // Track focus and input on legitimate form fields (exclude honeypots)
    const emailField = form.querySelector('input[name="EMAIL"]');
    const nameField = form.querySelector('input[name="FNAME"]');
    
    if (emailField) {
      emailField.addEventListener('focus', () => {
        this.focusedOnEmail = true;
        this.userInteracted = true;
        if (this.debugMode) console.log('User focused on email field');
      });

      emailField.addEventListener('input', () => {
        this.typedInForm = true;
        this.userInteracted = true;
        if (this.debugMode) console.log('User typed in email field');
      });
    }

    if (nameField) {
      nameField.addEventListener('focus', () => {
        this.userInteracted = true;
        if (this.debugMode) console.log('User focused on name field');
      });

      nameField.addEventListener('input', () => {
        this.typedInForm = true;
        this.userInteracted = true;
        if (this.debugMode) console.log('User typed in name field');
      });
    }
  }

  trackLegitimateUser() {
    // Simple interaction tracking - don't require specific behaviors
    // Just track that some user activity happened
    let hasInteracted = false;

    const markInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        this.userInteracted = true;
        if (this.debugMode) console.log('General user interaction detected');
      }
    };

    // Any of these interactions count as legitimate user behavior
    document.addEventListener('mousemove', markInteraction, { once: true });
    document.addEventListener('scroll', markInteraction, { once: true });
    document.addEventListener('keydown', markInteraction, { once: true });
    document.addEventListener('click', markInteraction, { once: true });
  }

  validateSubmission(event, form, startTime) {
    const validationResults = {
      honeypots: this.validateHoneypots(form),
      timing: this.validateTiming(startTime),
      interaction: this.validateUserInteraction(),
      rateLimit: this.validateRateLimit()
    };

    if (this.debugMode) {
      console.log('Anti-spam validation results:', validationResults);
    }

    // Primary check: Honeypot fields (most important for spam detection)
    if (!validationResults.honeypots) {
      event.preventDefault();
      console.warn('Newsletter submission blocked: Failed honeypot validation');
      this.showUserError(form);
      return false;
    }

    // Secondary check: Rate limiting (prevent rapid submissions)
    if (!validationResults.rateLimit) {
      event.preventDefault();
      console.warn('Newsletter submission blocked: Rate limit exceeded');
      this.showUserError(form, 'Please wait a few minutes before submitting again.');
      return false;
    }

    // Timing check: Only block if extremely fast (likely bot)
    if (!validationResults.timing) {
      const timeDiff = Date.now() - startTime;
      if (timeDiff < 500) { // Only block if submitted in less than 0.5 seconds
        event.preventDefault();
        console.warn('Newsletter submission blocked: Submitted too quickly');
        this.showUserError(form);
        return false;
      }
    }

    // User interaction is now informational only - don't block based on this
    if (!validationResults.interaction && this.debugMode) {
      console.log('Note: No user interaction detected, but allowing submission');
    }

    // Set rate limit for successful submission
    this.setRateLimit();
    if (this.debugMode) {
      console.log('Newsletter submission validated successfully');
    }
    return true;
  }

  validateHoneypots(form) {
    const honeypotFields = form.querySelectorAll('.honeypot-fields input');
    
    for (let field of honeypotFields) {
      if (field.type === 'checkbox' && field.checked) {
        return false;
      }
      if (field.type !== 'checkbox' && field.value.trim() !== '') {
        return false;
      }
    }
    return true;
  }

  validateTiming(startTime) {
    const currentTime = Date.now();
    const timeDiff = currentTime - startTime;
    
    return timeDiff >= this.minFormTime && timeDiff <= this.maxFormTime;
  }

  validateUserInteraction() {
    // Much more lenient - just check if user interacted with the form at all
    return this.userInteracted || this.focusedOnEmail || this.typedInForm;
  }

  validateRateLimit() {
    const lastSubmission = localStorage.getItem(this.rateLimitKey);
    if (!lastSubmission) return true;

    const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
    return timeSinceLastSubmission >= this.rateLimitTime;
  }

  setRateLimit() {
    localStorage.setItem(this.rateLimitKey, Date.now().toString());
  }

  showUserError(form, customMessage = null) {
    // Find or create error message element
    let errorElement = form.querySelector('.anti-spam-error');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'anti-spam-error';
      errorElement.style.cssText = `
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        text-align: center;
        font-size: 0.9rem;
      `;
      
      const submitButton = form.querySelector('input[type="submit"]');
      submitButton.parentNode.insertBefore(errorElement, submitButton);
    }

    const defaultMessage = 'Please wait a moment and try again. Make sure you\'ve filled out the form completely.';
    errorElement.textContent = customMessage || defaultMessage;
    errorElement.style.display = 'block';

    // Hide error after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }

  // Method to check if JavaScript is enabled (called from HTML)
  static markJavaScriptEnabled() {
    document.documentElement.setAttribute('data-js-enabled', 'true');
  }

  // Public method to get protection stats (for debugging)
  getStats() {
    return {
      userInteracted: this.userInteracted,
      focusedOnEmail: this.focusedOnEmail,
      typedInForm: this.typedInForm,
      lastSubmission: localStorage.getItem(this.rateLimitKey),
      debugMode: this.debugMode
    };
  }

  // Method to disable debug mode in production
  disableDebug() {
    this.debugMode = false;
  }
}

// Initialize anti-spam protection
const antiSpam = new AntiSpamProtection();

// Mark JavaScript as enabled
AntiSpamProtection.markJavaScriptEnabled();

// Make antiSpam available globally for debugging
window.antiSpam = antiSpam;
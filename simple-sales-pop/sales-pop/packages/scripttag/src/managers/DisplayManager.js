import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;

    const shouldDisplay = await this.shouldDisplayOnCurrentUrl();
    if (!shouldDisplay) {
      console.log('Skip displaying due to URL rules.');
      return;
    }

    this.insertContainer();

    await this.startDisplayLoop();
  }

  async shouldDisplayOnCurrentUrl() {
    const {allowShow, includedUrls, excludedUrls} = this.settings;
    const path = window.location.pathname;

    if (allowShow === 'all') return true;

    const [includes, excludes] = await Promise.all([
      this.handleValueUrl(includedUrls),
      this.handleValueUrl(excludedUrls)
    ]);

    const excludedMatch = excludes.find(
      url => url === path || (url !== '/' && path.startsWith(url))
    );
    if (excludedMatch) return false;

    if (allowShow === 'specific') {
      if (includes.length === 0) return true;

      const includedMatch = includes.find(url => path.startsWith(url));
      return !!includedMatch;
    }

    return false;
  }
  async handleValueUrl(urls) {
    try {
      return urls
        .split('\n')
        .map(url => url.trim())
        .filter(Boolean);
    } catch (e) {
      console.log('Handle value urls false', e);
      return [];
    }
  }

  prepareNotifications() {
    const {maxPopsDisplay} = this.settings;
    return this.notifications.slice(0, maxPopsDisplay);
  }

  async startDisplayLoop() {
    const {firstDelay, displayDuration, popsInterval, maxPopsDisplay} = this.settings;
    if (!this.notifications.length) return;
    await this.delay(firstDelay * 1000);

    const notifications = this.prepareNotifications();

    for (const notification of notifications) {
      const processedNotification = {
        ...notification,
        productName: this.settings.truncateProductName
          ? this.truncateProductName(notification.productName)
          : notification.productName
      };
      await this.displayOnePopup(processedNotification, displayDuration);
      await this.delay(popsInterval * 1000);
    }
  }

  truncateProductName(name, maxLength = 15) {
    if (!name) return '';
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  }

  async displayOnePopup(notification, duration) {
    this.display({notification, settings: this.settings});
    await this.delay(duration * 1000);
    this.fadeOut();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification, settings}) {
    const container = document.querySelector('#Avada-SalePop');
    render(null, container);
    render(
      <NotificationPopup
        notification={notification}
        hideTimeAgo={settings.hideTimeAgo}
        truncateProductName={settings.truncateProductName}
        position={settings.position}
      />,
      container
    );
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}

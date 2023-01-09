/* eslint-disable no-unused-vars */
import { isClient } from './constants';
import { eventbus } from './events/event-bus';

// @TODO: add granular control for each cookie type
export function cookieConsent() {
  const consentChannel = eventbus<{
    'on-accept': (consent: boolean) => boolean;
    'on-deny': (consent: boolean) => boolean;
  }>();
  return {
    consentChannel,
  };
}

export function getConsent(): boolean {
  if (!isClient) return false;
  const consent = localStorage.getItem('rbs-consent');
  if (consent !== null) return JSON.parse(consent);
  localStorage.setItem('rbs-consent', 'false');
  return false;
}

import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

export interface StripeState {
  stripe: Stripe | null;
  elements: StripeElements | null;
  cardElement: StripeCardElement | null;
}
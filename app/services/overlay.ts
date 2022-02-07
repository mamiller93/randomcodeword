import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';

export default class OverlayService extends Service {
  @tracked isShowing = false;

  @action
  toggle() {
    this.isShowing = !this.isShowing;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    overlay: OverlayService;
  }
}

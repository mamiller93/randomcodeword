import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import OverlayService from 'randomcodeword/services/overlay';

export default class HelperComponent extends Component {
  @service declare overlay: OverlayService;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/component' {
  interface Registry {
    helper: HelperComponent;
  }
}

import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

import { keepLatestTask } from 'ember-concurrency';
import { taskFor } from 'ember-concurrency-ts';
import { ModelFrom } from 'randomcodeword';
import { loaders } from 'randomcodeword/helpers/loaders';
import IndexRoute from 'randomcodeword/routes';
import OverlayService from 'randomcodeword/services/overlay';

export default class IndexController extends Controller {
  declare model: ModelFrom<IndexRoute>;

  @service declare overlay: OverlayService;

  inputGuid = guidFor(this);
  queryParams = ['limit', 'q'];

  @tracked q: string = '';

  get qJoined() {
    return this.q.split(',').join(' ');
  }

  get loadingStatement() {
    const random = Math.floor(Math.random() * loaders.length);
    return loaders[random];
  }

  @tracked limit = 1;
  max = 15;

  @keepLatestTask
  words = taskFor(async (_element, forceReload?: boolean[]) => {
    let words: string[] = [];
    if (forceReload && forceReload.length === 0 && this.q) {
      words = this.q.split(',');
    } else {
      const url = new URL('http://127.0.0.1:5000/get');

      if (this.limit && Number.isInteger(this.limit)) {
        url.searchParams.append('limit', `${this.limit}`);
      }

      let response = await fetch(url.toString());
      words = (await response.json()).words;
    }
    const q = words.join(' ');
    this.q = words.join(',');
    return q;
  });

  get fontSize() {
    const size = 8 - this.limit / 4;
    return htmlSafe(`font-size: calc(100% + ${size}vw)`);
  }

  activate() {
    if (this.limit > this.max) {
      this.limit = this.max;
    } else if (this.limit < 1) {
      this.limit = 1;
    }
  }

  @action
  triggerRandom() {
    this.words.perform(undefined, [true]);
  }

  @action
  triggerBack() {
    history.back();
  }

  @action
  triggered(increment: number) {
    const val = this.limit + increment;
    if (val > 0 && val <= this.max) {
      this.limit = val;
      this.words.perform(undefined, [true]);
    }
  }

  @action
  toggleDarkMode() {
    const element = document.documentElement;
    element.classList.toggle('dark');
  }

  @action
  useSystemSetting() {
    localStorage.removeItem('theme');
    console.log('Using system setting');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: IndexController;
  }
}

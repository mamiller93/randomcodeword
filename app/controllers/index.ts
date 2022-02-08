import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

import { keepLatestTask } from 'ember-concurrency';
import { taskFor } from 'ember-concurrency-ts';
import { ModelFrom } from 'randomcodeword';
import ENV from 'randomcodeword/config/environment';
import { loaders } from 'randomcodeword/helpers/loaders';
import IndexRoute from 'randomcodeword/routes';
import OverlayService from 'randomcodeword/services/overlay';

export default class IndexController extends Controller {
  declare model: ModelFrom<IndexRoute>;

  @service declare overlay: OverlayService;

  inputGuid = guidFor(this);
  queryParams = ['limit', 'q', 'partOfSpeech'];

  @tracked q: string = '';
  @tracked partOfSpeech: string = 'noun,verb';

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
      const url = new URL(`${ENV.EmberENV.URL}/api/v1/`);

      if (this.limit && Number.isInteger(this.limit)) {
        url.searchParams.append('limit', `${this.limit}`);
      }

      if (this.partOfSpeech) {
        url.searchParams.append('partOfSpeech', `${this.partOfSpeech}`);
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

    if (element.classList.contains('dark')) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  }

  @action
  useSystemSetting() {
    localStorage.removeItem('theme');

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    console.log('Using system setting');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: IndexController;
  }
}

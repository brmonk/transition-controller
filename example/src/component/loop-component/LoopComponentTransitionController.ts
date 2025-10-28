import { Elastic } from 'gsap';
import Vue from 'vue';
import AbstractVueTransitionController from '../AbstractVueTransitionController';
import TransitionDirection from '../../../../src/lib/enum/TransitionDirection';

export const TransitionId = {
  [TransitionDirection.IN]: {},
  [TransitionDirection.OUT]: {},
  LOOP_1: 'loop-1',
  LOOP_2: 'loop-2',
};

export default class DummyComponentTransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {gsap.core.Timeline} timeline
   * @param {Vue} parent
   * @param {string} id
   */
  public setupTransitionInTimeline(timeline: gsap.core.Timeline, parent: Vue, id: string): void {}

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param { gsap.core.Timeline } timeline
   * @param { Vue } parent
   * @param { string } id
   */
  public setupTransitionOutTimeline(timeline: gsap.core.Timeline, parent: Vue, id: string): void {}

  /**
   * @public
   * @method setupLoopingAnimationTimeline
   * @param {gsap.core.Timeline} timeline
   * @param {Vue} parent
   * @param {string} id
   * @description overwrite this method in the parent class
   * */
  public setupLoopingAnimationTimeline(
    timeline: gsap.core.Timeline,
    parent: Vue,
    id: string,
  ): void {
    const { button } = parent.$refs;

    switch (id) {
      case TransitionId.LOOP_1:
        timeline.fromTo(
          button as Element,
          { rotation: 0 },
          { rotation: 360, ease: Elastic.easeOut, duration: 2, repeat: -1 },
        );
        break;
      case TransitionId.LOOP_2:
        timeline.fromTo(
          button as Element,
          { yPercent: 0 },
          { yPercent: 100, ease: Elastic.easeInOut, duration: 1, repeat: -1 },
        );
        timeline.fromTo(
          button as Element,
          { yPercent: 100 },
          { yPercent: 0, ease: Elastic.easeInOut, duration: 1, repeat: -1 },
        );
        break;
      default:
        timeline.fromTo(
          button as Element,
          { xPercent: 0 },
          { xPercent: 100, ease: Elastic.easeInOut, duration: 1, repeat: -1 },
        );
        timeline.fromTo(
          button as Element,
          { xPercent: 100 },
          { xPercent: 0, ease: Elastic.easeInOut, duration: 1, repeat: -1 },
        );
        break;
    }
  }
}

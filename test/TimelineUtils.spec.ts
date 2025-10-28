import { expect } from 'chai';
import {
  createTimeline,
  killAndClearTimeline,
  clearTimeline,
  cloneTimeline,
} from '../src/lib/util/TimelineUtils';
import { gsap } from 'gsap';
import TransitionDirection from '../src/lib/enum/TransitionDirection';

describe('TimelineUtils.spec', () => {
  const demoDuration = 0.01;
  const demoTimeOut = demoDuration * 3000;

  let onStart: boolean;
  let onComplete: boolean;
  let onReverseStart: boolean;
  let onReverseComplete: boolean;
  let timeline: gsap.core.Timeline;

  const options = {
    onStart: () => {
      onStart = true;
    },
    onComplete: () => {
      onComplete = true;
    },
    onReverseStart: () => {
      onReverseStart = true;
    },
    onReverseComplete: () => {
      onReverseComplete = true;
    },
  };

  describe('createTimeline', () => {
    beforeEach(() => {
      onStart = false;
      onComplete = false;
      onReverseStart = false;
      onReverseComplete = false;

      timeline = createTimeline(options);
      timeline.to({ test: 0 }, { test: 10, duration: demoDuration });
    });

    it('should return a TimelineMax', () => {
      expect(timeline).to.be.instanceOf(gsap.core.Timeline);
    });

    it('should give onStart/onComplete callback', done => {
      timeline.play();
      setTimeout(() => {
        expect(onStart).to.be.true;
        expect(onComplete).to.be.true;
        done();
      }, demoTimeOut);
    });

    it('should give onReverseStart/onReverseComplete callback', done => {
      timeline.play();
      setTimeout(() => {
        timeline.reverse();
        setTimeout(() => {
          expect(onReverseStart).to.be.true;
          expect(onReverseComplete).to.be.true;
          done();
        }, demoTimeOut);
      }, demoTimeOut);
    });
  });

  describe('killAndClearTimeline', () => {
    it('should clear and kill the timeline', () => {
      expect(killAndClearTimeline(timeline)).to.be.undefined;
    });
  });

  describe('clearTimeline', () => {
    it('should clear the timeline', () => {
      expect(clearTimeline(timeline)).to.be.undefined;
    });

    it('should clear the timeline with nested timeline', () => {
      timeline.add(cloneTimeline(timeline, TransitionDirection.IN));
      expect(clearTimeline(timeline)).to.be.undefined;
    });
  });

  describe('cloneTimeline', () => {
    it('should clone the timeline', () => {
      timeline.add(
        cloneTimeline(
          timeline.add(cloneTimeline(timeline, TransitionDirection.IN)) as gsap.core.Timeline,
          TransitionDirection.IN,
        ),
      );
      expect(cloneTimeline(timeline, TransitionDirection.IN)).to.be.instanceOf(gsap.core.Timeline);
    });

    it('should clone the timeline with a to animation', () => {
      timeline.to({ test: 0 }, demoDuration, { test: 10 });
      expect(cloneTimeline(timeline, TransitionDirection.IN)).to.be.instanceOf(gsap.core.Timeline);
    });

    it('should try to clone the timeline but fail due to using fromTo in a nested transitionOut timeline', () => {
      timeline.fromTo({ test: 0 }, { test: 0 }, { test: 10, duration: demoDuration });
      expect(() => cloneTimeline(timeline, TransitionDirection.OUT)).to.throw();
    });

    it('should try to clone the timeline but fail due to using from in a nested transitionIn timeline', () => {
      // @ts-expect-error
      timeline.from({ test: 0 }, { test: 0, duration: demoDuration }, { test: 10 });
      expect(() => cloneTimeline(timeline, TransitionDirection.IN)).to.throw();
    });
  });
});

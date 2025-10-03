import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

type DraggableInstance = ReturnType<typeof Draggable.create>[number];

type SnapInput =
  | number
  | number[]
  | gsap.utils.SnapNumberConfig
  | ((value: number) => number);
type SnapFunction = (value: number) => number;

export interface HorizontalLoopOptions {
  paused?: boolean;
  repeat?: number;
  speed?: number;
  snap?: SnapInput | false;
  center?: boolean | Element | string | null;
  draggable?: boolean;
  paddingRight?: number | string;
  reversed?: boolean;
  dragTrigger?: Element | null;
  onChange?: (element: HTMLElement, index: number) => void;
}

export type HorizontalLoopTimeline = gsap.core.Timeline & {
  toIndex: (
    index: number,
    vars?: gsap.TweenVars & { duration?: number }
  ) => gsap.core.Tween | gsap.core.Timeline;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (
    vars?: gsap.TweenVars & { duration?: number }
  ) => gsap.core.Tween | gsap.core.Timeline;
  previous: (
    vars?: gsap.TweenVars & { duration?: number }
  ) => gsap.core.Tween | gsap.core.Timeline;
  times: number[];
  draggable?: DraggableInstance;
  cleanup: () => void;
};

const resolveSnap = (value: SnapInput | false): SnapFunction => {
  if (value === false) {
    return (input) => input;
  }
  if (typeof value === "function") {
    return value as SnapFunction;
  }
  return gsap.utils.snap((value as number | number[] | gsap.utils.SnapNumberConfig) ?? 1) as SnapFunction;
};

const toPixels = (target: Element, property: string) => {
  const raw = gsap.getProperty(target, property, "px");
  if (typeof raw === "number") return raw;
  const parsed = parseFloat(String(raw ?? 0));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const toNumber = (value: unknown, fallback = 0) =>
  typeof value === "number" && !Number.isNaN(value) ? value : fallback;

export const createHorizontalLoop = (
  items: Iterable<HTMLElement> | HTMLElement[] | NodeListOf<HTMLElement>,
  options: HorizontalLoopOptions = {}
): HorizontalLoopTimeline | null => {
  const elements = gsap.utils.toArray(items) as HTMLElement[];
  if (!elements.length) {
    return null;
  }

  const {
    paused = false,
    repeat,
    speed = 1,
    snap = 1,
    center = false,
    draggable = false,
    paddingRight = 0,
    reversed = false,
    dragTrigger,
    onChange,
  } = options;

  const clampSnap = resolveSnap(snap);

  const container =
    center === true
      ? elements[0].parentElement
      : typeof center === "string"
      ? document.querySelector<HTMLElement>(center)
      : center instanceof HTMLElement
      ? center
      : elements[0].parentElement;

  if (!container) {
    return null;
  }

  const timeline = gsap.timeline({
    repeat,
    paused,
    defaults: { ease: "none" },
    onReverseComplete() {
      timeline.totalTime(timeline.rawTime() + timeline.duration() * 100);
    },
  }) as HorizontalLoopTimeline;

  const totalItems = elements.length;
  const startX = elements[0].offsetLeft;
  const times: number[] = new Array(totalItems).fill(0);
  const widths: number[] = new Array(totalItems).fill(0);
  const spaceBefore: number[] = new Array(totalItems).fill(0);
  const xPercents: number[] = new Array(totalItems).fill(0);

  let totalWidth = 0;
  let curIndex = 0;
  let lastIndex = 0;
  let indexIsDirty = false;
  let proxy: HTMLDivElement | null = null;
  let draggableInstance: DraggableInstance | undefined;

  const pixelsPerSecond = Math.max(speed, 0.01) * 100;
  const padding =
    typeof paddingRight === "string" ? parseFloat(paddingRight) || 0 : paddingRight || 0;

  const getTotalWidth = () => {
    const last = totalItems - 1;
    const lastElement = elements[last];
    return (
      lastElement.offsetLeft +
      (xPercents[last] / 100) * widths[last] -
      startX +
      spaceBefore[0] +
      lastElement.offsetWidth * toNumber(gsap.getProperty(lastElement, "scaleX"), 1) +
      padding
    );
  };

  const populateWidths = () => {
    let previousRect = container.getBoundingClientRect();
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const width = element.offsetWidth || rect.width || 1;
      widths[index] = width;
      spaceBefore[index] = rect.left - (index ? previousRect.right : previousRect.left);
      const rawX = toPixels(element, "x");
      const rawXPercent = toNumber(gsap.getProperty(element, "xPercent"));
      xPercents[index] = clampSnap(((rawX / width) * 100) + rawXPercent);
      previousRect = rect;
    });

    gsap.set(elements, {
      x: 0,
      xPercent: (index: number) => xPercents[index],
    });

    totalWidth = getTotalWidth();
  };

  let timeWrap = gsap.utils.wrap(0, 0);

  const populateTimeline = () => {
    timeline.clear();
    elements.forEach((element, index) => {
      const width = widths[index] || 1;
      const xPercent = xPercents[index];
      const currentX = (xPercent / 100) * width;
      const distanceToStart = element.offsetLeft + currentX - startX + spaceBefore[0];
      const distanceToLoop =
        distanceToStart + width * toNumber(gsap.getProperty(element, "scaleX"), 1);

      timeline
        .to(
          element,
          {
            xPercent: clampSnap(((currentX - distanceToLoop) / width) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
        .fromTo(
          element,
          {
            xPercent: clampSnap(((currentX - distanceToLoop + totalWidth) / width) * 100),
          },
          {
            xPercent,
            duration: (currentX - distanceToLoop + totalWidth - currentX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add(`label${index}`, distanceToStart / pixelsPerSecond);

      times[index] = distanceToStart / pixelsPerSecond;
    });

    timeWrap = gsap.utils.wrap(0, timeline.duration());
  };

  const populateOffsets = () => {
    if (!center) return;
    const duration = timeline.duration();
    if (!duration || !totalWidth) return;
    const offset = (duration * container.offsetWidth) / (2 * totalWidth);
    times.forEach((time, index) => {
      times[index] = timeWrap(
        timeline.labels[`label${index}`] +
          (duration * widths[index]) / (2 * totalWidth) -
          offset
      );
    });
  };

  const refresh = (deep = false) => {
    const progress = timeline.progress();
    timeline.progress(0, true);
    populateWidths();
    if (deep) populateTimeline();
    populateOffsets();
    if (deep && draggableInstance) {
      timeline.time(times[curIndex], true);
    } else {
      timeline.progress(progress, true);
    }
  };

  populateWidths();
  populateTimeline();
  populateOffsets();

  const getClosestIndex = (value: number, wrap: number) => {
    let closest = Number.POSITIVE_INFINITY;
    let index = 0;
    for (let i = 0; i < times.length; i += 1) {
      let difference = Math.abs(times[i] - value);
      if (difference > wrap / 2) {
        difference = wrap - difference;
      }
      if (difference < closest) {
        closest = difference;
        index = i;
      }
    }
    return index;
  };

  const onResize = () => refresh(true);
  window.addEventListener("resize", onResize);

  const toIndex = (
    index: number,
    vars?: gsap.TweenVars & { duration?: number }
  ) => {
    const length = elements.length;
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if ((time > timeline.time()) !== index > curIndex && index !== curIndex) {
      time += timeline.duration() * (index > curIndex ? 1 : -1);
    }
    const tweenVars: gsap.TweenVars = { ...(vars ?? {}), overwrite: true };
    if (time < 0 || time > timeline.duration()) {
      (tweenVars as { modifiers?: gsap.ModifiersVars }).modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    if (proxy) {
      gsap.killTweensOf(proxy);
    }
    if (tweenVars.duration === 0) {
      timeline.time(timeWrap(time));
      return timeline;
    }
    return timeline.tweenTo(time, tweenVars);
  };

  timeline.toIndex = toIndex;
  timeline.closestIndex = (setCurrent = false) => {
    const index = getClosestIndex(timeline.time(), timeline.duration());
    if (setCurrent) {
      curIndex = index;
      indexIsDirty = false;
    }
    return index;
  };
  timeline.current = () => (indexIsDirty ? timeline.closestIndex(true) : curIndex);
  timeline.next = (vars) => toIndex(timeline.current() + 1, vars);
  timeline.previous = (vars) => toIndex(timeline.current() - 1, vars);
  timeline.times = times;

  timeline.progress(1, true).progress(0, true);

  if (reversed) {
    timeline.vars.onReverseComplete?.();
    timeline.reverse();
  }

  if (onChange) {
    timeline.eventCallback("onUpdate", () => {
      const index = timeline.closestIndex();
      if (lastIndex !== index) {
        lastIndex = index;
        onChange(elements[index], index);
      }
    });
  }

  if (draggable) {
    proxy = document.createElement("div");
    const wrap = gsap.utils.wrap(0, 1);
    let ratio = 0;
    let startProgress = 0;
    let initChangeX = 0;
    let lastSnap = 0;
    let wasPlaying = false;

    const align = () => {
      if (!draggableInstance) return;
      timeline.progress(
        wrap(startProgress + (draggableInstance.startX - draggableInstance.x) * ratio)
      );
    };
    const syncIndex = () => timeline.closestIndex(true);

    const trigger = dragTrigger ?? elements[0].parentNode ?? elements[0];

    draggableInstance = Draggable.create(proxy, {
      trigger: trigger as Element,
      type: "x",
      onPressInit() {
        const x = this.x;
        gsap.killTweensOf(timeline);
        wasPlaying = !timeline.paused();
        timeline.pause();
        refresh();
        ratio = totalWidth ? 1 / totalWidth : 0;
        startProgress = timeline.progress();
        initChangeX = ratio ? startProgress / -ratio - x : 0;
        gsap.set(proxy, { x: ratio ? startProgress / -ratio : 0 });
      },
      onDrag: align,
      onThrowUpdate: align,
      overshootTolerance: 0,
      inertia: true,
      snap(value) {
        if (!ratio) return value;
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX;
        }
        const time = -(value * ratio) * timeline.duration();
        const wrappedTime = timeWrap(time);
        const snapTime = times[getClosestIndex(wrappedTime, timeline.duration())];
        let difference = snapTime - wrappedTime;
        if (Math.abs(difference) > timeline.duration() / 2) {
          difference += difference < 0 ? timeline.duration() : -timeline.duration();
        }
        lastSnap = (time + difference) / timeline.duration() / -ratio;
        return lastSnap;
      },
      onRelease() {
        syncIndex();
        if (draggableInstance?.isThrowing) {
          indexIsDirty = true;
        }
      },
      onThrowComplete() {
        syncIndex();
        if (wasPlaying) {
          timeline.play();
        }
      },
    })[0];

    timeline.draggable = draggableInstance;
  }

  timeline.closestIndex(true);
  lastIndex = curIndex;
  onChange?.(elements[curIndex], curIndex);

  const cleanup = () => {
    window.removeEventListener("resize", onResize);
    draggableInstance?.kill();
    if (proxy) {
      gsap.killTweensOf(proxy);
      proxy = null;
    }
  };

  timeline.cleanup = cleanup;

  const originalKill = timeline.kill.bind(timeline);
  timeline.kill = ((...killArgs: Parameters<typeof originalKill>) => {
    cleanup();
    return originalKill(...killArgs);
  }) as typeof timeline.kill;

  return timeline;
};

export type HorizontalLoopInstance = ReturnType<typeof createHorizontalLoop>;

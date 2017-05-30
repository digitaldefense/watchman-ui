import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata
} from '@angular/animations';

export const transformMenu: AnimationTriggerMetadata = trigger('transformMenu', [
  state('showing', style({
    opacity: 1,
    transform: `scale(1)`
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: `scale(0)`
    }),
    animate(`200ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
  ]),
  transition('* => void', [
    animate('50ms 100ms linear', style({ opacity: 0 }))
  ])
]);

export const fadeInItems: AnimationTriggerMetadata = trigger('fadeInItems', [
  state('showing', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate(`200ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
  ])
]);

import {
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


export function fadeIn(selector = ':enter', duration = '400ms ease-out') {
  return [
    transition('* => *', [      
      query(selector, [
        style({ opacity: 0, transform: 'translateY(-5px)'}), 
        stagger('60ms', [
          animate(duration, style({
            opacity: 1,
            transform: 'translateY(0px)'
          }))
        ])
      ], {optional: true })
    ])
  ];
}

export function fadeOut(selector = ':leave', duration = 300) {
  return [
    transition('* => *', [
      query(selector, [
        style({ opacity: 1 }),
        stagger('30ms', [
          animate(duration, style({ 
            opacity: 0
          }))
        ])
      ], {optional: true })
    ])
  ];
}

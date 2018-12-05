import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'svg-icon',
  styleUrls: [
    './svg-icon.component.scss'
  ],
  template: `
    <svg class="icon">
      // SVG elements don't have properties, therefore attribute binding is needed
      // https://stackoverflow.com/a/35082700
      <use attr.xlink:href="assets/avatars.svg#{{icon}}"></use>
    </svg>
  `
})
export class SvgIconComponent {
  @Input() icon: string;
}

export const AVATARS = [
  'boy',
  'girl',
  'man',
  'girl-1',
  'girl-2',
  'girl-3'
];
# Animated Ghost-Elements in Angular

![image](https://user-images.githubusercontent.com/210413/49486685-078ce800-f805-11e8-9b58-a01fa819a989.png)

Sometimes referred to as ‘skeletons’, ghost elements are gray-box representations of pending UI that will be available in the future... once async data is loaded or perhaps a lazy-loaded module is ready. 

> Ghost elements are very useful for implementations of complex tables and other UX where data loads are not trivial.

While many sites [most notably Slack and Facebook] incorporate UX with skeletons and CSS, the Angular developer community has discussed this technique in any detail. This repo demonstrates some ideas on how to partition, implement, and animate **ghost elements**; and provides an implementation with Angular 7.x and `@angular/animations`

####  StackBlitz Demo


[![image](https://user-images.githubusercontent.com/210413/49487496-407a8c00-f808-11e8-9a5c-19f3e89c4ecc.png)](https://stackblitz.com/edit/angular-animated-ghost-elements-demo?file=src%2Fapp%2Fuser-list%2Fuser-list.component.html)


#### Learning Resources

* https://www.viget.com/articles/a-bone-to-pick-with-skeleton-screens/
* https://css-tricks.com/building-skeleton-screens-css-custom-properties/
* https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html

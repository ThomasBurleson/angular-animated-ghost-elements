# Animated Ghost-Elements in Angular

![image](https://user-images.githubusercontent.com/210413/49486685-078ce800-f805-11e8-9b58-a01fa819a989.png)

Sometimes referred to as ‘skeletons’, ghost elements are gray-box representations of pending UI that will be available in the future; once async data is loaded or perhaps a lazy-loaded module is ready. 

> Ghost elements are very useful for implementations of complex tables and other UX where data loads are not trivial.

While many applications [most notably Slack and Facebook] incorporate UX with skeletons and CSS, the Angular developer community has yet to discuss this technique in any detail. 

---- 

### Blog on Medium.com

[![image](https://user-images.githubusercontent.com/210413/50376033-838c7b80-05cc-11e9-8726-4ad74fff7c4c.png)](https://blog.angularindepth.com/https-medium-com-thomasburleson-animated-ghosts-bfc045a51fba)

----

#### Approaches

Ghost views can be used in two (2) ways:

1. Inline-elements that either show ghosts or 'real' data
2. Separate, distinct overlays that of DOM elements used in place of the 'real' elements (DOM)

For lists or tables, ghost elements can be especially challenging to implement.

The advantage of (2) is that developers have maximum power to animated the ghost elements and the real elements simultaneously. Especially for lists, where developers may want to stagger items as the `:enter` or `:leave`.

This repository demonstrates ideas on how to partition, implement, and animate **ghost elements**... implemented with Angular 7.x and `@angular/animations`. 

----

####  StackBlitz Demo

1.) [Animated Ghosts Overlay](https://stackblitz.com/edit/angular-animated-ghost-elements-demo)
 
[![image](https://user-images.githubusercontent.com/210413/49587645-1ae5a380-f92a-11e8-9ead-787f337a8511.png)](https://stackblitz.com/edit/angular-animated-ghost-elements-demo?file=src%2Fapp%2Fuser-list%2Fuser-list.component.html)

<br/>

2.) [Animated Inline Ghosts](https://stackblitz.com/edit/angular-animated-ghost-elements-inline-demo)

[![image](https://user-images.githubusercontent.com/210413/49587652-1faa5780-f92a-11e8-81ff-8107aa418820.png)](https://stackblitz.com/edit/angular-animated-ghost-elements-inline-demo)

<br/>


3.) [Animated Ghosts + AsyncItem](https://stackblitz.com/edit/angular-animated-ghost-elements-inline-async-demo?file=src%2Fapp%2Fuser-list%2Fuser-list.component.ts)

[![image](https://user-images.githubusercontent.com/210413/50376051-fe559680-05cc-11e9-980d-8e386ffc487d.png)](https://stackblitz.com/edit/angular-animated-ghost-elements-inline-async-demo)


----


#### Learning Resources

* https://www.viget.com/articles/a-bone-to-pick-with-skeleton-screens/
* https://codepen.io/NickNoordijk/pen/VLvxLE
* https://css-tricks.com/building-skeleton-screens-css-custom-properties/
* https://blog.ionicframework.com/improved-perceived-performance-with-skeleton-screens/
  * https://github.com/ionic-team/ionic/tree/master/core/src/components/skeleton-text
* https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    template:`
      <!-- main app container -->
      <div class="jumbotron">
        <div class="container">
          <div class="col-sm-8 col-sm-offset-2">
            <alert></alert>
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>

      <!-- credits -->
      <div class="text-center">
        <p>
          <a href="https://www.thenarwhalproject.com/" target="_top">The Narwhal Project</a>
        </p>
      </div>
    `
})

export class AppComponent { }

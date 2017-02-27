import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HotelsComponent} from "../components/hotels/hotels.component";
import {HotelsSearchFormComponent} from "../components/hotels-search-form/hotels-search-form.component";

const routes: Routes = [
  {path: '', component: HotelsSearchFormComponent},
  {path: 'hotels', component: HotelsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamsComponent } from './streams/streams.component'
import { StreamDetailComponent }  from './stream-detail/stream-detail.component';
import { AboutComponent }  from './about/about.component';

const routes: Routes = [
	{ path: 'search', component: StreamsComponent },
	{ path: 'stream/:id', component: StreamDetailComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Stream } from '../stream';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StreamService }  from '../stream.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.css']
})
export class StreamDetailComponent implements OnInit {
  @Input() stream: Stream;

  controllerSrc: SafeResourceUrl;

  timer: number;

  constructor(
    private route: ActivatedRoute,
    private streamService: StreamService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
	 this.getStream();
  }

  ngOnDestroy() {
   clearInterval(this.timer);
  }
  
  getStream(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != null){
      this.streamService.getStream(id)
        .subscribe(response => {
          this.stream = this.convertResponseToStream(response);
          this.updateViewers();
          var url = "https://player.twitch.tv/?channel=" + this.stream.name;
          this.controllerSrc = this.getSafeUrl(url);
        });
    }
  }

  convertResponseToStream(streamsResponse?:any): Stream{
    var stream: Stream = new Stream({
                  id:streamsResponse._id,
                  game:streamsResponse.game,
                  name:streamsResponse.name,
                  description:streamsResponse.description,
                  display_name:streamsResponse.display_name,
                  language:streamsResponse.language,
                  viewers:streamsResponse.views,
                  logo:streamsResponse.logo,
                  url:streamsResponse.url}
      );
    return stream;
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  updateStreamViewers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != null){
      this.streamService.getStream(id)
        .subscribe(response => {
          console.log((response as any).views);
          this.stream.viewers = (response as any).views;
        });
    }
  }

  updateViewers(): void {
       this.timer = setInterval(() => {    
          this.updateStreamViewers();
        }, 20000);
    }

}

import { Component, OnInit } from '@angular/core';

import { Stream } from '../stream';
import { StreamService } from '../stream.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  streams: Stream[] = [];

  constructor(private streamService: StreamService) { }

  ngOnInit() {
    this.getStreams(); 
  }

  getStreams(): void {
  	this.streamService.getStreams()
      .subscribe(response => {
        this.streams = this.convertResponseToStreams((response as any).streams);
      });
  }

  search(term: string): void {
    if (term != null && term != ""){
      this.searchStreams(term);
    }
  }

  searchStreams(query:string): void {
    this.streamService.search(query)
      .subscribe(response => {
        this.streams = this.convertResponseToStreams((response as any).streams);
      });
  }

  convertResponseToStreams(streamsResponse?:any): Stream[]{
    var streams: Stream[] = [];
    for (let stream of streamsResponse) {
      streams.push(new Stream({
                  id:stream.channel._id,
                  game:stream.channel.game,
                  name:stream.channel.name,
                  description:stream.channel.description,
                  display_name:stream.channel.display_name,
                  language:stream.channel.language,
                  viewers:stream.viewers,
                  logo:stream.preview.medium,
                  url:stream.channel.url}
      ));
    }
    return streams;
  }

    saveLimit(limit: string, query: string): void {
    if (typeof(Storage) !== "undefined") {
      if (limit != null && limit != ""){
        localStorage.setItem("Limit", limit);
      }
      if (query != null && query != ""){
        this.search(query);
      }
    } else {
      console.log("Sorry, your browser does not support Web Storage...");
    }
  }
}
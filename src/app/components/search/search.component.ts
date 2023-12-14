import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TopicService } from "../../services/topic.service";
import { Topic } from "../../models/topic";

@Component({
  selector: "app-search",
  templateUrl: "../topics/topics.component.html",
  styleUrls: ["./search.component.css"],
  providers: [TopicService],
})
export class SearchComponent implements OnInit {
  public page_title: string;
  public topics: Topic[];
  public no_paginate: boolean;

  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Buscar: ";
    this.no_paginate = true;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      var search = params["search"];
      this.page_title = this.page_title + " " + search;
      console.log(search);
      this.getTopics(search);
    });
  }

  getTopics(search: string) {
    this._topicService.search(search).subscribe(
      (response) => {
        if (response.topics) {
          this.topics = response.topics;
        }
      },
      (error) => {
        this.page_title = "Buscar: ";
        console.log(error);
      }
    );
  }
}

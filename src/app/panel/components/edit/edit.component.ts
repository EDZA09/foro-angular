import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../../models/topic";
import { UserService } from "../../../services/user.service";
import { TopicService } from "../../../services/topic.service";

@Component({
  selector: "app-edit",
  templateUrl: "../add/add.component.html",
  styleUrls: ["./edit.component.css"],
  providers: [UserService, TopicService],
})
export class EditComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public identity;
  public token: string;
  public status: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Editar tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic("", "", "", "", "", "", this.identity.sub, "");
    this.is_edit = true;
  }

  ngOnInit() {
    this.getMyTopic();
  }

  getMyTopic() {
    this._route.params.subscribe((params: Params) => {
      let id = params["id"];

      this._topicService.getTopic(id).subscribe(
        (response) => {
          if (!response.topic) {
            this._router.navigate(["/panel"]);
          } else {
            this.topic = response.topic;
            //this._router.navigate(["/list"]);
          }
        },
        (error) => {
          this.status = "error";
          console.log(error);
        }
      );
    });
  }

  onSubmit(form) {
    var id = this.topic._id;
    this._topicService.update(this.token, id, this.topic).subscribe(
      (response) => {
        if (response.topicUpdated) {
          this.status = "success";
          this.topic = response.topicUpdated;
          console.log(this.status);
        } else {
          this.status = "error";
        }
      },
      (error) => {
        this.status = "error";
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../models/topic";
import { TopicService } from "../../services/topic.service";
import { UserService } from "../../services/user.service";
import { CommentService } from "../../services/comment.service";
import { global } from "../../services/global";

import { Comment } from "../../models/comment";

@Component({
  selector: "app-topic-detail",
  templateUrl: "./topic-detail.component.html",
  styleUrls: ["./topic-detail.component.css"],
  providers: [TopicService, UserService, CommentService],
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic("", "", "", "", "", "", "", "");
    if (this.identity != null) {
      this.comment = new Comment("", "", "", this.identity._id);
    }

    this.url = global.url;
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this._route.params.subscribe((params) => {
      let id = params["id"];

      this._topicService.getTopic(id).subscribe(
        (response) => {
          if (response.topic) {
            this.topic = response.topic;
          } else {
            this._router.navigate(["/inicio"]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(formComment) {
    /*console.log(
      "Comentario: " +
        this.comment +
        "\n Token: " +
        this.token +
        "\n Topic._id: " +
        this.topic._id
    );*/
    this._commentService
      .add(this.token, this.comment, this.topic._id)
      .subscribe(
        (response) => {
          if (!response.topic) {
            this.status = "error";
          } else {
            this.status = "success";
            this.topic = response.topic;
            formComment.reset();
          }
        },
        (error) => {
          this.status = "error";
          console.log(error);
        }
      );
  }

  deleteComment(commentId) {
    this._commentService
      .delete(this.token, this.topic._id, commentId)
      .subscribe(
        (response) => {
          if (!response.topic) {
            this.status = "error";
          } else {
            this.status = "succes";
            this.topic = response.topic;
          }
        },
        (error) => {
          this.status = "error";
          console.log(error);
        }
      );
  }
}

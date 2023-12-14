import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";
import { User } from "../../models/user";
import { Topic } from "../../models/topic";
import { TopicService } from "src/app/services/topic.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [UserService, TopicService],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public topics: Topic[];
  public url: string;
  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
    this.user = new User("", "", "", "", "", "", "ROLE_USER");
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      var userId = params["id"];
      this.getTopics(userId);
      this.getUser(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      (response) => {
        if (response.user) {
          this.user = response.user;
        } else {
          //redirección
          this._router.navigate(["/inicio"]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopics(userId) {
    this._topicService.getMyTopics(userId).subscribe(
      (response) => {
        if (response.topics) {
          this.topics = response.topics;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

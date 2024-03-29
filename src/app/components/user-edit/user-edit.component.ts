import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public afuConfig;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Ajustes de Usuario";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .gif",
      uploadAPI: {
        url: this.url + "upload-avatar",
        headers: {
          Authorization: this.token,
        },
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: "Sube tu foto...",
        afterUploadMsg_success: "Subida Exitosa",
        afterUploadMsg_error: "Error en la Subida",
      },
    };
  }

  avatarUpload(data) {
    let data_obj = JSON.parse(data.response);
    //console.log(data_obj);

    this.user.image = data_obj.user.image;
    //console.log(this.user);
  }

  ngOnInit() {}

  onSubmit() {
    this._userService.update(this.user).subscribe(
      (response) => {
        if (!response.user) {
          this.status = "error";
        }
        this.status = "success";

        localStorage.setItem("identity", JSON.stringify(this.user));
      },
      (error) => {
        console.log(error);
        this.status = "error";
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public status: string;
  public token: string;
  public url: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Identificate";
    this.user = new User("", "", "", "", "", "", "ROLE_USER");
    this.url = global.url;
  }

  ngOnInit() {}

  onSubmit(form) {
    //console.log(this.user);
    // Conseguir el objeto completo del Usuario Logueado
    this._userService.signUp(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          // Guardamos el usuario en una propiedad
          this.identity = response.user;
          // Registramos los datos del usuario a la sesión
          localStorage.setItem("identity", JSON.stringify(this.identity));

          // Conseguir el token del usuario identificado
          this._userService.signUp(this.user, "true").subscribe(
            (response) => {
              if (response.token) {
                // guardamos el token del usuario en una propiedad
                this.token = response.token;

                // Registramos el token del usuario a la sesión
                localStorage.setItem("token", this.token);
                this.status = "success";
                this._router.navigate(["/inicio"]);
              } else {
                this.status = "error";
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.status = "error";
        }

        //form.reset();
      },
      (error) => {
        this.status = "error";
        console.log(error);
      }
    );
  }
}

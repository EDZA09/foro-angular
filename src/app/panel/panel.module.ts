// Modulos
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PanelRoutingModule } from "./panel-routing.module";
import { MomentModule } from "angular2-moment";

// Componentes
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";

// Servicios
import { UserService } from "../services/user.service";
import { UserGuard } from "../services/user.guard";

// Configuración con el NgModule
@NgModule({
  declarations: [MainComponent, ListComponent, AddComponent, EditComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    PanelRoutingModule,
    CommonModule,
    MomentModule,
  ],
  providers: [UserGuard, UserService],
  exports: [MainComponent, ListComponent, AddComponent, EditComponent],
})
export class PanelModule {}

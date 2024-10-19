import { NgModule } from "@angular/core";
import { MessageComponent } from "./message.component";
import { UppercaseDirective } from "../uppercase.directive";
import { CommonModule } from "@angular/common";






@NgModule({
declarations: [
    MessageComponent,
    UppercaseDirective
],
imports: [
    CommonModule
],
exports: [
    MessageComponent,
    UppercaseDirective
]
})


export class SharedModule {}
import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from "@angular/common";
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from "primeng/api";
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    exports: [
        FormsModule,
        CommonModule,
        MessagesModule,
        MessagesModule,
        ToastModule,
        ButtonModule,
        AvatarModule,
        AvatarGroupModule,
        TooltipModule,
        SidebarModule,
        AccordionModule,
        OverlayPanelModule,
        DialogModule,
        CardModule,
        InputTextModule,
        InputSwitchModule,
        ProgressSpinnerModule,
        PasswordModule,
        ConfirmDialogModule,
        InputMaskModule,
        DropdownModule,
        SplitButtonModule,
        TableModule,
        PanelModule,
        TabViewModule,
        TreeSelectModule,
        InputNumberModule,
        DividerModule,
        PaginatorModule,
        CalendarModule,
        InputTextareaModule,
        TagModule,
        CheckboxModule,
        MultiSelectModule
      
    ]
})

export class PrimeNgModule {}

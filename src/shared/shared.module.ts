import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, FormsModule, HttpModule],
    exports: [ModalComponent]
})
export class SharedModule { }

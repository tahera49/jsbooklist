import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { ModalComponent } from './components/modal/modal.component';
import { SortPipe } from './components/pipes/sort.pipe';


@NgModule({
    declarations: [ModalComponent, SortPipe],
    imports: [CommonModule, FormsModule, HttpModule],
    exports: [ModalComponent, SortPipe]
})
export class SharedModule { }

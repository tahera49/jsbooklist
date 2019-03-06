import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

describe('Component:AppComponent', () => {
  var component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        ModalComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnInit(); 
  });

  describe('unit tests:', () => {
    it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('JS Book List');
    }));

    it('should render title in a h2 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('JS Books');
    }));

    it('should call resetForm success', async(() => {
      spyOn(component, 'resetForm').and.callThrough();
      var mockElement = document.createElement('input');
      mockElement.value = 'test';
      document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockElement);
      component.sortForm = new FormGroup({});
      component.resetForm();
      expect(component.resetForm).toHaveBeenCalled();
      expect(mockElement.value).toBe('test');
    }));

    it('create SortForm', () => {
      expect(component.sortForm.valid).toBeTruthy();
    });

    it('create FilterForm', () => {
      expect(component.filterForm.valid).toBeTruthy();
    });
  });
});

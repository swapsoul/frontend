import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/routes/essentials/essentials.component.spec.ts
import { EssentialsComponent } from './essentials.component';

describe('EssentialsComponent', () => {
  let component: EssentialsComponent;
  let fixture: ComponentFixture<EssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialsComponent ]
=======
import { WomenComponent } from './women.component';

describe('WomenComponent', () => {
  let component: WomenComponent;
  let fixture: ComponentFixture<WomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenComponent ]
>>>>>>> ff1958d... Women Component and minor changes in navbar:src/app/routes/women/women.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/routes/essentials/essentials.component.spec.ts
    fixture = TestBed.createComponent(EssentialsComponent);
=======
    fixture = TestBed.createComponent(WomenComponent);
>>>>>>> ff1958d... Women Component and minor changes in navbar:src/app/routes/women/women.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

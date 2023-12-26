import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberRolesComponent } from './edit-member-roles.component';

describe('EditMemberRolesComponent', () => {
  let component: EditMemberRolesComponent;
  let fixture: ComponentFixture<EditMemberRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

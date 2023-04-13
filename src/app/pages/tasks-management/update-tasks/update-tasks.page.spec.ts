import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTasksPage } from './update-tasks.page';

describe('UpdateTasksPage', () => {
  let component: UpdateTasksPage;
  let fixture: ComponentFixture<UpdateTasksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

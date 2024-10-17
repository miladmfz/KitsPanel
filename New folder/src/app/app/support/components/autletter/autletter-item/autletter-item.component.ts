import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { AutletterWebApiService } from 'src/app/app/support/services/AutletterWebApi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IDatepickerTheme } from 'ng-persian-datepicker';
import { Router } from '@angular/router';
import { AgGridBaseComponent } from 'src/app/app-shell/framework-components/ag-grid-base/ag-grid-base.component';
import { DbSetup_lookup } from '../../../lookup-type';
import { CellActionAutletterRowList } from './cell-action-autletterrow-list';
@Component({
  selector: 'app-autletter-item',
  templateUrl: './autletter-item.component.html',
})
export class AutletterItemComponent
  extends AgGridBaseComponent
  implements OnInit {

  constructor(
    private router: Router,
    private repo: AutletterWebApiService,

    private renderer: Renderer2
  ) {
    super();
  }


  EditForm = new FormGroup({
    dateValue: new FormControl(''),
    descriptionFormControl: new FormControl(''),
    LetterState: new FormControl(''),
    LetterPriority: new FormControl('عادی'),
    selectedUserId: new FormControl(0),
  });


  set_Alarm = new FormGroup({
    LetterRef: new FormControl(''),
    CentralRef: new FormControl('0'),
  });



  customTheme: Partial<IDatepickerTheme> = {
    selectedBackground: '#D68E3A',
    selectedText: '#FFFFFF',

  };




  records: any[] = [];
  title = 'لیست تیکت های ارسالی ';
  CentralRef: string = '';
  JobPersonRef: string = '';
  Searchtarget: string = '';
  items: any[] = [];
  selectedOption: string = '0';

  searchTerm: string = '';




  @Input() TextData: string = '';

  users: any[] = [];


  ToDayDate: string = "";
  LetterState_lookup: DbSetup_lookup[] = []
  LetterPriority_lookup: DbSetup_lookup[] = []


  override ngOnInit(): void {
    super.ngOnInit();

    this.repo.GetTodeyFromServer().subscribe((data: any) => {

      this.ToDayDate = data[0].TodeyFromServer

    });

    this.repo.GetObjectTypeFromDbSetup("AutomationLetterState").subscribe((data: any) => {

      this.LetterState_lookup = data.ObjectTypes
    });

    this.repo.GetObjectTypeFromDbSetup("AutomationLetterPriority").subscribe((data: any) => {

      this.LetterPriority_lookup = data.ObjectTypes
    });




    this.JobPersonRef = sessionStorage.getItem("JobPersonRef");



    this.columnDefs = [
      {
        field: 'عملیات',
        pinned: 'left',
        cellRenderer: CellActionAutletterRowList,
        cellRendererParams: {
          editUrl: '/support/letter-detail',
        },
        width: 100,
      },
      {
        field: 'RowExecutorName',
        headerName: 'کاربر',
        filter: 'agSetColumnFilter',
        cellClass: 'text-center',
        minWidth: 150
      },
      {
        field: 'RowLetterDate',
        headerName: 'تاریخ',
        filter: 'agSetColumnFilter',
        cellClass: 'text-center',
        minWidth: 150
      },
      {
        field: 'LetterRowState',
        headerName: 'LetterRowState	',
        filter: 'agSetColumnFilter',
        cellClass: 'text-center',
        minWidth: 150
      },
      {
        field: 'LetterRowDescription',
        headerName: 'شرح	',
        filter: 'agSetColumnFilter',
        cellClass: 'text-center',
        minWidth: 150
      },

    ];


    this.CentralRef = sessionStorage.getItem("CentralRef");
    this.repo.GetCentralUser().subscribe(e => {
      this.users = e;

    });


    this.set_Alarm.patchValue({
      LetterRef: this.TextData,
      CentralRef: this.CentralRef,
    });



    this.Get_LetterRowList()

  }


  Get_LetterRowList() {

    this.repo.GetLetterRowList(this.TextData).subscribe((data) => {
      this.records = data;
      //this.repo.SetAlarmOff(this.set_Alarm.value).subscribe(e => { });


    });

  }




  submit(action) {

    const command = this.EditForm.value;
    if (action == 'delete') {

    }



    this.repo.AutLetterRowInsert(
      this.TextData,
      this.ToDayDate,
      this.EditForm.value.descriptionFormControl,
      this.EditForm.value.LetterState,
      this.EditForm.value.LetterPriority,
      this.CentralRef,
      this.EditForm.value.selectedUserId.toString()
    ).subscribe(e => {
      const intValue = parseInt(e[0].LetterRef, 10);
      if (!isNaN(intValue) && intValue > 0) {
        this.router.navigate(['/support/letter-list']);
      } else {
        console.log("insert nashod")
      }

    });



  }

  EditForm_explain = new FormGroup({
    ObjectRef: new FormControl('0'),
    LetterState: new FormControl(''),

  });



  Get_Autletterrow_Property(LetterRowCode, LetterState) {

    this.EditForm_explain.patchValue({
      ObjectRef: LetterRowCode,
      LetterState: LetterState,
    });



    this.explain_dialog_show()


  }




  Set_Autletterrow_Property() {
    console.log(this.EditForm_explain)
    this.repo.Update_AutletterRow(this.EditForm_explain.value).subscribe((data: any) => {
      this.explain_dialog_close()
      this.Get_LetterRowList()
    });
  }


  explain_dialog_show() {
    const modal = this.renderer.selectRootElement('#autletterrowmodal', true);
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.setAttribute(modal, 'aria-modal', 'true');
    this.renderer.setAttribute(modal, 'role', 'dialog');
  }
  explain_dialog_close() {
    const modal = this.renderer.selectRootElement('#autletterrowmodal', true);
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.removeAttribute(modal, 'aria-modal');
    this.renderer.removeAttribute(modal, 'role');
  }


}

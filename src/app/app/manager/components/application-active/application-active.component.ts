import { Component, OnInit } from '@angular/core';
import { ManagerWebApiService } from '../../services/ManagerWebApi.service';
import { AgGridBaseComponent } from 'src/app/app-shell/framework-components/ag-grid-base/ag-grid-base.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/app-shell/framework-services/local.storage.service';
import { SettingService } from 'src/app/app-shell/framework-services/setting.service';

@Component({
  selector: 'app-application-active',
  templateUrl: './application-active.component.html',
})
export class ApplicationActiveComponent extends AgGridBaseComponent
  implements OnInit {
  records;
  title = 'لیست نرم افزار های فعال';

  constructor(
    private readonly router: Router,
    private repo: ManagerWebApiService,
    localStorageService: LocalStorageService,
    settingService: SettingService
  ) {
    super(localStorageService, settingService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.columnDefs = [

      {
        field: 'Server_Name',
        headerName: 'Server_Name',
        filter: 'agSetColumnFilter',
      },
      {
        field: 'BrokerStr',
        headerName: 'BrokerStr ',
        filter: 'agSetColumnFilter',
        headerClass: 'text-danger',
        cellClass: 'text-center',
      },

    ];

    this.getList();
  }
  getList() {

    this.repo.GetActiveApplication().subscribe((data) => {
      this.records = data;

    });

  }


}

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
declare var $: any;

@Component({
    selector: 'edit-delete-cell-renderer',
    template: ` 
  <span class="btn btn-sm btn-outline-primary ">
  <a [routerLink]="[params.editUrl, id]">
    <i class="fas fa-edit"></i>
  </a>
  </span>
  `,

})

export class CellActionAutletterWork implements ICellRendererAngularComp {
    params: any;
    canEdit: true;
    canDelete: true;
    canView: true;
    id: 0;

    refresh(params: any): boolean {
        return true;
    }

    agInit(params: any): void {
        this.params = params;
        if (params.canEdit) {
            this.canEdit = params.canEdit;
        }
        if (params.canDelete) {
            this.canDelete = params.canDelete;
        }

        if (params.canView) {
            this.canView = params.canView;
        }

        if (params.data.LetterCode) {
            this.id = params.data.LetterCode;
        }
    }

    btnDeleteClicked(arg) {
        this.params.context.componentParent.delete(this.params.data.LetterCode);
    }


}

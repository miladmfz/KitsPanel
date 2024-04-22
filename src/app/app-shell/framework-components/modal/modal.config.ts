export class ModalConfig {
  id: string = 'ops-modal';
  size: string;
  modalTitle: string;
  closeButtonLabel?: string = 'انصراف';
  submitButtonLabel?: string = 'ذخیره';
  titleClassName?: string;
  disableSubmitButton?: boolean = false;
  disableCloseButton?: boolean = false;
  hideSubmitButton?: boolean = false;
  hideCloseButton?: boolean = false;
  hideHeader?: boolean = false;
  hideFooter?: boolean = false;
  dualSave?: boolean = true;
}

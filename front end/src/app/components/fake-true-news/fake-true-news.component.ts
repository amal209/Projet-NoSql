import { MyServiceService } from './../../services/my-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content-news',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Décision!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Aprés l'analyse de ce news,</p>
      <p>Le résultat est: {{decision}}!</p>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContentNews {
  @Input() decision;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-fake-true-news',
  templateUrl: './fake-true-news.component.html',
  styleUrls: ['./fake-true-news.component.css']
})
export class FakeTrueNewsComponent  {

  closeResult = '';
  constructor(private modalService: NgbModal, private myservice: MyServiceService) { }

  clear(form : NgForm){
    form.form.reset();
  }
  onSubmit(newsForm) {
     //getting the result from the backend using the service (getting only the value and ignoring the key)
     let result  = Number(this.myservice.verifyNews(newsForm.news)) ;
     let decision : string;
     if (result==1){
       decision= "Positif"

     }
     else{
       decision= "Négatif"

     }
    const modalRef = this.modalService.open(NgbdModalContentNews);
    modalRef.componentInstance.decision = decision;
  }


}

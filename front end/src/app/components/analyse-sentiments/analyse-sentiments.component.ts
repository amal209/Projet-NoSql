import { MyServiceService } from './../../services/my-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal ,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Décision!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Aprés l'analyse de ce sentiment ,</p>
      <p> le résultat est: {{decision}}!</p>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})


export class NgbdModalContent {
  @Input() decision;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-analyse-sentiments',
  templateUrl: './analyse-sentiments.component.html',
  styleUrls: ['./analyse-sentiments.component.css']
})
export class AnalyseSentimentsComponent  {

  closeResult = '';
  constructor(private modalService: NgbModal, private myservice: MyServiceService) { }
  clear(form : NgForm){
    form.form.reset();
  }
  onSubmit(sentimentsForm) {
    //getting the result from the backend using the service (getting only the value and ignoring the key)
    let result:Number;
    this.myservice.verifySentiment(sentimentsForm.comment).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);

    });

    let decision : string;
    if (result==1){
      decision= "Positif"

    }
    if (result==0){
      decision= "Négatif"

    }


    const modalRef = this.modalService.open(NgbdModalContent);
    //assign the decision to the modal
    modalRef.componentInstance.decision =decision ;
  }

}

import { ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailConfirmationService } from 'src/app/services/email-confirmation.service';

@Component({
  selector: 'app-confirmation-user',
  templateUrl: './confirmation-user.component.html',
  styleUrls: ['./confirmation-user.component.css']
})
export class ConfirmationUserComponent implements OnInit {

  constructor(private emailConfirmation: EmailConfirmationService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService
  ) { }

  reloadPage() { window.location.reload() }


  @ViewChild('load')
  element: ElementRef;
  ngOnInit(): void {

    setTimeout(() => {
      this.element.nativeElement.click()
    }, 500);


    this.activatedRoute.queryParams.subscribe(param => {

      this.emailConfirmation.nuevo(param.token).subscribe(response => {

        this.route.navigate(["/login/"]).then(() => this.reloadPage());
        this.toastr.success("Cuenta confirmada correctamente.")
      }, err => {
        this.route.navigate(["/login/"]).then(() => this.reloadPage());
        this.toastr.error("Se ha producido un error al confirmar la cuenta.")

      })

    })





  }

}
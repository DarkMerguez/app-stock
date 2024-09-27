import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { RouterLink } from '@angular/router';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { Image } from '../../../utils/interfaces/image';
import { EnterpriseDetailsComponent } from '../enterprise-details/enterprise-details.component';

@Component({
  selector: 'app-enterprise',
  standalone: true,
  imports: [RouterLink,EnterpriseDetailsComponent],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css'
})
export class EnterpriseComponent implements OnInit {

  private api = inject(ApiService);

  user: User = {} as User;
  enterprise: Enterprise = {} as Enterprise;
  imageEnterprise: Image = {} as Image;

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
  

      if (this.user.EnterpriseId !== undefined) {
        this.api.getEnterpriseById(this.user.EnterpriseId).subscribe((enterprise: Enterprise) => {
          this.enterprise = enterprise;

          this.api.getImageById(this.enterprise.ImageId).subscribe((imageEnterprise: Image) => {
            this. imageEnterprise = imageEnterprise;
          })
        });
      } else {
        console.log("Pas d'entreprise assignée à cet user");
      }
    });
  }

}

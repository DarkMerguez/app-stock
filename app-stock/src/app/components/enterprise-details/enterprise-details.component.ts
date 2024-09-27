import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { Image } from '../../../utils/interfaces/image';
import { RouterLink } from '@angular/router';
import { EnterpriseCategory } from '../../../utils/interfaces/enterpriseCategory';

@Component({
  selector: 'app-enterprise-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './enterprise-details.component.html',
  styleUrl: './enterprise-details.component.css'
})
export class EnterpriseDetailsComponent {

  private api = inject(ApiService);

  user: User = {} as User;
  enterprise: Enterprise = {} as Enterprise;
  imageEnterprise: Image = {} as Image;
  enterpriseCategory: EnterpriseCategory = {} as EnterpriseCategory;

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
  

      if (this.user.EnterpriseId !== undefined) {
        this.api.getEnterpriseById(this.user.EnterpriseId).subscribe((enterprise: Enterprise) => {
          this.enterprise = enterprise;
          console.log(enterprise);

          this.api.getImageById(this.enterprise.ImageId).subscribe((imageEnterprise: Image) => {
            this. imageEnterprise = imageEnterprise;
          })

          this.api.getEnterpriseCategory(this.enterprise.EnterpriseCategoryId).subscribe((enterpriseCategory: EnterpriseCategory) => {
            this.enterpriseCategory = enterpriseCategory;
          })
        });
      } else {
        console.log("Pas d'entreprise assignée à cet user");
      }
    });
  }

}

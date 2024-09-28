import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-form-update-user',
  standalone: true,
  imports: [],
  templateUrl: './form-update-user.component.html',
  styleUrl: './form-update-user.component.css'
})
export class FormUpdateUserComponent implements OnInit {

  private api = inject(ApiService);
  user : User = {} as User;

  ngOnInit(): void {
    this.api.getUser().subscribe((user) => {
      this.user = user
      console.log(user)
    })
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enterprise',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css'
})
export class EnterpriseComponent implements OnInit {

  private apiService = inject(ApiService);

  user: User = {} as User;

  ngOnInit(): void {
    this.apiService.getUser().subscribe((user: User) => {

      this.user = user;

    });
  }

}

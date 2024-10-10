import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { Image } from '../../../utils/interfaces/image';
import { User } from '../../../utils/interfaces/user';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-update-user',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './form-update-user.component.html',
  styleUrls: ['./form-update-user.component.css']
})
export class FormUpdateUserComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  avatar: Image = {} as Image;
  user: User = {} as User;
  userEnterprise: Enterprise = {} as Enterprise;
  updateUserForm!: FormGroup;
  passwordsMatch: boolean = true;
  initialEmail!: string;  // Pour stocker l'email initial
  initialPassword!: string;  // Pour stocker un indicateur du mot de passe initial

  ngOnInit(): void {
    // Initialisation du formulaire réactif avec validation
    this.updateUserForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirmPassword: ['']
    });

    // Surveiller les changements du champ confirmPassword pour comparer avec le champ password
    this.updateUserForm.get('confirmPassword')?.valueChanges.subscribe(confirmPassword => {
      const password = this.updateUserForm.get('password')?.value;
      this.passwordsMatch = password === confirmPassword;
    });

    // Récupérer les informations de l'utilisateur
    this.apiService.getUser().subscribe((user: User) => {
      this.user = user;
      this.initialEmail = user.email; // Stocker l'email initial
      this.initialPassword = ''; // Pas de mot de passe initial car non récupéré

      this.updateUserForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });

      if (user.ImageId) {
        this.apiService.getAvatar(user.ImageId).subscribe((avatar: Image) => {
          this.avatar = avatar;
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      this.apiService.uploadImage(formData).subscribe({
        next: (response) => {
          if (response && response.image && response.image.id) {
            this.updateUserAvatar(response.image.id);
          }
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        }
      });
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onSubmit() {
    if (this.updateUserForm.valid && this.passwordsMatch) {
      const updatedUser: Partial<User> = {
        firstName: this.updateUserForm.value.firstName,
        lastName: this.updateUserForm.value.lastName,
        email: this.updateUserForm.value.email,
      };

      // Ajouter le mot de passe s'il a été modifié
      if (this.updateUserForm.value.password) {
        updatedUser.password = this.updateUserForm.value.password;
      }

      // Vérification de l'ID utilisateur
      if (this.user.id) {
        this.apiService.updateUser(this.user.id, updatedUser).subscribe({
          next: () => {
            console.log('Utilisateur mis à jour avec succès');

            // Si l'email ou le mot de passe a été modifié
            const emailChanged = this.updateUserForm.value.email !== this.initialEmail;
            const passwordChanged = !!this.updateUserForm.value.password;

            if (emailChanged || passwordChanged) {
              this.authService.logout();
              this.router.navigate(['/signin']);
            }
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', err);
          }
        });
      } else {
        console.error('Erreur : L\'ID utilisateur est manquant.');
      }
    }
  }
  
  updateUserAvatar(imageId: number) {
    if (this.user.id) {
      const updatedUser: Partial<User> = { ImageId: imageId };
      this.apiService.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          this.apiService.getAvatar(imageId).subscribe((avatar: Image) => {
            this.avatar = avatar;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'avatar utilisateur:', err);
        }
      });
    } else {
      console.error("Erreur : L'ID de l'utilisateur est manquant.");
    }
  }
}
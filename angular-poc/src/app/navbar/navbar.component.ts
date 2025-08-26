import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  authService = inject(Auth);
  http = inject(HttpClient);

  userDeatils = this.authService.getUserDetails();
  userName = this.userDeatils ? this.userDeatils?.firstName + " " + this.userDeatils?.lastName : '';
  showProfileMenu = false;
  profileImageUrl: string | null = null;

  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.loadProfileImage();
  }

  loadProfileImage() {
    if (!this.userDeatils?.id) return;
    this.http.get<{ file_url: string }>(
      `http://127.0.0.1:8000/userprofile/profile-photo/${this.userDeatils.id}`
    ).subscribe({
      next: (res) => {
        if (res.file_url) {
          this.profileImageUrl = `http://127.0.0.1:8000${res.file_url}?t=${new Date().getTime()}`;
        }
      },
      error: (err) => {
        console.warn("No profile image found, showing default.");
        this.profileImageUrl = null;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showProfileMenu && this.elementRef.nativeElement) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.showProfileMenu = false;
      }
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}

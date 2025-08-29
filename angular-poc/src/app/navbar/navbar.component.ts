import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  authService = inject(Auth);
  http = inject(HttpClient);

  userName: string = '';
  showProfileMenu = false;
  profileImageUrl$ = new BehaviorSubject<string | null>(null);

  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.authService.userDetails$.subscribe(details => {
      if (details) {
        this.userName = `${details.firstName} ${details.lastName}`;
        this.loadProfileImage(details.userId);
      }
    });
  }

  loadProfileImage(userId: number) {
    if (!userId) return;
    this.http.get<{ file_url: string }>(
      `http://127.0.0.1:8000/userprofile/get-profile-photo/${userId}`
    ).subscribe({
      next: (res) => {
        if (res.file_url) {
          this.profileImageUrl$.next(`http://127.0.0.1:8000${res.file_url}?t=${new Date().getTime()}`);
        }
      },
      error: (err) => {
        console.warn("No profile image found, showing default.");
        this.profileImageUrl$.next(null);
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
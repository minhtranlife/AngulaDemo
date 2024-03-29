import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {   
    defaultAuth: any = {
        username: 'minhtran',
        password: '1',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;

    public isCheck: boolean = true;

    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
        
    ) {
        this.isLoading$ = this.authService.isLoading$;
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: [
                this.defaultAuth.username,
                Validators.compose([
                    Validators.required
                ]),
            ],
            password: [
                this.defaultAuth.password,
                Validators.compose([
                    Validators.required
                ]),
            ],
        });
    }

    submit() {
        this.hasError = false;
        
        const loginSubscr = this.authService
            .login(this.f.username.value, this.f.password.value)
            // .pipe(first())
            .subscribe((user: UserModel) => {
                if (user) {
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.hasError = true;  
                    this.toastr.error('Tài khoản hoặc mật khẩu không đúng !!! Vui lòng liên hệ quản trị viên',"Có lỗi xảy ra !!!");
                }
            });
        this.unsubscribe.push(loginSubscr);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}

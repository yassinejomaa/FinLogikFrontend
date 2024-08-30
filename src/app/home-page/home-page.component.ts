import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemoignageService } from 'src/services/temoignage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css',
  "../../assets/css/style.css",
  "../../assets/css/responsive.css",
  "../../assets/css/bootstrap.css",

  ]
})
export class HomePageComponent implements OnInit{
  constructor(private TS:TemoignageService ,private router:Router){}
  temoignages!:any | undefined;
  responsiveOptions: any[] = [];

  testimonialForm!: FormGroup;
  temoignage = {
    textTemoignage: "",
    statu: "inactive",
    UserId: parseInt(localStorage.getItem('userId') || '0')
  };

  ngOnInit(): void {
    this.testimonialForm = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
    
    this.getTemoignage()

  }

  getTemoignage(){ 
    this.TS.getAll().subscribe((r) => {
    this.temoignages =r;
    console.log(r)
  });
  }

  onSubmit(){
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['login']);
    }
    else{
        const messageControl = this.testimonialForm.get('message')?.value;
        console.log(messageControl)
        if (messageControl) {
          this.temoignage.textTemoignage = messageControl;
          console.log(this.temoignage);
          this.TS.envoyerTemoignage(this.temoignage).subscribe(()=>{
            alert("your testimonial request was send");
          })
        } else {
          alert("write a testimonial")
          console.log("2");
        }
    }
  }
  
}

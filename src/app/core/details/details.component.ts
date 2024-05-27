import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, mergeMap } from 'rxjs';
import { Product } from 'src/app/shared/models/common.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  imageUrl = environment.imageUrl;
  productDetais!: Product;
  paramId: number = 0;
  currency!: string;

  subscriptionObj = new Subscription();

  constructor(
    private http: HttpService,
    private router: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.subscriptionObj.add(this.router.params.pipe(mergeMap((res: any) => {
      if (res && res.id) {
        this.paramId = res.id
        return this.http.getSingleProduct(this.paramId)
      }
      return [];
    })).subscribe((det: any) => {
      if (det) {
        this.productDetais = det;
      }
    }));

    this.subscriptionObj.add(this.http.currency.subscribe((res: string) => {
      this.currency = res;
    }));
  }

  getStars(rating: number | undefined | null): string[] {
    if (rating !== undefined && rating !== null) {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push('star');
        } else if (i - 0.5 <= rating) {
          stars.push('star_half');
        } else {
          stars.push('star_border');
        }
      }
      return stars;
    } else {
      return [];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}

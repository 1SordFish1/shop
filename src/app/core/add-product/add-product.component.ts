import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { Product } from 'src/app/shared/models/common.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { SnakService } from 'src/app/shared/services/snak.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  imageUrl = environment.imageUrl;
  isEditor: boolean = false;
  productForm!: FormGroup;
  productDetail!: Product;
  imageSrc: string = '';
  file!: File;

  constructor(
    private http: HttpService,
    private snack: SnakService,
  ) { }

  @ViewChild('imageInput') imageInput!: ElementRef;

  @Output() closeDrawer = new EventEmitter<void>();

  @Input() productId!: number;

  ngOnInit(): void {
    this.http.isEdit.subscribe((res: any) => {
      if (res !== undefined) {
        this.isEditor = res;
        if(res) {
          this.http.prodId.pipe(mergeMap((resp: number) => {
            if (resp) {
              this.productId = resp;
              return this.http.getSingleProduct(resp);
            }
            return[];
          })).subscribe((prod: any) => {
            if (prod) {
              this.productDetail = prod;
              this.imageSrc = this.productDetail.image ? this.imageUrl + this.productDetail.image : '';
              this.formInitialize();
            }
          })
        } else {
          this.productDetail = {
            id: null,
            image: null,
            name: null,
            price: null,
            rating: null,
            author: null,
            description: null
          };
          this.imageSrc = ''
          this.formInitialize();
        }
      }
    });
  }

  formInitialize() {
    this.productForm = new FormGroup({
      name: new FormControl(
        this.productDetail && this.productDetail?.name ? this.productDetail?.name : null,
        [Validators.required, Validators.maxLength(50)]
      ),
      price: new FormControl(
        this.productDetail && this.productDetail?.price ? this.productDetail?.price : null,
        [Validators.required]
      ),
      rating: new FormControl(
        this.productDetail && this.productDetail?.rating ? this.productDetail?.rating : null,
        [Validators.required, Validators.max(5)]
      ),
      author: new FormControl(
        this.productDetail && this.productDetail?.author ? this.productDetail?.author : null,
        [Validators.required, Validators.maxLength(50)]
      ),
      description: new FormControl(
        this.productDetail && this.productDetail?.description ? this.productDetail?.description : null,
        [Validators.required, Validators.maxLength(1100)]
      ),
    })
  }

  imageUpload() {
    this.imageInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const imgFile = event.target as HTMLInputElement;
    if (imgFile.files && imgFile.files[0]) {
      this.file = imgFile.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const data = new FormData();
      if (this.file) {
        data.append('image', this.file);
      } else if(!this.isEditor) {
        this.snack.showConfirmation('Plese select an image','error');
      }
      data.append('name', this.productForm.get('name')?.value);
      data.append('price', this.productForm.get('price')?.value);
      data.append('rating', this.productForm.get('rating')?.value);
      data.append('author', this.productForm.get('author')?.value);
      data.append('description', this.productForm.get('description')?.value);
      if (this.isEditor) {
        this.http.updateProduct(this.productId, data).subscribe((res: any) => {
          if (res) {
            console.log('res...', res);
            this.productForm.reset();
            this.closeDrawer.emit();
            this.snack.showConfirmation('Product updated successfully','success');
          }
        });
      } else {
        this.http.addProduct(data).subscribe((res: any) => {
          if (res) {
            console.log('res...', res);
            this.productForm.reset();
            this.closeDrawer.emit();
            this.snack.showConfirmation('Product added successfully','success');
          }
        });
      }
    } else {
      this.snack.showConfirmation('Plese fill the required field','error');
    }
  }
}

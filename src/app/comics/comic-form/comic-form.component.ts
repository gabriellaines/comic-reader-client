import { Component } from '@angular/core';
import { ComicsService } from '../comics.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './comic-form.component.html',
  styleUrl: './comic-form.component.scss',
})
export class ComicFormComponent {
  public selectedFile!: File | null;
  public form!: FormGroup;

  constructor(
    private readonly comicsService: ComicsService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      file: [this.selectedFile, Validators.required],
    });
  }

  // comic upload code
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.form.patchValue({
        name: this.selectedFile.name,
      });
    }
  }

  submit() {
    if (this.form.invalid || !this.selectedFile) return;

    // append the file to the formData that will be posted
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('name', this.form.get(['name'])?.getRawValue());

    this.comicsService.uploadComic(formData).subscribe({
      next: (res) => {
        this.form.reset();

        this.selectedFile = null;

        // emit the event to update the comics list
      },
      error: (err) => console.error('Upload failed:', err),
    });
  }
}

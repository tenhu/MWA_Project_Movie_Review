import { Component, OnInit, Inject } from '@angular/core';
import { MovieManagerService } from '../services/movieManagerService';
import { PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


interface MovieDialogData {
  id?: string;
}

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {

  constructor(public dialog: MatDialog, private service:MovieManagerService) { }

  private options;
  movies={};
  ngOnInit(): void {
      this.list({p:1});
  }

  refresh(){
    this.list(this.options);
  }

  list(options){
    this.options = options;
    this.service.list(this.options={p:1})
    .then((result:any) => {
      this.movies = result != null?result:{};
    }).catch((err)=>{
      this.movies={};
    });
  }

  onPaging(page:PageEvent){
      this.list(Object.assign({}, this.options,{p:page.pageIndex}));
  }

  onSearch(q:string){        
      this.list(Object.assign({},this.options,{p:1,q:q}));
  }

  onAdd(){
    const dialogRef = this.dialog.open(ManageMovieFormComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null && result){
        this.refresh();   
      }      
    });
  }

  onEdit(movieid){
    const dialogRef = this.dialog.open(ManageMovieFormComponent, {
      data: {id:movieid}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null && result){
            this.refresh();   
      }
    });
  }

  onDelete(movieId){
    this.dialog.open(ConfirmDialogComponent,{data:{message:'Are you sure you want to delete this movie', icon:'warning'}})
    .afterClosed().subscribe(result => {
      if(result!=null){
        this.service.delete(movieId).then((deleteres:any)=>{
          if(deleteres.succeeded){
            this.refresh();        
          }
        });
      }
    });    
  }
}



@Component({
  selector: 'app-manage-movie-form',
  templateUrl: './manage-movie-form.component.html',
})
export class ManageMovieFormComponent implements OnInit {
  movie={};
  form:FormGroup;
  movieid:any = null;
  locking = false;
  constructor(
    private dialogRef: MatDialogRef<ManageMovieFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    private data: MovieDialogData, private service:MovieManagerService,
    private fb:FormBuilder) {    
      if(data.id!=null){
        this.loadmovie(data.id);
      }
      this.movieid = data.id;

      this.form = this.fb.group({
        'title': ['', Validators.required],
        'released': ['', Validators.required],
        'imageurl': ['', Validators.required],
        'director': ['', Validators.required],
        'description':['', Validators.required],
        'type':['', Validators.required]
      });  
    }

    private loadmovie(id){
      this.locking = false;
        this.service.get(id).then((m:any)=>{
          if(m.succeeded){
            this.movie = m.data;
          }else{
            this.dialogRef.close(false);
            this.dialog.open(ConfirmDialogComponent,{data:{message:'Movie not found', icon:'error', buttons:'okonly'}})
          }
        })
        .catch((err)=>{
          this.dialog.open(ConfirmDialogComponent,
            {data:{message:'Server error', buttons:'okonly', icon:'error'}});
        })
        .finally(()=>this.locking = false);
    }

    private getMovieFromForm(){
      return {
        title:this.form.controls['title'].value,
        released:this.form.controls['released'].value,
        imageurl:this.form.controls['imageurl'].value,
        director:this.form.controls['director'].value,
        description:this.form.controls['description'].value,
        type:this.form.controls['type'].value
      }
    }    

    hasError(field, rule){
      return this.form.get(field).hasError(rule)
            && this.form.get(field).touched
    }

  ngOnInit(): void {
  }

  onSave(){
      let p=this.movieid!=null?
      this.service.update(this.movieid, this.getMovieFromForm()):
      this.service.add(this.getMovieFromForm());
      p.then((saveres:any)=>{
        if(saveres.succeeded){
          this.dialogRef.close(true);
        }else{
          this.dialog.open(ConfirmDialogComponent,
            {data:{message:'Saving faield', buttons:'okonly', icon:'error'}});        
        }
      })
      .catch((err)=>{
        this.dialog.open(ConfirmDialogComponent,
          {data:{message:'Server error', buttons:'okonly', icon:'error'}});
      })
      .finally(()=>this.locking = false);
  }

  onCancel(){
    this.dialogRef.close();
  }
}

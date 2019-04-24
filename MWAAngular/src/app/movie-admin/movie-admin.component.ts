import { Component, OnInit, Inject } from '@angular/core';
import { MovieManagerService } from '../services/movieManagerService';
import { PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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

  constructor(public dialog: MatDialog, private service:MovieManagerService, private snackBar: MatSnackBar) { }

  private options;
  movies : any;
  displayedColumns: string[] = ['title', 'released', 'director','type', 'descripton','actions'];

  ngOnInit(): void {
      this.list({p:1});
  }

  refresh(){
    this.list(this.options);
  }

  list(options){
    this.options = options;
    this.service.list(this.options)
    .then((result:any) => {
      this.movies = result != null?result:{};
    }).catch((err)=>{
      this.movies={};
    });
  }

  onPaging(page:PageEvent){
      this.list(Object.assign({}, this.options,{p:page.pageIndex + 1}));
  }

  onSearch(q:string){        
      this.list(Object.assign({},this.options,{p:1,q:q}));
  }

  onAdd(){
    const dialogRef = this.dialog.open(ManageMovieFormComponent, {
      minWidth:'400px',width:'600px',
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
      minWidth:'400px',width:'600px',
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
      if(result!=null && result){
        this.service.delete(movieId).then((deleteres:any)=>{
          if(deleteres.succeeded){
            this.refresh(); 
            this.snackBar.open('Movie deleted successfully','',{duration: 2000});
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
  movie:any = {};
  form:FormGroup;
  movieid:any = null;
  locking = false;
  newobject = false;
  constructor(
    private dialogRef: MatDialogRef<ManageMovieFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    private data: MovieDialogData, private service:MovieManagerService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar) {    
      if(data.id!=null){
        this.loadmovie(data.id);
      }
      this.movieid = data.id;

      this.form = this.fb.group({
        'title': ['', Validators.required],
        'released': ['', Validators.required],
        'imageUrl': ['', Validators.required],
        'director': ['', Validators.required],
        'descripton':['', Validators.required],
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
            this.dialog.open(ConfirmDialogComponent,
              {data:{message:'Movie not found', icon:'error', buttons:'okonly'}}
            )
          }
        })
        .catch((err)=>{
          this.dialog.open(ConfirmDialogComponent,
            {              
              data:{message:'Server error', buttons:'okonly', icon:'error'}
            });
        })
        .finally(()=>this.locking = false);
    }

    private getMovieFromForm(){
      return {
        title:this.form.controls['title'].value,
        released:this.form.controls['released'].value,
        imageUrl:this.form.controls['imageUrl'].value,
        director:this.form.controls['director'].value,
        descripton:this.form.controls['descripton'].value,
        type:this.form.controls['type'].value
      }
    }    

    hasError(field, rule){
      return this.form.get(field).hasError(rule)
            && this.form.get(field).touched
    }

  ngOnInit(): void {
  }

  onSave(closeAfterSave){
    if(this.form.valid){
      let p=this.movieid!=null?
      this.service.update(this.movieid, this.getMovieFromForm()):
      this.service.add(this.getMovieFromForm());
      p.then((saveres:any)=>{
        if(saveres.succeeded){
          this.snackBar.open('Movie saved successfully','',{duration: 2000});
          if(closeAfterSave){
            this.dialogRef.close(true);
          }else{
            this.movieid = saveres.data._id;
            this.newobject = true;
          }
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
  }  

  onCancel(){
    this.dialogRef.close(this.newobject);
  }
}

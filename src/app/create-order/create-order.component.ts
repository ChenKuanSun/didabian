import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map, concatMap, tap, filter } from 'rxjs/operators';
import { Observable, from, of, iif, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../@core/order.interface';
import { Moment } from 'moment';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  public min = new Date();

  public max = new Date();


  uploadPercent$: Observable<number>;
  downloadURL: Observable<string>;

  order: Order = {
    uid: ''
  };

  uid: string;

  get shareUrl() {
    return `https://didabian.firebaseapp.com/follow-order?orderID=${this.order.uid}`;
  }

  checkUIDExist$ = (uid: string) =>
    this.afs
      .collection('order')
      .doc(uid)
      .get()
      .pipe(
        concatMap((data: any) => iif(() => !data.exists,
          this.createOrder$(),
          of(data)
        )),
        tap(res => localStorage.setItem('OrderUid', res.id)),
        tap(res => this.order.uid = res.id),
      )

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
  ) {
    this.uid = localStorage.getItem('OrderUid');
    if (!!this.uid) {
      this.checkUIDExist$(this.uid).subscribe();
    } else {
      this.createOrder$().pipe(
        map((order: any) => order.id),
        tap(uid => localStorage.setItem('OrderUid', uid)),
        tap(uid => this.order.uid = uid),
      ).subscribe();
    }
    this.max.setDate(this.min.getDate() + 2);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'order/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent$ = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => this.downloadURL = fileRef.getDownloadURL().pipe(
          tap(imageUrl => this.order.imageUrl = imageUrl),
        )
      )
    ).subscribe();
  }

  ngOnInit() {
  }



  setDeadline(orderTime: Date) {
    this.order.deadline = orderTime;
  }

  doneForm() {
    console.log(this.order);
    from(this.afs.collection('order').doc(this.order.uid).update(this.order))
      .subscribe((e) => console.log());
  }

  createOrder$ = () => of('Empty').pipe(
    map(() => {
      return {};
    }),
    concatMap((data) => from(this.afs.collection('order').add(data))),
  )


}

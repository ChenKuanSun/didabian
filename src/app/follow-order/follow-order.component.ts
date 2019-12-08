import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, iif, Observable, BehaviorSubject, from } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order, OrderList } from '../@core/order.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-follow-order',
  templateUrl: './follow-order.component.html',
  styleUrls: ['./follow-order.component.scss']
})
export class FollowOrderComponent implements OnInit {
  orderID: string;
  order: Order;
  order$: Observable<Order>;
  orderlist$ = new BehaviorSubject<OrderList[]>([]);

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.order$ = this.afs
      .collection<any>('order')
      .doc(this.route.snapshot.queryParamMap.get('orderID'))
      .valueChanges().pipe(map((order: Order) => {
        if (order) {
          this.orderlist$.next(order.list);
          this.order = order;
        }
        return order;
      }));
    this.itemForm = this.fb.group({
      from: ['', Validators.required],
      productName: ['', Validators.required],
      price: 0,
      spec: '',
      quantity: 0,
    });
  }

  ngOnInit() {
  }


  sendItem() {
    if (!!this.order.list) {
      this.order.list.push(this.itemForm.value);
    } else {
      this.order.list = [this.itemForm.value];
    }
    from(
      this.afs
        .collection<any>('order')
        .doc(this.route.snapshot.queryParamMap.get('orderID'))
        .update(this.order)
    ).subscribe();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../models/subscription.entity';
import { Subscription, CreateSubscription } from '../models/subscription.class';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>
  ) {}

  doesSubscriptionExist(email: string): Observable<boolean> {
    return from(this.subscriptionRepository.findOne({ email })).pipe(
      switchMap((subscription: CreateSubscription) => {
        return of(!!subscription);
      }),
    );
  }

  createSubscription(subscription: CreateSubscription): Observable<Subscription> {
    const { 
       subscriberCountry, 
       subscriberName, 
       frequency, 
       email, 
       subscriptionTime
      } = subscription;

    return this.doesSubscriptionExist(email).pipe(
      tap((doesSubExist: boolean) => {
        if (doesSubExist)
          throw new HttpException(
            'A subscription has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),
      switchMap(() => {
            return from(
              this.subscriptionRepository.save({
                subscriberCountry, 
                subscriberName, 
                frequency, 
                email, 
                subscriptionTime,
                isEmailVerified: false
              }),
            ).pipe(
              map((subscription: Subscription) => {
                return subscription;
              }),
            );
        
      }),
    );
  }

  getSubscriptions(): Observable<Subscription[]> {
    const subscriptions = from(
      this.subscriptionRepository.find(),
    )
   return subscriptions;
  }

}

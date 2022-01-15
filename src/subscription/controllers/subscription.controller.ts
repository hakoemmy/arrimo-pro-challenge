import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Subscription, CreateSubscription } from '../models/subscription.class';
import { SubscriptionService } from '../services/subscription.service';

@Controller('subscriptions')
@ApiTags('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('/')
  @ApiOperation({ summary: 'Subscribe' })
  @ApiResponse({ status: 201, description: 'Subscription created.' })
  subscribe(@Body() subscription: CreateSubscription): Observable<Subscription> {
    return this.subscriptionService.createSubscription(subscription);
  }

  @Get('/')
  @ApiOperation({ summary: 'Fetch all subscribers' })
  @ApiResponse({
    status: 200,
    description: 'Subscriptions fetched successfuly',
    type: Subscription,
    isArray: true
  })
  viewSubscriptions(): Observable<Subscription[]> {
    return this.subscriptionService.getSubscriptions();
  }
}

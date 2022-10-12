import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bool } from 'types';
import { Friend } from './entity/friend.entity';

@Injectable()
export class FriendsService {}

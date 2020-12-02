import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url extends BaseEntity {
  constructor(userUrl?: Url['userUrl']) {
    super();
    this.userUrl = userUrl;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userUrl: string;

  @Column()
  shortUrl: string;
}

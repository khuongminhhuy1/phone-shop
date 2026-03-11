import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  token: string

  @Column()
  expiration: Date
}

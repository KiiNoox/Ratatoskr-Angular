export enum RL {
  ROLE_USER='ROLE_USER',ROLE_PROVIDER='ROLE_PROVIDER',ROLE_DELIVERY='ROLE_DELIVERY',ROLE_ADMIN='ROLE_ADMIN'
}
export class Roles
{
authority!: RL;
name!:RL;

  constructor(roles: RL) {
    this.name = roles;
    this.authority = roles;
  }
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SHOP = 'SHOP',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  WAITING = 'WAITING',
  PAID = 'PAID',
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  REJECT = 'REJECT',
  IN_ACTIVE = 'IN_ACTIVE',
}

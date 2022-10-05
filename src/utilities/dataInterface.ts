export interface ProductType {
  id?: number;
  product_id: string;
  stock: number;
  profit: number;
  expired: string;
  status: boolean;
}

export interface TransactionType {
  id?: number;
  list_items: Array<string>;
  date: string;
}

export interface AtributeType {
  id?: number;
  attribute: string;
  priority: number;
}

export interface LiftRatioType {
  value: number;
  item: string;
}

export interface ConfidenceType {
  item: string;
  value: number;
  lift_ratio: Array<LiftRatioType>;
}

export interface RecomendationType {
  itemset: Array<string>;
  product: string;
  support: number;
  confidence: Array<ConfidenceType>;
}

export interface HistoryType {
  id?: number;
  username: string;
  startDate: string;
  endDate: string;
  data: Array<RecomendationType>;
  createdAt: string;
}
